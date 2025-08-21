---
layout: chantier
title: Progress!
started:  2025-06-16 04:50
ended: 2025-07-17 11:08
result: [vibe, web]
tech: [Claude 4]
description: |
    This is a vibe coding experiment with animations that evoke Progress!
---

## BIOS Boot Sequence

> Create a retro BIOS boot sequence animation with scrolling text showing system initialization, memory checks, and hardware detection in green monospace font on black background. As an easter egg, place Secure Nested Paging as part of the sequence.

<div class="preview">
{% include progress/bios.html %}
</div>

---

## Dynamic Link Library Loading

> Recreate a classic 2 loading-bars DOS DLL animation with .dll names appearing one by one, showing "Loading..." for the first bar and overall progress for the second. Generate .dll names and load them randomly. Some of them should take longer to load than others.

<div class="preview">
{% include progress/dll.html %}
</div>

---

## Windows 95 Progress Bar

> Recreate the authentic Windows 95 loading interface with the classic gray shell window, Microsoft Windows 95 logo, navy blue progress bar with smooth 1% increments, and authentic typography.

<div class="preview">
{% include progress/win95.html %}
</div>

---

## Aqua Loading Interface

> Recreate the classic macOS Aqua loading interface with authentic traffic light controls, retro gradient titlebar, animated candy-striped progress bar with blue gradient fill, and the distinctive early 2000s Apple design aesthetic.

<div class="preview">
{% include progress/aqua.html %}
</div>

---

## Windows 8 Wait State

> Recreate a Windows 8 loading window with blue titlebar, flat design controls, rotating spinner animation, and the signature Segoe UI typography characteristic of the Metro design language.

<div class="preview">
{% include progress/win8.html %}
</div>

---

## Time Machine Interface

> Recreate the macOS Time Machine setting interface according to the screenshot. Make sure the animation works.

<div class="preview">
{% include progress/time-machine.html id="main" %}
</div>

---

## Claude 4

> Draw Claude 4.

<div class="preview">
{% include progress/claude.html %}
</div>

---

## Spinner

> Make as many classic spinners as you can. Be creative!

<div class="preview">
{% include progress/spinners.html %}
</div>

<style>
.preview {
  min-height: 60px;
  margin-top: 1rem;
  /* Container for scaling */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
}

.preview > * {
  /* Scale like an image - automatically fit viewport width */
  transform: scale(clamp(0.1, calc((100vw - 40px) / 640px), 1));
  transform-origin: center top;
  box-sizing: border-box;
}

blockquote {
  margin-top: 0.5em;
}
</style>