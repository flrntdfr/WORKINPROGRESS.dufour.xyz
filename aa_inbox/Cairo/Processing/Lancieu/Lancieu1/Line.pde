class Line {
  float angle;
  float speed;
  boolean turnRight;

  Line(float angle, boolean turnRight) {
    this.angle = angle;
    this.speed = 0.01;
    this.turnRight = turnRight;
  }

  void show() {
    pushMatrix();
    translate(width/2, height/2);
    rotate(this.angle);
    stroke(0);
    strokeWeight(3);
    line(0, 50, 0, 400);
    popMatrix();
    if (turnRight) this.angle +=  this.speed;
    else this.angle -= speed;
  }
}
