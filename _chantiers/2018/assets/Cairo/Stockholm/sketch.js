var iteration = 10;
var minDiameter = 15.614 * 2 + 10;
var minDiameter = 500 - 10;

function setup() {
  createCanvas(500, 500);
}

function draw() {

	noFill();
	strokeWeight(3);
	stroke(0);

	circles = computeDiameters(min, max, iterations);

  for (var i = 0; i < iteration; i++) {
  	ellipse(250, 250, 50);
  }
	fill(255, 0, 0);
	noStroke();
	ellipse(250, 250, 15.614 * 2);
}

function computeDiameters(min, max, iterations){
	var thisTotalLength = max - min;
	var thisUnitLength = thisTotalLength / interation;
	var toPush = min;
	var thisUnits = [];
	for(var i = 0; i < iteration; i++){
		thisUnits.push()
	}
}
