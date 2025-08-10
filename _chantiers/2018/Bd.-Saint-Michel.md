---
layout: chantier-columns-x2
title: Bd. Saint-Michel
result: illustration
started: 2017-11-05
ended: 2018-11-02
location: [Paris]
result: [illustration]
lib: p5.v1.4.2.min.js
---

<div>
    <strong>Montsouris</strong><br>
    <img src="{% link /assets/2018/bd-saint-michel/Montsouris.svg %}" alt="Montsouris" />
</div>
<div>
    <strong>Périphérique</strong><br>
    <div id="périphérique-canvas" style="display: flex; justify-content: center;"></div>
</div>
<div>
    <strong>Notre-Dame</strong><br>
    <img src="{% link /assets/2018/bd-saint-michel/notre-dame.svg %}" alt="Notre-Dame" />
</div>
<div>
    <strong>Talamanca</strong><br>
    <img src="{% link /assets/2018/bd-saint-michel/Talamanca.svg %}" alt="Talamanca" />
</div>
<div>
    <strong>Dimanche</strong><br>
    <div id="dimanche-canvas" style="display: flex; justify-content: center;"></div>
</div>
<div>
    <strong>Lundi</strong><br>
    <div id="lundi-canvas" style="display: flex; justify-content: center;"></div>
</div>

<script>
function addClickToggle(p5Instance) {
    setTimeout(() => {
        if (p5Instance.canvas) {
            p5Instance.canvas.addEventListener('click', function() {
                if (p5Instance.isLooping()) {
                    p5Instance.noLoop();
                    console.log('Sketch paused');
                } else {
                    p5Instance.loop();
                    console.log('Sketch resumed');
                }
            });
        }
    }, 100);
}

const dimancheSketch = (p) => {
    let nLines;
    let lines = [];

    class Line {
        constructor(angle, turnRight) {
            this.angle = angle;
            this.speed = 0.01;
            this.turnRight = turnRight;
        }

        show() {
            p.push();
            p.translate(p.width / 2, p.height / 2);
            p.rotate(this.angle);
            p.stroke(0);
            p.strokeWeight(p.map(p.width, 200, 500, 1.5, 3, true));
            p.line(0, p.height * 0.1, 0, p.height * 0.8);
            p.pop();
            if (this.turnRight) this.angle += this.speed;
            else this.angle -= this.speed;
        }
    }

    p.setup = function() {
        const size = p._userNode.parentElement.clientWidth || 500;
        p.createCanvas(size, size);
        nLines = p.floor(p.map(size, 200, 500, 20, 40, true));
        let circleAngle = 0;
        let slicedCircleAngle = p.TWO_PI / nLines;

        let direction = true;
        for (let i = 0; i < nLines; i++) {
            lines.push(new Line(circleAngle, direction));
            circleAngle += slicedCircleAngle;
            direction = !direction;
        }
    };

    function drawCircle() {
        p.noStroke();
        p.fill(0, 0, 0);
        p.ellipse(p.width / 2, p.height / 2, p.width * 0.12, p.width * 0.12);
    }

    p.draw = function() {
        p.background(255);
        drawCircle();

        for (let line of lines) {
            line.show();
        }
    };
};

const dimancheInstance = new p5(dimancheSketch, 'dimanche-canvas');
addClickToggle(dimancheInstance);

const lundiSketch = (p) => {
    let nDrops;
    let drops = [];

    class Drop {
        constructor() {
            this.x = p.random(10, p.width - 10);
            this.y = p.random(0, p.height);
            this.maxDepth = 30;
            this.z = p.random(0, this.maxDepth);
            this.ySpeed = p.map(this.z, 0, this.maxDepth, 4, 10);
            this.g = 0.2;
            this.length = p.map(this.z, 0, 20, p.height * 0.02, p.height * 0.05);
        }

        fall() {
            this.y += this.ySpeed;
            this.ySpeed += this.g;
            if (this.y > p.height) {
                this.y = p.random(-p.height * 0.04, -p.height * 0.08);
                this.ySpeed = p.map(this.z, 0, this.maxDepth, 4, 10);
            }
        }

        show() {
            p.strokeWeight(p.map(p.width, 200, 500, 1, 3, true));
            p.strokeCap(p.ROUND);
            p.stroke(0);
            p.line(this.x, this.y, this.x, this.y + this.length);
        }
    }

    p.setup = function() {
        const size = p._userNode.parentElement.clientWidth || 500;
        p.createCanvas(size, size);
        nDrops = p.floor(p.map(size, 200, 500, 30, 60, true));
        for (let i = 0; i < nDrops; i++) {
            drops.push(new Drop());
        }
    };

    function drawCircle() {
        p.noStroke();
        p.fill(0, 0, 0);
        p.ellipse(p.width / 2, p.height * 0.3, p.width * 0.12, p.width * 0.12);
    }

    p.draw = function() {
        p.background(255);
        drawCircle();
        for (let d of drops) {
            d.fall();
            d.show();
        }
    };
};

const lundiInstance = new p5(lundiSketch, 'lundi-canvas');
addClickToggle(lundiInstance);

const arcsSketch = (p) => {
    let angle = 0;
    let speed = 0.01;
    let nArcs;

    function drawCircle() {
        p.noStroke();
        p.fill(0, 0, 0);
        p.ellipse(0, 0, p.width * 0.12, p.width * 0.12);
    }

    function drawArcs(nArcs, speed) {
        let minR = p.width * 0.3;
        let maxR = p.width * 0.9;
        let deltaR = maxR - minR;
        let increment = deltaR / nArcs;

        p.stroke(0);
        p.strokeWeight(p.map(p.width, 200, 500, 1.5, 3, true));
        p.strokeCap(p.ROUND);
        p.noFill();

        let position = minR;
        for (let n = 0; n < nArcs; n++) {
            p.rotate(angle);
            p.arc(0, 0, position, position, 0, p.TWO_PI - 1.5);
            position += increment;
        }
        angle += speed;
    }

    p.setup = function() {
        const size = p._userNode.parentElement.clientWidth || 500;
        p.createCanvas(size, size);
        nArcs = p.floor(p.map(size, 200, 500, 15, 25, true));
    };

    p.draw = function() {
        p.background(255);
        p.push();
        p.translate(p.width / 2, p.height / 2);
        drawCircle();
        drawArcs(nArcs, speed);
        p.pop();
    };
};

const arcsInstance = new p5(arcsSketch, 'périphérique-canvas');
addClickToggle(arcsInstance);
</script>

<style>
data canvas {
    max-width: 100%;
    height: auto;
}
</style>