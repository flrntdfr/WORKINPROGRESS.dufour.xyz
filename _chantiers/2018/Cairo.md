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

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
    <div>
        <strong>une souris</strong><br>
        <img src="/assets/2018/cairo/montsouris.svg" alt="Montsouris" />
    </div>
    <div>
        <strong>un couché de soleil sur la mer</strong><br>
        <img src="/assets/2018/cairo/fouesnant.svg" alt="Couché de soleil sur la mer" />
    </div>
    <div>
        <strong>un scarabé</strong><br>
        <img src="/assets/2018/cairo/La Villette.svg" alt="La Villette" />
    </div>
    <div>
        <strong>une télévision éteinte</strong><br>
        <img src="/assets/2018/cairo/TV.svg" alt="TV" />
    </div>
</div>

{% comment %}
**La Mort**<br>
![La Mort](/assets/2018/cairo/La Mort.svg)
{% endcomment %}

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
    <div>
        <strong>le bonheur</strong><br>
        <div id="lancieu-canvas" style="display: flex; justify-content: center;"></div>
    </div>
    <div>
        <strong>le malheur</strong><br>
        <div id="la-pluie-tombe-canvas" style="display: flex; justify-content: center;"></div>
    </div>
</div>

{% comment %}
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
{% endcomment %}

<script src="/assets/lib/p5.v1.4.2.min.js"></script>
<script>
const lancieuSketch = (p) => {
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

        if (p.frameCount >= 3600) {
            p.noLoop();
            p.print("Sketch has stopped.");
        }
    };
};

new p5(lancieuSketch, 'lancieu-canvas');

const mazagranSketch = (p) => {
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

        if (p.frameCount >= 3600) {
            p.noLoop();
            p.print("Sketch has stopped.");
        }
    };
};

new p5(mazagranSketch, 'la-pluie-tombe-canvas');
</script>
