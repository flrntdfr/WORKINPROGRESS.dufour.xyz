---
layout: chantier-blank
theme-color: "#000"
highlighted: true
title: this is what museums look like
started: 2016-01-01 23:42
ended:
location: [Belleville]
result: [illustration, list]
description: This project is inpired by <a href="https://pippinbarr.com" target="_blank" rel="noopener noreferrer">Pippin Barr ➟</a> and his series <a href="https://www.instagram.com/pippinbarr" target="_blank" rel="noopener noreferrer">this is what museums look like ➟</a>.
---

<!-- https://web.archive.org/web/20190804192943/https://www.pippinbarr.com/2015/12/28/this-is-what-museums-look-like/ -->

<div class="header-controls">
    <div class="controls">
        <button onclick="nextMuseum()">→ Next</button>
        <button onclick="randomMuseum()">↔ Random</button>
        <button onclick="previousMuseum()">← Previous</button>
    </div>
    <p id="museumText" class="info"></p>
</div>

<!-- Pre-created image background divs for immediate display -->
<div id="currentBuffer" class="image-background current"></div>
<div id="previousBuffer" class="image-background previous"></div>
<div id="nextBuffer" class="image-background next"></div>

<style>
data {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
}

.header-controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 20px 0 20px 20px;
}

#museumText {
    background-color: white;
    padding: 5px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 0 4em 0;
}

.controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    background: white;
}

.controls button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: black;
    text-decoration: underline;
    text-align: left;
    font-family: inherit;
    white-space: nowrap;
}

.controls button:hover {
    text-decoration: none;
}

/* Image background styles */
.image-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -2;
}

.image-background.current {
    z-index: -1;
}

.image-background.previous {
    z-index: -3;
}

.image-background.next {
    z-index: -2;
}
</style>

<script>
const museums = {% include museums/museums.db.json %};
const state = {
    currentIndex: 0,
    shuffledOrder: [],
    imageCache: new Map(),
    animationFrameId: null,
    numberBuffer: '',
    numberTimeout: null
};

const dom = {
    text: null,
    buffers: { current: null, prev: null, next: null }
};

document.addEventListener('DOMContentLoaded', function() {
    dom.text = document.getElementById('museumText');
    dom.buffers.current = document.getElementById('currentBuffer');
    dom.buffers.prev = document.getElementById('previousBuffer');
    dom.buffers.next = document.getElementById('nextBuffer');

    if (museums && museums.length > 0) {
        state.shuffledOrder = [...Array(museums.length).keys()];
        
        /* Initial display */
        updateDisplay(0);
    } else {
        console.error('No museums found');
    }
});

function getMuseum(index) {
    if (!museums || museums.length === 0) return null;
    const i = (index + museums.length) % museums.length;
    return museums[state.shuffledOrder[i]];
}

/* Preload a window of images around the center index */
function preloadWindow(centerIndex, radius = 3) {
    for (let i = -radius; i <= radius; i++) {
        if (i === 0) continue;
        const m = getMuseum(centerIndex + i);
        if (m && m.filename && !state.imageCache.has(m.filename)) {
            const img = new Image();
            img.onload = () => state.imageCache.set(m.filename, 'loaded');
            img.onerror = () => state.imageCache.set(m.filename, 'failed');
            img.src = `/assets/2016/museums/${m.filename}`;
            state.imageCache.set(m.filename, 'loading');
        }
    }
}

function updateDisplay(index) {
    /* Stop any ongoing animation if manual navigation occurs */
    /* Note: animateToIndex handles its own cancellation, but manual clicks should also stop it */
    /* We don't cancel here blindly because animateToIndex calls this function. */
    
    state.currentIndex = index;
    const museum = getMuseum(index);
    if (!museum) return;

    /* Logic to sync text and image:
       Only update text when image is ready to prevent mismatch */
    
    const applyUpdate = () => {
        /* Verify this is still the requested index to prevent race conditions */
        if (state.currentIndex !== index) return;

        /* 1. Update Text */
        if (dom.text) {
            let txt = (museum.id ? museum.id + ". " : "") + museum.description;
            dom.text.innerHTML = txt.replace(/\\n/g, '<br>');
        }

        /* 2. Update Current Buffer */
        if (dom.buffers.current && museum.filename) {
             dom.buffers.current.style.backgroundImage = `url(/assets/2016/museums/${museum.filename})`;
        }
        
        /* 3. Update buffers and preload */
        updateAdjacentBuffers(index);
        preloadWindow(index);
    };

    /* Check Cache */
    if (state.imageCache.get(museum.filename) === 'loaded') {
        applyUpdate();
    } else {
        /* Not loaded? Load then update. 
           This ensures strict sync between text and image. */
        const img = new Image();
        img.onload = () => {
            state.imageCache.set(museum.filename, 'loaded');
            applyUpdate();
        };
        img.onerror = () => {
            /* If failed, maybe still show text? or show error? 
               For now, we update anyway so UI isn't stuck. */
            state.imageCache.set(museum.filename, 'failed');
            applyUpdate();
        };
        img.src = `/assets/2016/museums/${museum.filename}`;
    }
}

function updateAdjacentBuffers(index) {
    const prev = getMuseum(index - 1);
    const next = getMuseum(index + 1);
    
    if (dom.buffers.prev && prev) 
        dom.buffers.prev.style.backgroundImage = `url(/assets/2016/museums/${prev.filename})`;
    
    if (dom.buffers.next && next) 
        dom.buffers.next.style.backgroundImage = `url(/assets/2016/museums/${next.filename})`;
}

function animateToIndex(targetIndex) {
    if (!museums || museums.length === 0) return;
    
    if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
    }
    
    const total = museums.length;
    const clampedTarget = Math.max(0, Math.min(total - 1, targetIndex));
    
    if (clampedTarget === state.currentIndex) return;

    const direction = clampedTarget > state.currentIndex ? 1 : -1;
    let lastTime = 0;
    const delay = 16; /* 60fps cap */

    function step(time) {
        if (time - lastTime >= delay) {
            if (state.currentIndex !== clampedTarget) {
                const nextIndex = state.currentIndex + direction;
                updateDisplay(nextIndex);
                lastTime = time;
                state.animationFrameId = requestAnimationFrame(step);
            } else {
                state.animationFrameId = null;
            }
        } else {
            state.animationFrameId = requestAnimationFrame(step);
        }
    }
    state.animationFrameId = requestAnimationFrame(step);
}

function nextMuseum() {
    stopAnimation();
    updateDisplay(Math.min(museums.length - 1, state.currentIndex + 1));
}

function previousMuseum() {
    stopAnimation();
    updateDisplay(Math.max(0, state.currentIndex - 1));
}

function stopAnimation() {
    if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
    }
}

function randomMuseum() {
    if (!museums || !museums.length) return;
    animateToIndex(Math.floor(Math.random() * museums.length));
}

document.addEventListener('keydown', function(event) {
    /* If user interacts, stop any auto-animation */
    if (['ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        stopAnimation();
    }

    switch(event.key) {
        case 'ArrowLeft':
            if (state.numberBuffer.length > 0) {
                const steps = parseInt(state.numberBuffer);
                const target = (state.currentIndex - steps + museums.length) % museums.length;
                animateToIndex(target);
                clearNumberBuffer();
            } else {
                previousMuseum();
            }
            break;
        case 'ArrowRight':
            if (state.numberBuffer.length > 0) {
                const steps = parseInt(state.numberBuffer);
                const target = (state.currentIndex + steps) % museums.length;
                animateToIndex(target);
                clearNumberBuffer();
            } else {
                nextMuseum();
            }
            break;
        case ' ':
            event.preventDefault();
            randomMuseum();
            break;
        case 'Enter':
            if (state.numberBuffer.length > 0) {
                const target = parseInt(state.numberBuffer);
                animateToIndex(target);
                clearNumberBuffer();
            }
            break;
        default:
            if (event.key >= '0' && event.key <= '9') {
                state.numberBuffer += event.key;
                clearTimeout(state.numberTimeout);
                state.numberTimeout = setTimeout(clearNumberBuffer, 3000);
            }
            break;
    }
});

function clearNumberBuffer() {
    state.numberBuffer = '';
    clearTimeout(state.numberTimeout);
    state.numberTimeout = null;
}
</script>