let a, b, c;

a = tf.scalar(getRandomNumbers(-1, 1)).variable();
b = tf.scalar(getRandomNumbers(-1, 1)).variable();
c = tf.scalar(getRandomNumbers(-1, 1)).variable();


function polyPredict(x_vals) {
    const xs = tf.tensor1d(x_vals);
    //y = ax^2 + bx + c;
    const ys = xs.square().mul(a)
        .add(xs.mul(b))
        .add(c);

    return ys;
}


function minimizePoly() {
    tf.tidy(() => {
        if (x_vals.length > 0) {
            const ys = tf.tensor1d(y_vals);
            optimizer.minimize(() => {
                let losses = loss(polyPredict(x_vals), ys);
                lossInput.value(losses.dataSync()[0]);
                return losses;
            });
        }

    });
}