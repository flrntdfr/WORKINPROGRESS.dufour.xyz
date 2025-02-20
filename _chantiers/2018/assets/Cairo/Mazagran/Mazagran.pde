int nDrops = 60;
ArrayList<Drop> drops = new ArrayList<Drop>();

void setup() {
  size(500, 500);
  int i = 0;
  while (i < nDrops) {
    drops.add(new Drop());
    i++;
  }
}

void draw() {
  background(255);
  drawCircle();
  for (Drop d : drops) {
    d.fall();
    d.show();
  }

  if (frameCount < 3600) {
    saveFrame("out/frame_######.tiff");
    print(frameCount + " ");
  } else {
    noLoop();
    println("end");
  }
}

void drawCircle() {
  noStroke();
  fill(255, 0, 0);
  ellipse(width/2, 150, 60, 60);
}
