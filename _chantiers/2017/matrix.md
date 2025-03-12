---
layout: chantier
started: 2017-04-12 00:00
ended: 2017-04-13 00:00
modified: 2024-08-09
title: matrix
featured: false
tags: web
tech: p5.js
---

Hello

# References

- https://youtu.be/S1TQCi9axzg?si=cei-eOtD9tUIQY1N

<script>
// April 30th

var symbolSize = 26;
var streams = [];

// ---------------------------------------------------------------------------

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  var x = 0;
  var y = 0;

  for (var i = 0; i <= width / symbolSize; i++) {
    stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }

  stream = new Stream();
  stream.generateSymbols();
  textSize(symbolSize);
}

// ---------------------------------------------------------------------------

function draw() {
  background(0, 100);
  streams.forEach(function (stream) {
    stream.render();
  });
}

// ---------------------------------------------------------------------------

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.value;
  this.switchInterval = round(random(2, 20));
  this.first = first;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  };

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  };
}

// ---------------------------------------------------------------------------

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 15));
  this.speed = random(5, 10);


  this.generateSymbols = function (x, y) {
    var first = round(random(0, 1)) == 1;
    this.x = x;
    this.y = y;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first == true) {
        fill(180, 255, 180);
      }
      else {
        fill(0, 200, 70);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();

    });
  };
}

// ---------------------------------------------------------------------------
</script>