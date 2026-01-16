---
layout: chantier-blank
title: Emojis Pack
started: 2026-01-16 01:28:53
ended: 2026-01-16 01:28:53
result: [web]
#href:
#   - ["ext", "1", "Figma community file: 1079620626888497486", "https://www.figma.com/community/file/1079620626888497486"]
description: |
    These are all Apple iOS 15 emojis (2021) in 72x72 SVG format. <a target="_blank" noreferrer noopener href="https://www.figma.com/community/file/1079620626888497486">Credit to figma Community file 1079620626888497486</a>.
    <br>
    <div style="font-size: 10px;">© Apple Inc. All emojis are copyrighted and trademarked by Apple Inc. Not affiliated with or endorsed by Apple Inc. Not for commercial use.</div>
---

<div class="emojis-container">
{% include_relative pack-ios15-72x72.svg %}
</div>

<style>
.emojis-container {
    width: 100%;
    max-height: 96vh;
    overflow: auto;
    border: 1px solid black;
    background: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    /* Smooth scrolling */
    scroll-behavior: smooth;
    /* Better scrollbar styling for webkit browsers */
    -webkit-overflow-scrolling: touch;
}

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

/* Ensure SVG scales to its natural size and allows scrolling */
.emojis-container svg {
    display: block;
    max-width: none;
    height: auto;
}
</style>