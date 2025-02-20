class Drop {
  float x = random(10, width-10);
  float y = random(0, height);
  
  float maxDepth = 30;
  float z = random(0, maxDepth);
  
  float ySpeed = map(z, 0, maxDepth, 4, 10);
  float g = 0.2;
  
  float length = map(z, 0, 20, 10, 25);
  
  void fall(){
    y += ySpeed;
    ySpeed += g;
    if (y > height){
      y = random(-20, -40);
      ySpeed = map(z, 0, maxDepth, 4, 10);
    }
  }
  
  void show(){
    strokeWeight(3);
    strokeCap(ROUND);
    stroke(0);
    line(x, y, x, y + length);
  }
  
  
}
