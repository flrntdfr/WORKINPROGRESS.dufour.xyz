float angle = 0;
float speed = 0.01;

void setup() {
  size(500, 500);
}

void draw() {
  translate(width/2, height/2);
  background(255);
  drawCircle();
  drawArcs(20, speed);
  
  if(frameCount < 3600){
   // saveFrame("out/frame_####.tif");
  } else {
    noLoop();
    print("Saving has terminated");
  }
  
  if(mousePressed){
    println(frameCount);
  }
  
}

// ------------------------------------------------

void drawCircle() {
  noStroke();
  fill(255, 0, 0);
  ellipse(0, 0, 60, 60);
}

void drawArcs(int nArcs, float speed) {
  float minR = 150;
  float maxR = 450;
  float deltaR = maxR - minR;
  float increment = deltaR / nArcs;

  stroke(0);
  strokeWeight(3);
  strokeCap(ROUND);
  noFill();

  float position = minR;
  for (int n = 0; n < nArcs; n++) {  
    rotate(angle);
    arc(0, 0, position, position, 0, 2 * PI - (1.5));
    position += increment;
  }
  angle += speed;
}
