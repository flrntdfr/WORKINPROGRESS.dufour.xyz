int nLines = 40;
ArrayList<Line> lines = new ArrayList<Line>();

void setup() {
  //frameRate(2);
  size(500, 500);
  float circleAngle = 0;
  float slicedCircleAngle = TWO_PI / nLines;

  boolean direction = true;
  for (int i = 0; i < nLines; i++) {  
    lines.add(new Line(circleAngle, direction));
    circleAngle += slicedCircleAngle;
    direction = !direction;
  }
}

void draw() {
  
  background(255);
  drawCircle();

  for (Line line : lines) {
    line.show();
  }
  
  if(frameCount < 3600){
    saveFrame("out/frame-####.tif");
  } else {
    noLoop();
    print("Saving has terminated");
  }
  
}

void drawCircle() {
  noStroke();
  fill(255, 0, 0);
  ellipse(250, 250, 60, 60);
}
