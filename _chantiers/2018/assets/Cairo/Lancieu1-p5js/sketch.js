let nLines = 40;
let lines = [];

function setup() {
  //frameRate(2);
  createCanvas(500, 500);
  let circleAngle = 0;
  let slicedCircleAngle = TWO_PI / nLines;

  let direction = true;
  for (let i = 0; i < nLines; i++) {
    lines.push(new Line(circleAngle, direction));
    circleAngle += slicedCircleAngle;
    direction = !direction;
  }
}

function draw() {

  background(255);
  drawCircle();

  for (let line of lines) {
    line.show();
  }

  // With default framerate, this will run for 60 seconds.
  if (frameCount < 3600) {
    // saveFrame("out/frame-####.tif"); // saveFrame is not standard in p5.js for client-side saving in this manner.
  } else {
    noLoop();
    print("Sketch has stopped.");
  }

}

function drawCircle() {
  noStroke();
  fill(255, 0, 0);
  ellipse(250, 250, 60, 60);
}

class Line {

  constructor(angle, turnRight) {
    this.angle = angle;
    this.speed = 0.01;
    this.turnRight = turnRight;
  }

  show() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    stroke(0);
    strokeWeight(3);
    line(0, 50, 0, 400);
    pop();
    if (this.turnRight) this.angle += this.speed;
    else this.angle -= this.speed;
  }
} 