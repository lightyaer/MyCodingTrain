/*
Add Learning Rate Input
Make n degrees compatible 
*/


let x_vals = [];
let y_vals = [];
let degreeSelect, stopButton, lossInput, clearButton;
let canvas;
function setup() {
    canvas = createCanvas(600, 600);
    canvas.mousePressed(drawPoint);
    dropdownHandler();
    clearButtonHandler();
    buttonHandler();
    lossInputHandler();
}

function lossInputHandler() {
    lossInput = createInput();
    lossInput.value('Loss');
    lossInput.id('lossInput');
    lossInput.position(canvas.width / 2 - 250, canvas.height + 30)
}

function buttonHandler() {
    stopButton = createButton('Stop');
    stopButton.class('stopButton');
    stopButton.id('stopButton');
    stopButton.position(canvas.width / 2 - 50, canvas.height + 20);
    document.getElementById("stopButton").addEventListener("click", () => {
        console.log('Execution Stopped');
        noLoop();
    });
}


function clearButtonHandler() {
    clearButton = createButton('Clear');
    clearButton.class('clearButton');
    clearButton.id('clearButton');
    clearButton.position(canvas.width / 2 + 30, canvas.height + 20);
    document.getElementById("clearButton").addEventListener("click", () => {
        x_vals = [];
        y_vals = [];
    });
}


function dropdownHandler() {
    degreeSelect = createSelect();
    degreeSelect.option("Linear Regression", 1);
    degreeSelect.option("Polynomial Regression", 2);
    degreeSelect.position(canvas.width / 2 + 130, canvas.height + 20);
    degreeSelect.selected(2);
    degreeSelect.changed(() => { x_vals = []; y_vals = [] })
    degreeSelect.class('degSelect');
}

function draw() {
    // draw the point where clicked
    background(0);
    stroke(255);
    strokeWeight(6);
    for (let i = 0; i < x_vals.length; i++) {
        let px = map(x_vals[i], -1, 1, 0, width);
        let py = map(y_vals[i], -1, 1, height, 0);
        point(px, py);
    }

    switch (degreeSelect.selected()) {
        case "1":
            //from linearGradient.js

            minimizeLinear();

            const lineX = [-1, 1]
            const ysForLine = tf.tidy(() => linearPredict(lineX));
            let lineY = ysForLine.dataSync();// getting data out of ys tensor
            ysForLine.dispose(); // delete the ys tensor after getting data from it.

            let x1 = map(lineX[0], -1, 1, 0, width);
            let x2 = map(lineX[1], -1, 1, 0, width);
            let y1 = map(lineY[0], -1, 1, height, 0);
            let y2 = map(lineY[1], -1, 1, height, 0);
            strokeWeight(2);
            line(x1, y1, x2, y2);
            break;

        case "2":

            minimizePoly();
            const curveX = [];
            for (let x = -1; x <= 1.05; x += 0.05) {
                curveX.push(x);
            }

            const ysForCurve = tf.tidy(() => polyPredict(curveX));
            let curveY = ysForCurve.dataSync();// getting data out of ys tensor
            ysForCurve.dispose(); // delete the ys tensor after getting data from it.


            //drawing the curve
            beginShape();
            noFill();
            stroke(255);
            strokeWeight(2);
            for (let i = 0; i < curveX.length; i++) {
                let x = map(curveX[i], -1, 1, 0, width);
                let y = map(curveY[i], -1, 1, height, 0);
                vertex(x, y);
            }
            endShape();
            break;
        default:
            break;
    }




}

function drawPoint() {
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    x_vals.push(x);
    y_vals.push(y);
}


