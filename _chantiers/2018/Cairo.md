---
layout: chantier
title: Cairo
labels: illustration
started: 2018-07-01
ended: 2018-11-02
location: Strasbourg
labels: [illustration]
tech: [cairo, p5.js]
description: |
    This is a series of experimentation with 2D vectorial images and bezier lines with the cairo library. Cairo was meant as an introduction before starting experimenting with post script. Mettre les vidéos

---
**Montsouris**<br>
![Montsouris](/assets/2018/cairo/montsouris.svg)

**Couché de soleil sur la mer**<br>
![Couché de soleil sur la mer](/assets/2018/cairo/fouesnant.svg)

**La Mort**<br>
![La Mort](/assets/2018/cairo/La Mort.svg)

**La Villette**<br>
![La Villette](/assets/2018/cairo/La Villette.svg)

<div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 500px;">
        <strong>Stockholm</strong><br>
        <div id="stockholm-canvas" style="display: flex; justify-content: center;"></div>
    </div>
    <div style="flex: 1; min-width: 500px;">
        <strong>Lancieu</strong><br>
        <div id="lancieu-canvas" style="display: flex; justify-content: center;"></div>
    </div>
    <div style="flex: 1; min-width: 500px;">
        <strong>Kissing under the rain</strong><br>
        <div id="mazagran-canvas" style="display: flex; justify-content: center;"></div>
    </div>
</div>

**Pravčická-brána**<br>
![Pravčická-brána](/assets/2018/cairo/Pravčická-brána.svg)

**Roscoff**<br>
<div style="display: flex; gap: 20px; align-items: flex-start; width: 100%;">
    <div style="flex: 1;">
        <img src="/assets/2018/cairo/Roscoff.svg" alt="Roscoff" style="width: 100%; height: auto;">
    </div>
    <div style="flex: 1;">
        <img src="/assets/2018/cairo/Shell.svg" alt="Shell" style="width: 100%; height: auto;">
    </div>
</div>

**TV**<br>
![TV](/assets/2018/cairo/TV.svg)

<script src="/assets/lib/p5.v1.4.2.min.js"></script>
<script>
const lancieuSketch = (p) => {
    let nLines = 40;
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
            p.strokeWeight(3);
            p.line(0, 50, 0, 400);
            p.pop();
            if (this.turnRight) this.angle += this.speed;
            else this.angle -= this.speed;
        }
    }

    p.setup = function() {
        p.createCanvas(500, 500);
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
        p.ellipse(250, 250, 60, 60);
    }

    p.draw = function() {
        p.background(255);
        drawCircle();

        for (let line of lines) {
            line.show();
        }

        if (p.frameCount >= 3600) {
            p.noLoop();
            p.print("Sketch has stopped.");
        }
    };
};

new p5(lancieuSketch, 'lancieu-canvas');

const mazagranSketch = (p) => {
    let nDrops = 60;
    let drops = [];

    class Drop {
        constructor() {
            this.x = p.random(10, p.width - 10);
            this.y = p.random(0, p.height);
            this.maxDepth = 30;
            this.z = p.random(0, this.maxDepth);
            this.ySpeed = p.map(this.z, 0, this.maxDepth, 4, 10);
            this.g = 0.2;
            this.length = p.map(this.z, 0, 20, 10, 25);
        }

        fall() {
            this.y += this.ySpeed;
            this.ySpeed += this.g;
            if (this.y > p.height) {
                this.y = p.random(-20, -40);
                this.ySpeed = p.map(this.z, 0, this.maxDepth, 4, 10);
            }
        }

        show() {
            p.strokeWeight(3);
            p.strokeCap(p.ROUND);
            p.stroke(0);
            p.line(this.x, this.y, this.x, this.y + this.length);
        }
    }

    p.setup = function() {
        p.createCanvas(500, 500);
        for (let i = 0; i < nDrops; i++) {
            drops.push(new Drop());
        }
    };

    function drawCircle() {
        p.noStroke();
        p.fill(0, 0, 0);
        p.ellipse(p.width / 2, 150, 60, 60);
    }

    p.draw = function() {
        p.background(255);
        drawCircle();
        for (let d of drops) {
            d.fall();
            d.show();
        }

        if (p.frameCount >= 3600) {
            p.noLoop();
            p.print("Sketch has stopped.");
        }
    };
};

new p5(mazagranSketch, 'mazagran-canvas');

const stockholmSketch = (p) => {
    const iteration = 10;
    const minDiameter = 15.614 * 2 + 10;
    const maxDiameter = 500 - 10;

    function computeDiameters(min, max, count) {
        const diameters = [];
        if (count === 0) return diameters;
        if (count === 1) {
            diameters.push(min);
            return diameters;
        }
        const step = (max - min) / (count - 1);
        for (let i = 0; i < count; i++) {
            diameters.push(min + i * step);
        }
        return diameters;
    }

    p.setup = function() {
        p.createCanvas(500, 500);
        p.background(255);

        const diameters = computeDiameters(minDiameter, maxDiameter, iteration);

        p.noFill();
        p.strokeWeight(3);
        p.stroke(0);

        for (const d of diameters) {
            p.ellipse(p.width / 2, p.height / 2, d);
        }

        p.fill(255, 0, 0);
        p.noStroke();
        p.ellipse(p.width / 2, p.height / 2, 15.614 * 2);

        p.noLoop();
    };
};

new p5(stockholmSketch, 'stockholm-canvas');
</script>
