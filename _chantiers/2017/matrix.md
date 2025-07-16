---
layout: chantier-standalone
started: 2017-04-31 02:15
ended: 2017-04-31 02:15
title: matrix
labels: [web]
description: |
  The problem with insomnia is that you can spend a night coding something useless.
---

<style>
#p5Canvas-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.metadata-overlay {
  position: fixed;
  top: 50px;
  left: 50px;
  background: rgba(0, 0, 0, 0.8);
  color: #00ff00;
  padding: 20px;
  border: 1px solid #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  z-index: 10;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

.metadata-overlay h1 {
  color: #00ff00;
  margin: 0 0 10px 0;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.metadata-overlay .date {
  color: #80ff80;
  margin-bottom: 10px;
}

.metadata-overlay .description {
  color: #b0ffb0;
  font-style: italic;
  margin-top: 15px;
}

.metadata-overlay .tech {
  color: #60ff60;
  margin-top: 10px;
}

.metadata-overlay a {
  color: #00ff00;
  text-decoration: none;
  transition: color 0.2s ease;
}

.metadata-overlay a:hover {
  color: #80ff80;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}

.metadata-overlay a:visited {
  color: #00ff00;
}
</style>

<div id="p5Canvas-container"></div>

<div class="metadata-overlay">
  <h1><a href="/">←</a> {{ page.title }}</h1>
  <div class="date">{{ page.started | date: "%B %d, %Y" }}</div>
  <div class="description">{{ page.description | markdownify | strip_html }}</div>
</div>

<script src="{% link /assets/lib/p5.v1.4.2.min.js %}"></script>
<script>
/* April 30th, 2017
 * Reference: https://youtu.be/S1TQCi9axzg?si=cei-eOtD9tUIQY1N
 */

function addClickToggle(p5Instance) {
    setTimeout(() => {
        if (p5Instance.canvas) {
            p5Instance.canvas.addEventListener('click', function() {
                if (p5Instance.isLooping()) {
                    p5Instance.noLoop();
                    console.log('Matrix paused');
                } else {
                    p5Instance.loop();
                    console.log('Matrix resumed');
                }
            });
        }
    }, 100);
}

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
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('p5Canvas-container');
    p.background(0);
    p.textSize(symbolSize);
    
    /* Create streams */
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
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    
    /* Reset streams when resizing */
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

/* Initialize the sketch */
const matrixInstance = new p5(matrixSketch, 'p5Canvas-container');
addClickToggle(matrixInstance);
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