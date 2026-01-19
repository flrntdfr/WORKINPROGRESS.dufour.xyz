---
layout: chantier-blank
title: iOS 15 Emojis Pack
started: 2022-01-16 01:28
ended: 2022-01-16 01:28
result: [dataset]
description: |
    This dataset contains all Apple iOS 15 emojis in 72x72 SVG format.
    <br>
    <div style="font-size: 10px;">© Apple Inc. All emojis are copyrighted and trademarked by Apple Inc. Not affiliated with or endorsed by Apple Inc. Not for commercial use. Credit to figma Community file 1079620626888497486.</div>
---

<div class="emojis-container">
<img src="{% link /assets/2022/emojis/pack-ios15-72x72.svg %}" alt="iOS 15 Emojis Pack" />
</div>

<style>

/* Emojis container */

.emojis-container {
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    overflow: auto;
    background: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    /* Smooth scrolling */
    scroll-behavior: smooth;
    /* Better scrollbar styling for webkit browsers */
    -webkit-overflow-scrolling: touch;
}

.emojis-container img {
    display: block;
    max-width: none;
    width: auto;
    height: auto;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

/* Scrollbars */

.emojis-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.emojis-container::-webkit-scrollbar-track {
    background: #ffffff;
}

.emojis-container::-webkit-scrollbar-thumb {
    background: #000000;
}

.emojis-container::-webkit-scrollbar-thumb:hover {
    background: #333333;
}
</style>