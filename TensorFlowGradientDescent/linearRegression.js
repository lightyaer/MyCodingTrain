
let slope, yIntercept;

slope = tf.variable(tf.scalar(getRandomNumbers(-1, 1)));

yIntercept = tf.variable(tf.scalar(getRandomNumbers(-1, 1)));


function linearPredict(x_vals) {
    const xs = tf.tensor1d(x_vals);
    // y = mx +b;
    const ys = xs.mul(slope).add(yIntercept);
    return ys;
}


function minimizeLinear() {
    tf.tidy(() => {
        if (x_vals.length > 0) {
            const ys = tf.tensor1d(y_vals);
            optimizer.minimize(() => {
                let losses = loss(linearPredict(x_vals), ys);
                lossInput.value(losses.dataSync()[0]);
                return losses;
            });
        }

    });
}