---
layout: chantier-blank
title: this is what museums look like
started: 2016-01-01 23:42
ended:
featured: true
labels: [list, illustration]
tech: [Index cards, Uniball micro]
location: Belleville
description:
---

<style>
.data-content {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: 400px;
    margin: 20px 0;
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
</style>

<div class="header-controls">
    <p id="museumText" class="info"></p>
    <div class="controls">
        <button onclick="previousMuseum()">← Previous</button>
        <button onclick="shuffleMuseums()">↔ Shuffle</button>
        <button onclick="nextMuseum()">→ Next</button>
    </div>
</div>

<div class="data-content"></div>

<script>
const museums = {{ site.data.assets-2016.museums | jsonify }};
let currentIndex = 0;
let shuffledOrder = [];

document.addEventListener('DOMContentLoaded', function() {
    if (museums && museums.length > 0) {
        shuffledOrder = [...Array(museums.length).keys()];
        showMuseum(0);
    } else {
        document.getElementById('museumText').textContent = 'No museum data found. Check _data/museums.json.';
    }
});

function showMuseum(index) {
    if (!museums || museums.length === 0) return;
    const museum = museums[shuffledOrder[index]];
    const dataContent = document.querySelector('.data-content');
    const museumText = document.getElementById('museumText');

    if (dataContent && museum.image) {
        dataContent.style.backgroundImage = `url(/assets/2016/museums/${museum.image})`;
    }
    if (museumText) {
        museumText.textContent = museum.description;
    }
    currentIndex = index;
}

function nextMuseum() {
    if (!museums || museums.length === 0) return;
    const nextIndex = (currentIndex + 1) % museums.length;
    showMuseum(nextIndex);
}

function previousMuseum() {
    if (!museums || museums.length === 0) return;
    const prevIndex = (currentIndex - 1 + museums.length) % museums.length;
    showMuseum(prevIndex);
}

function shuffleMuseums() {
    if (!museums || museums.length === 0) return;
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
    }
    const newIndex = Math.floor(Math.random() * museums.length);
    showMuseum(newIndex);
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            previousMuseum();
            break;
        case 'ArrowRight':
            nextMuseum();
            break;
        case ' ':
            event.preventDefault();
            shuffleMuseums();
            break;
    }
});
</script>

