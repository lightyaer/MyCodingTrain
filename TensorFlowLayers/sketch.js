const model = tf.sequential();

// dense is a fully connected layer
const hidden = tf.layers.dense({
    units: 4,
    inputShape: [1],
    activation: 'sigmoid'
});
model.add(hidden);

const output = tf.layers.dense({
    units: 1,
    inputShape: [4], //its actually inferred from the previous layer i.e hidden
    activation: 'sigmoid'
});
model.add(output);

model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.1)
});

const train_xs = tf.tensor2d([
    [0],
    [0.5],
    [1]
]);

const train_ys = tf.tensor2d([
    [1],
    [0.5],
    [0]
]);

async function train() {
    let i = 1;
    while (i <= 1000) {
        const result = await model.fit(train_xs, train_ys, {
            shuffle: true,
            epochs: 10
        });
        console.log(result.history.loss[result.history.loss.length - 1], i);
        i++;
    }



}

const xs = tf.tensor2d([
    [0.25],
    [0.75],
    [1]
]);

train().then(() => {
    console.log('Training Completed!');
    let ys = model.predict(xs);
    ys.print();
})


