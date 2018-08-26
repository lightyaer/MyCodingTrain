let data;
let model;
let lossP, labelP;
let rSlider, gSlider, bSlider;

const labelsList = [
    "green-ish",
    "pink-ish",
    "orange-ish",
    "blue-ish",
    "brown-ish",
    "red-ish",
    "yellow-ish",
    "purple-ish",
    "grey-ish"
]


function preload() {
    data = loadJSON("trainingData.json");
}

function setup() {
    labelP = createP();
    lossP = createP();

    rSlider = createSlider(0, 255, 255);
    gSlider = createSlider(0, 255, 255);
    bSlider = createSlider(0, 255, 0);


    let colors = [];
    let labels = [];
    for (let record of data.entries) {
        let col = [record.r / 255, record.g / 255, record.b / 255];
        colors.push(col);
        labels.push(labelsList.indexOf(record.label));
    }

    let xs = tf.tensor2d(colors);
    let ys = tf.oneHot(tf.tensor1d(labels, 'int32'), 9);

    model = tf.sequential();

    let hidden = tf.layers.dense({
        units: 16,
        activation: 'sigmoid',
        inputDim: 3
    })
    model.add(hidden);

    let output = tf.layers.dense({
        units: 9,
        activation: 'softmax'
    })

    model.add(output);

    model.compile({
        optimizer: tf.train.sgd(0.2),
        loss: 'categoricalCrossentropy'
    });


    train(xs, ys).then(results => {
        console.log(results.history.loss);
    })
}

async function train(xs, ys) {
    return await model.fit(xs, ys, {
        epochs: 10,
        validationSplit: 0.1,
        shuffle: true,
        callbacks: {
            onTrainBegin: () => console.log('Training Begun'),
            onTrainEnd: () => console.log('Training Complete!'),
            onEpochEnd: (num, logs) => {
                lossP.html("Loss : " + logs.loss);
                console.log('Epoch : ', num);
                console.log(logs);
            },
            onBatchEnd: tf.nextFrame
        }
    });
}


function draw() {
    let r = rSlider.value();
    let g = gSlider.value();
    let b = bSlider.value();
    background(r, g, b);

    tf.tidy(() => {
        const xs = tf.tensor2d([
            [r / 255, g / 255, b / 255]
        ]);

        let results = model.predict(xs);
        let index = results.argMax(1).dataSync()[0];
        let label = labelsList[index];
        labelP.html(label);

    });


}