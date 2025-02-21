---
layout: chantier-standalone
title: Proceed with caution
tags: web
started: 2025-02-19 13:30
finished: 2025-02-19 14:00
location: Munich
css:
  - home.css
  - methods.css
  - strict.css
header_raw_inject:
  - '<meta name="theme-color" content="#000000">'
---

<div class="center-and-center">
    <h1>⚠️ WORK IN PROGRESS️️ ⚠️</h1>
    <p><span id="indicator">•</span> Proceed with caution</p>
    <div style="margin-top: 4em;">
        <button onclick="window.location.href='/'">PROCEED WITH CAUTION</button>
        <button id="proceed-button" title="0">PROCEED</button>
    </div>
</div>

<style>
  .hidden {
    opacity: 0;
    pointer-events: none;
  }
</style>

<script>
    let counter = 0;
    const indicator = document.getElementById('indicator');
    const proceedButton = document.getElementById('proceed-button');

    proceedButton.addEventListener('click', () => {
        counter++;
        indicator.textContent = `•`;
        proceedButton.title = `${counter}`;

        if (counter >= 3) {
            proceedButton.classList.add('hidden');
        }
    });
</script>