---
layout: chantier-blank
highlighted: true
title: this is what museums look like
started:  2016-01-01 23:42
ended:
location: [Belleville]
result: [list, illustration]
description: This project is inpired by <a href="https://pippinbarr.com" target="_blank" rel="noopener noreferrer">Pippin Barr</a> and his series <a href="https://web.archive.org/web/20190804192943/https://www.pippinbarr.com/2015/12/28/this-is-what-museums-look-like/" target="_blank" rel="noopener noreferrer">this is what museums look like</a>.
---

<div class="header-controls">
    <p id="museumText" class="info"></p>
    <div class="controls">
        <button onclick="nextMuseum()">→ Next</button>
        <button onclick="randomMuseum()">↔ Random</button>
        <button onclick="previousMuseum()">← Previous</button>
    </div>
</div>

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
let currentIndex = 0;
let shuffledOrder = [];
const imageCache = new Map();

document.addEventListener('DOMContentLoaded', function() {
    if (museums && museums.length > 0) {
        /* Create triple buffer image backgrounds */
        const dataElement = document.querySelector('data');
        const currentBuffer = document.createElement('div');
        currentBuffer.className = 'image-background current';
        currentBuffer.id = 'currentBuffer';
        const previousBuffer = document.createElement('div');
        previousBuffer.className = 'image-background previous';
        previousBuffer.id = 'previousBuffer';
        const nextBuffer = document.createElement('div');
        nextBuffer.className = 'image-background next';
        nextBuffer.id = 'nextBuffer';
        dataElement.appendChild(currentBuffer);
        dataElement.appendChild(previousBuffer);
        dataElement.appendChild(nextBuffer);
        
        shuffledOrder = [...Array(museums.length).keys()];
        preloadImages();
        showMuseum(0);
    } else {
        console.error('No museums found');
    }
});

/* Simple preloading - load all images */
function preloadImages() {
    museums.forEach((museum, index) => {
        if (museum.filename) {
            const img = new Image();
            img.onload = function() {
                imageCache.set(museum.filename, 'loaded');
                if (index < 5) {
                    console.log(`Image loaded: ${museum.filename}`);
                }
            };
            img.onerror = function() {
                console.warn(`Failed to load image: ${museum.filename}`);
                imageCache.set(museum.filename, 'failed');
            };
            img.src = `/assets/2016/museums/${museum.filename}`;
        }
    });
}

function showMuseum(index) {
    if (!museums || museums.length === 0) return;
    
    const museum = museums[shuffledOrder[index]];
    const museumText = document.getElementById('museumText');
    
    /* Update text immediately */
    if (museumText) {
        let displayText = "";
        if (museum.id != "") {
            displayText = museum.id + ". " + museum.description;
        } else {
            displayText = museum.description;
        }
        /* Convert \n to HTML line breaks */
        displayText = displayText.replace(/\\n/g, '<br>');
        museumText.innerHTML = displayText;
    }
    
    /* Display image with triple buffer system */
    if (museum.filename) {
        const currentBuffer = document.getElementById('currentBuffer');
        const previousBuffer = document.getElementById('previousBuffer');
        const nextBuffer = document.getElementById('nextBuffer');
        
        if (currentBuffer) {
            /* Load image on current buffer */
            if (imageCache.get(museum.filename) === 'loaded') {
                currentBuffer.style.backgroundImage = `url(/assets/2016/museums/${museum.filename})`;
            } else {
                const img = new Image();
                img.onload = function() {
                    imageCache.set(museum.filename, 'loaded');
                    currentBuffer.style.backgroundImage = `url(/assets/2016/museums/${museum.filename})`;
                };
                img.src = `/assets/2016/museums/${museum.filename}`;
            }
        }
        
        /* Preload adjacent images on other buffers */
        const prevIndex = (index - 1 + museums.length) % museums.length;
        const nextIndex = (index + 1) % museums.length;
        
        if (previousBuffer && museums[shuffledOrder[prevIndex]].filename) {
            const prevImg = new Image();
            prevImg.onload = function() {
                imageCache.set(museums[shuffledOrder[prevIndex]].filename, 'loaded');
                previousBuffer.style.backgroundImage = `url(/assets/2016/museums/${museums[shuffledOrder[prevIndex]].filename})`;
            };
            prevImg.src = `/assets/2016/museums/${museums[shuffledOrder[prevIndex]].filename}`;
        }
        
        if (nextBuffer && museums[shuffledOrder[nextIndex]].filename) {
            const nextImg = new Image();
            nextImg.onload = function() {
                imageCache.set(museums[shuffledOrder[nextIndex]].filename, 'loaded');
                nextBuffer.style.backgroundImage = `url(/assets/2016/museums/${museums[shuffledOrder[nextIndex]].filename})`;
            };
            nextImg.src = `/assets/2016/museums/${museums[shuffledOrder[nextIndex]].filename}`;
        }
    }
    
    currentIndex = index;
}

/* Preload adjacent images for smoother navigation */
function preloadAdjacentImages() {
    if (!museums || museums.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + museums.length) % museums.length;
    const nextIndex = (currentIndex + 1) % museums.length;
    
    [prevIndex, nextIndex].forEach(idx => {
        const museum = museums[shuffledOrder[idx]];
        if (museum.filename && !imageCache.has(museum.filename)) {
            const img = new Image();
            img.onload = function() {
                imageCache.set(museum.filename, 'loaded');
            };
            img.onerror = function() {
                imageCache.set(museum.filename, 'failed');
            };
            imageCache.set(museum.filename, 'loading');
            img.src = `/assets/2016/museums/${museum.filename}`;
        }
    });
}

function nextMuseum() {
    if (!museums || museums.length === 0) return;
    const nextIndex = Math.min(museums.length - 1, currentIndex + 1);
    showMuseum(nextIndex);
    preloadAdjacentImages();
}

function previousMuseum() {
    if (!museums || museums.length === 0) return;
    const prevIndex = Math.max(0, currentIndex - 1);
    showMuseum(prevIndex);
    preloadAdjacentImages();
}

function animateToIndex(targetIndex) {
    if (!museums || museums.length === 0) return;
    
    const totalImages = museums.length;
    const clampedTarget = Math.max(0, Math.min(totalImages - 1, targetIndex));
    
    /* If already at target, just make sure neighbors are preloaded */
    if (clampedTarget === currentIndex) {
        preloadAdjacentImages();
        return;
    }
    
    /* Simple direction: right if target is larger, left if smaller */
    const stepDirection = clampedTarget > currentIndex ? 1 : -1;
    let currentStepIndex = currentIndex;
    
    function animateTransition() {
        if (currentStepIndex !== clampedTarget) {
            currentStepIndex += stepDirection;
            showMuseum(currentStepIndex);
            requestAnimationFrame(animateTransition);
        } else {
            preloadAdjacentImages();
        }
    }
    
    requestAnimationFrame(animateTransition);
}

function randomMuseum() {
    if (!museums || museums.length === 0) return;
    
    /* Pick a random index from all available museums */
    const randomIndex = Math.floor(Math.random() * museums.length);
    
    /* Use the shared animation function */
    animateToIndex(randomIndex);
}

let numberBuffer = '';
let numberTimeout = null;

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            if (numberBuffer.length > 0) {
                /* Move left by the number of images specified */
                const steps = parseInt(numberBuffer);
                const targetIndex = (currentIndex - steps + museums.length) % museums.length;
                animateToIndex(targetIndex);
                numberBuffer = '';
                clearTimeout(numberTimeout);
                numberTimeout = null;
            } else {
                previousMuseum();
            }
            break;
        case 'ArrowRight':
            if (numberBuffer.length > 0) {
                /* Move right by the number of images specified */
                const steps = parseInt(numberBuffer);
                const targetIndex = (currentIndex + steps) % museums.length;
                animateToIndex(targetIndex);
                numberBuffer = '';
                clearTimeout(numberTimeout);
                numberTimeout = null;
            } else {
                nextMuseum();
            }
            break;
        case ' ':
            event.preventDefault();
            randomMuseum();
            break;
        case 'Enter':
            if (numberBuffer.length > 0) {
                const targetIndex = parseInt(numberBuffer); /* Convert to 0-based index */
                if (targetIndex >= 0 && targetIndex < museums.length) {
                    /* Use the shared animation function */
                    animateToIndex(targetIndex);
                }
                numberBuffer = '';
                clearTimeout(numberTimeout);
                numberTimeout = null;
            }
            break;
        default:
            /* Handle number input */
            if (event.key >= '0' && event.key <= '9') {
                numberBuffer += event.key;
                clearTimeout(numberTimeout);
                numberTimeout = setTimeout(() => {
                    numberBuffer = '';
                }, 3000); /* Clear buffer after 3 seconds of inactivity */
            }
            break;
    }
});
</script>

