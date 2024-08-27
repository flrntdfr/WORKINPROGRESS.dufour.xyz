var Current_h;
var Current_min;
var Current_sec;

function setup() {
  createCanvas(windowWidth, windowHeight);
	background(0);
}

function draw() {

  Current_h = hour();
  Current_min = minute();
  Current_sec = second();

  //var display = Current_sec;

  text(Current_h, width / 2, height / 2);

}
