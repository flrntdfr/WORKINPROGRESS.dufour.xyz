---
layout: chantier-blank
theme-color: "#000"
spicy: true
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
    <div id="museumText" class="info">
        <div id="status">1%</div>
        <div id="title">This is what museums look like</div>
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
    background-color: transparent;
    position: absolute;
    bottom: 4em;
    right: 85px;
    width: 100%;
    height: 2rem;
}

#status {
    background-color: white;
    padding: 0.5rem 0.5rem;
    box-shadow: 5px 5px 15px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    right: calc(50% + 0.5rem); /* 0.5rem is half the gap */
    text-align: right;
    min-width: 45px;
    border: 1px solid black;
}

#title {
    background-color: white;
    padding: 0.5rem 0.5rem;
    box-shadow: 5px 5px 15px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    left: calc(50% + 0.5rem); /* 0.5rem is half the gap */
    max-width: 100%;
    border: 1px solid black;
}

.controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    background: white;
    box-shadow: 5px 5px 15px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid black;
    padding: 1rem 1rem;
    gap: 0.375rem;
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
    numberTimeout: null,
    preloadedCount: 0,
    backgroundPreloadIndex: 0
};

const dom = {
    status: null,
    title: null,
    buffers: { current: null, prev: null, next: null }
};

document.addEventListener('DOMContentLoaded', function() {
    dom.status = document.getElementById('status');
    dom.title = document.getElementById('title');
    dom.buffers.current = document.getElementById('currentBuffer');
    dom.buffers.prev = document.getElementById('previousBuffer');
    dom.buffers.next = document.getElementById('nextBuffer');

    if (museums && museums.length > 0) {
        state.shuffledOrder = [...Array(museums.length).keys()];
        
        /* Initial display */
        updateDisplay(0);
        
        /* Start background preloading from index 0 onwards */
        startBackgroundPreload();
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
            img.onload = () => {
                state.imageCache.set(m.filename, 'loaded');
                state.preloadedCount++;
                updateProgressDisplay();
            };
            img.onerror = () => {
                state.imageCache.set(m.filename, 'failed');
                state.preloadedCount++;
                updateProgressDisplay();
            };
            img.src = `/assets/2016/museums/${m.filename}`;
            state.imageCache.set(m.filename, 'loading');
        }
    }
}

/* Background preloader that loads all images sequentially from 0 onwards */
function startBackgroundPreload() {
    function loadNextImage() {
        if (state.backgroundPreloadIndex >= museums.length) {
            return; /* All images loaded */
        }
        
        const m = getMuseum(state.backgroundPreloadIndex);
        if (m && m.filename && !state.imageCache.has(m.filename)) {
            const img = new Image();
            img.onload = () => {
                state.imageCache.set(m.filename, 'loaded');
                state.preloadedCount++;
                updateProgressDisplay();
                state.backgroundPreloadIndex++;
                loadNextImage();
            };
            img.onerror = () => {
                state.imageCache.set(m.filename, 'failed');
                state.preloadedCount++;
                updateProgressDisplay();
                state.backgroundPreloadIndex++;
                loadNextImage();
            };
            img.src = `/assets/2016/museums/${m.filename}`;
            state.imageCache.set(m.filename, 'loading');
        } else {
            /* Image already cached or loading, skip to next */
            state.backgroundPreloadIndex++;
            loadNextImage();
        }
    }
    
    loadNextImage();
}

/* Update status display based on current museum and loading progress */
function updateStatusDisplay() {
    if (!dom.status || !museums || museums.length === 0) return;
    
    const museum = getMuseum(state.currentIndex);
    if (!museum) return;
    
    if (museum.id === "") {
        /* Show loading progress or arrow when complete */
        const progress = Math.round((state.preloadedCount / museums.length) * 100);
        if (progress < 100) {
            dom.status.textContent = `${progress}%`;
        } else {
            dom.status.textContent = "0000.";
        }
    } else {
        /* Show museum ID */
        dom.status.textContent = museum.id + ".";
    }
}

/* Update progress display - calls updateStatusDisplay */
function updateProgressDisplay() {
    updateStatusDisplay();
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

        /* 1. Update Status and Title */
        updateStatusDisplay();
        
        if (dom.title) {
            dom.title.innerHTML = museum.description.replace(/\\n/g, '<br>');
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
    
    /* Calculate random jump between 7 and 50 images away */
    const minDistance = 7;
    const maxDistance = 50;
    const distance = minDistance + Math.floor(Math.random() * (maxDistance - minDistance + 1));
    
    /* Randomly choose direction (forward or backward) */
    const direction = Math.random() < 0.5 ? 1 : -1;
    const offset = distance * direction;
    
    /* Calculate target with wraparound */
    const targetIndex = (state.currentIndex + offset + museums.length) % museums.length;
    
    animateToIndex(targetIndex);
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
        case 'Backspace':
            if (state.numberBuffer.length > 0) {
                event.preventDefault();
                state.numberBuffer = state.numberBuffer.slice(0, -1);
                if (state.numberBuffer.length > 0) {
                    /* Update display with remaining digits */
                    if (dom.status) {
                        dom.status.textContent = state.numberBuffer.padStart(4, '0') + ".";
                    }
                    clearTimeout(state.numberTimeout);
                    state.numberTimeout = setTimeout(clearNumberBuffer, 3000);
                } else {
                    /* No digits left, restore normal display */
                    clearNumberBuffer();
                }
            }
            break;
        case 'Escape':
            if (state.numberBuffer.length > 0) {
                clearNumberBuffer();
            }
            break;
        default:
            if (event.key >= '0' && event.key <= '9') {
                /* Limit to 4 digits */
                if (state.numberBuffer.length < 4) {
                    state.numberBuffer += event.key;
                    /* Display the typed number in status with leading zeros */
                    if (dom.status) {
                        dom.status.textContent = state.numberBuffer.padStart(4, '0') + ".";
                    }
                    clearTimeout(state.numberTimeout);
                    state.numberTimeout = setTimeout(clearNumberBuffer, 3000);
                }
            }
            break;
    }
});

function clearNumberBuffer() {
    state.numberBuffer = '';
    clearTimeout(state.numberTimeout);
    state.numberTimeout = null;
    
    /* Restore normal status display */
    updateStatusDisplay();
}
</script>