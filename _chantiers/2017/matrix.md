---
layout: chantier
started: 2017-04-30 23:49
ended: 2017-04-31 02:15
title: matrix
featured: false
labels: [web, memo]
tech: [p5.js]
lib: p5.v1.4.2.min.js
description: |
  The problem with insomnia is that it's hard to fall asleep.
---

<style>
#p5Canvas-container {
  width: 100%;
  height: 500px;
  margin: 0 auto;
}
</style>

<div id="p5Canvas-container"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
<script>
/* April 30th, 2017
 * Reference: https://youtu.be/S1TQCi9axzg?si=cei-eOtD9tUIQY1N
 */

const matrixSketch = function(p) {
  const symbolSize = 26;
  let streams = [];
  
  class Symbol {
    constructor(x, y, speed, first) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.value = '';
      this.switchInterval = p.round(p.random(2, 20));
      this.first = first;
    }
    
    setToRandomSymbol() {
      if (p.frameCount % this.switchInterval === 0) {
        this.value = String.fromCharCode(
          0x30A0 + p.round(p.random(0, 96))
        );
      }
    }
    
    rain() {
      this.y = (this.y >= p.height) ? 0 : this.y += this.speed;
    }
  }
  
  class Stream {
    constructor() {
      this.symbols = [];
      this.totalSymbols = p.round(p.random(5, 15));
      this.speed = p.random(5, 10);
    }
    
    generateSymbols(x, y) {
      const first = p.round(p.random(0, 1)) === 1;
      this.x = x;
      this.y = y || 0;
      
      for (let i = 0; i <= this.totalSymbols; i++) {
        const symbol = new Symbol(x, y, this.speed, first);
        symbol.setToRandomSymbol();
        this.symbols.push(symbol);
        y -= symbolSize;
      }
    }
    
    render() {
      this.symbols.forEach(symbol => {
        if (symbol.first) {
          p.fill(180, 255, 180);
        } else {
          p.fill(0, 200, 70);
        }
        p.text(symbol.value, symbol.x, symbol.y);
        symbol.rain();
        symbol.setToRandomSymbol();
      });
    }
  }
  
  p.setup = function() {
    const container = document.getElementById('p5Canvas-container');
    const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('p5Canvas-container');
    p.background(0);
    p.textSize(symbolSize);
    
    // Create streams
    let x = 0;
    for (let i = 0; i <= p.width / symbolSize; i++) {
      const stream = new Stream();
      stream.generateSymbols(x, p.random(-1000, 0));
      streams.push(stream);
      x += symbolSize;
    }
  };
  
  p.draw = function() {
    p.background(0, 100);
    streams.forEach(stream => stream.render());
  };
  
  p.windowResized = function() {
    const container = document.getElementById('p5Canvas-container');
    p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    
    // Reset streams when resizing
    streams = [];
    let x = 0;
    for (let i = 0; i <= p.width / symbolSize; i++) {
      const stream = new Stream();
      stream.generateSymbols(x, p.random(-1000, 0));
      streams.push(stream);
      x += symbolSize;
    }
  };
};

// Initialize the sketch
new p5(matrixSketch, 'p5Canvas-container');
</script>


<!--
<script type="module">
/* April 30th
 * Reference: https://youtu.be/S1TQCi9axzg?si=cei-eOtD9tUIQY1N
 */

var symbolSize = 26;
var streams = [];

function setup() {
  createCanvas(400, 400);
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

function draw() {
  background(0, 100);
  streams.forEach(function (stream) {
    stream.render();
  });
}

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
</script>
-->