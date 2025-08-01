---
featured: true
layout: chantier-blank
title: this is what museums look like
started: 2016-01-01 23:42
ended:
location: [Belleville]
labels: [list, illustration]
tech: [Index cards, Uniball micro]
description:
---

<style>
data {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: 400px;
    transition: opacity 0.2s ease-in;
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

<div class="header-controls">
    <p id="museumText" class="info"></p>
    <div class="controls">
        <button onclick="nextMuseum()">→ Next</button>
        <button onclick="randomMuseum()">↔ Random</button>
        <button onclick="previousMuseum()">← Previous</button>
    </div>
</div>

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
    const nextIndex = (currentIndex + 1) % museums.length;
    showMuseum(nextIndex);
    preloadAdjacentImages();
}

function previousMuseum() {
    if (!museums || museums.length === 0) return;
    const prevIndex = (currentIndex - 1 + museums.length) % museums.length;
    showMuseum(prevIndex);
    preloadAdjacentImages();
}

function animateToIndex(targetIndex) {
    if (!museums || museums.length === 0) return;
    
    const totalImages = museums.length;
    
    /* Calculate the shortest path to the target index */
    let forwardDistance = targetIndex - currentIndex;
    let backwardDistance = currentIndex - targetIndex;
    
    /* Handle boundary crossing for shortest path calculation */
    if (forwardDistance < 0) {
        /* Going forward would cross the end boundary */
        forwardDistance = (totalImages - currentIndex) + targetIndex;
    }
    if (backwardDistance < 0) {
        /* Going backward would cross the start boundary */
        backwardDistance = currentIndex + (totalImages - targetIndex);
    }
    
    /* Choose the shortest direction */
    const stepDirection = forwardDistance <= backwardDistance ? 1 : -1;
    const totalSteps = Math.min(forwardDistance, backwardDistance);
    
    let currentStepIndex = currentIndex;
    const stepDelay = 50; /* Milliseconds between each step */
    let stepCount = 0;
    
    /* Animated transition - show every image on the way */
    function animateTransition() {
        if (stepCount < totalSteps) {
            /* Move one step in the chosen direction */
            currentStepIndex = (currentStepIndex + stepDirection + totalImages) % totalImages;
            showMuseum(currentStepIndex);
            stepCount++;
            setTimeout(animateTransition, stepDelay);
        } else {
            /* Reached the target */
            preloadAdjacentImages();
        }
    }
    
    /* Start the animation */
    animateTransition();
}

function randomMuseum() {
    if (!museums || museums.length === 0) return;
    
    /* Pick a random index with distance between 20 and 50 from current index */
    const minStepDistance = 20;
    const maxStepDistance = 50;
    const totalImages = museums.length;
    
    /* Calculate the range for random selection with minimum 20 and maximum 50 steps */
    const minDistance = Math.max(0, currentIndex - maxStepDistance);
    const maxDistance = Math.min(totalImages - 1, currentIndex + maxStepDistance);
    
    /* Ensure minimum distance of 20 steps from current index */
    const adjustedMinDistance = Math.max(minDistance, currentIndex - minStepDistance);
    const adjustedMaxDistance = Math.min(maxDistance, currentIndex + maxStepDistance);
    
    /* Pick a random index within the adjusted range */
    const randomIndex = adjustedMinDistance + Math.floor(Math.random() * (adjustedMaxDistance - adjustedMinDistance + 1));
    
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

