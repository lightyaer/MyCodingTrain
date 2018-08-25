let x_vals = [];
let y_vals = [];

function setup() {
    createCanvas(400, 400);
}

function mousePressed() {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    x_vals.push(x);
    y_vals.push(y);
}

function draw() {
    // draw the point where clicked
    background(0);
    stroke(255);
    strokeWeight(6);
    for (let i = 0; i < x_vals.length; i++) {
        let px = map(x_vals[i], 0, 1, 0, width);
        let py = map(y_vals[i], 0, 1, height, 0);
        point(px, py);
    }

    //from linearGradient.js
    minimize();

    const lineX = [0, 1]
    const ys = tf.tidy(() => predict(lineX));
    let lineY = ys.dataSync();// getting data out of ys tensor
    ys.dispose(); // delete the ys tensor after getting data from it.

    let x1 = map(lineX[0], 0, 1, 0, width);
    let x2 = map(lineX[1], 0, 1, 0, width);
    let y1 = map(lineY[0], 0, 1, height, 0);
    let y2 = map(lineY[1], 0, 1, height, 0);
    strokeWeight(2);
    line(x1, y1, x2, y2);

    console.log(tf.memory().numTensors);
}

