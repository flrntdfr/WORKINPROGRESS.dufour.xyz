void setup() {
  size(500, 500);
}

void draw() {
  translate(width/2, height/2);
  background(255);
  PVector circleCoordinates = new PVector(0, 0);
  drawCircle(circleCoordinates);
}

// ------------------------------------------------

void drawCircle(PVector coordinates) {
  noStroke();
  fill(255, 0, 0);
  ellipse(coordinates.x, coordinates.y, 60, 60);
}
