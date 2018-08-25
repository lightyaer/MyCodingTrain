function getRandomNumbers(min, max) {
    min = min ? min : 0;
    max = max ? max : 1;
    return Math.random() * (max - min) + min;
}

const learningRate = 0.05;
const optimizer = tf.train.adam(learningRate);


function loss(pred, labels) {
    return pred.sub(labels).square().mean();
}
