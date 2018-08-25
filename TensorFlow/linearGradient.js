
let m, b;

m = tf.variable(tf.scalar(Math.random(1)));
b = tf.variable(tf.scalar(Math.random(1)));

const learningRate = 0.05;
const optimizer = tf.train.adam(learningRate);


function loss(pred, labels) {
    return pred.sub(labels).square().mean();
}


function predict(x_vals) {
    const xs = tf.tensor1d(x_vals);
    // y = mx +b;
    const ys = xs.mul(m).add(b);
    return ys;
}


function minimize() {
    tf.tidy(() => {
        if (x_vals.length > 0) {
            const ys = tf.tensor1d(y_vals);
            optimizer.minimize(() => loss(predict(x_vals), ys));
        }

    });
}