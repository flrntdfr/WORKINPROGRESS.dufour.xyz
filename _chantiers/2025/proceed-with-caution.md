---
layout: chantier-standalone
title: Proceed with caution
labels: [web]
started: 2025-02-19 13:30
ended: 2025-02-19 14:00
location: Munich
header_raw_inject:
  - '<meta name="theme-color" content="#000000">'
---

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: monospace, 'Courier New', Courier, Times;
    color: white;
    background-color: black;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      #000,
      #000 10px,
      #ff0 10px,
      #ff0 20px
    );
    opacity: 0.1;
    z-index: -1;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  .center-and-center {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    padding: 2em;
    border: 4px solid #ff0;
    box-shadow: 0 0 20px rgba(255, 255, 0, 0.3);
  }

  h1 {
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 3px 3px 0 rgba(255, 255, 0, 0.3);
  }

  button {
    background-color: #333;
    color: #ff0;
    border: 2px solid #ff0;
    padding: 12px 24px;
    margin: 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:hover {
    background-color: #ff0;
    color: #000;
  }

  button:active {
    transform: translateY(1px);
  }

  #indicator {
    color: #ff0;
    font-size: 24px;
    text-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
    animation: blink 1s infinite;
    display: inline-block;
    line-height: 0;
    vertical-align: middle;
    position: relative;
    top: -2px;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
</style>

<div class="center-and-center">
    <h1>⚠️ WORK IN PROGRESS️️ ⚠️</h1>
    <p><span id="indicator">•</span> Proceed with caution</p>
    <div style="margin-top: 4em;">
        <button onclick="window.location.href='/'">PROCEED WITH CAUTION</button>
        <button id="proceed-button" title="0">PROCEED</button>
    </div>
</div>

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