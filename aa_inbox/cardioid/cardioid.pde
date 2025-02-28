import processing.svg.*;

int totalPoints;
int radius;
float factor;
color backgroundColor;
boolean record = true;

void setup() {
  size(500, 500, P2D);
  backgroundColor = color(230, 230, 230);
  background(backgroundColor);
  //color b1 = color(255);
  //color b2 = color(0);
  //setGradient(0, 0, width, height/2, b1, b2, 2);
  totalPoints = 200;
  radius = min(width, height)/2 - 10;
  factor = 2;
}

void draw() {
  // Start recording frame
  beginRecord(SVG, "./out/frame-########");

  // Preparation
  background(backgroundColor);
  //setGradient(0, 0, width, height, b1, b2, 2);
  translate(width/2, height/2);
  noFill();
  stroke(0, 50);
  strokeWeight(0.5);


  // Connect the points
  for (int i = 0; i < totalPoints; i++) {
    PVector previousPoint = getVector(i);
    PVector currentPoint  = getVector(i * factor);
    line(previousPoint.x, previousPoint.y, currentPoint.x, currentPoint.y);
  }
  // Animate
  factor += 0.01;
  // Write svg file before starting over
  endRecord();

  if (mousePressed) {
    println("Stopped recording");
    noLoop();
  }
}


PVector getVector(float index) {
  float angle = map(index % totalPoints, 0, totalPoints, -PI, PI);
  PVector v = PVector.fromAngle(angle);
  v.mult(radius);
  return v;
}
