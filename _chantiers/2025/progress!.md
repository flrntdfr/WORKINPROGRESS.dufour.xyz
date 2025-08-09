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

<div class="progress-showcase">
  <section class="progress-item">
    <h2>BIOS Boot Sequence</h2>
    <p class="subtitle">Create a retro BIOS boot sequence animation with scrolling text showing system initialization, memory checks, and hardware detection in green monospace font on black background. As an easter egg, place Secure Nested Paging as part of the sequence.</p>
    <div class="preview">{% include progress/bios.html %}</div>
  </section>

  <section class="progress-item">
    <h2>Dynamic Link Library Loading</h2>
    <p class="subtitle">Recreate a classic 2 loading-bars DOS DLL animation with .dll names appearing one by one, showing "Loading..." for the first bar and overall progress for the second. Generate .dll names and load them randomly. Some of them should take longer than others to load.</p>
    <div class="preview">{% include progress/dll.html %}</div>
  </section>

  <section class="progress-item">
    <h2>Windows 95 Progress Bar</h2>
    <p class="subtitle">Recreate the authentic Windows 95 loading interface with the classic gray shell window, Microsoft Windows 95 logo, navy blue progress bar with smooth 1% increments, and authentic MS Sans Serif typography.</p>
    <div class="preview">{% include progress/win95.html %}</div>
  </section>

  <section class="progress-item">
    <h2>Aqua Loading Interface</h2>
    <p class="subtitle">Recreate the classic macOS Aqua/Carbon window interface with authentic traffic light controls, retro gradient titlebar, animated candy-striped progress bar with blue gradient fill, and the distinctive early 2000s Apple design aesthetic.</p>
    <div class="preview">{% include progress/aqua.html %}</div>
  </section>

  <section class="progress-item">
    <h2>Windows 8 Wait State</h2>
    <p class="subtitle">Recreate a Windows 8 loading window with blue titlebar, flat design controls, rotating spinner animation, and the signature Segoe UI typography characteristic of the Metro design language.</p>
    <div class="preview">{% include progress/win8.html %}</div>
  </section>

  <section class="progress-item">
    <h2>Time Machine Interface</h2>
    <p class="subtitle">Recreate the macOS Time Machine setting interface according to the screenshot. Make the animation work.</p>
    <div class="preview">{% include progress/time-machine.html id="main" %}</div>
  </section>

  <section class="progress-item">
    <h2>Claude 4</h2>
    <p class="subtitle">Draw Claude 4.</p>
    <div class="preview">{% include progress/claude.html %}</div>
  </section>

  <section class="progress-item">
    <h2>Spinner</h2>
    <p class="subtitle">Make as many classic spinners as you can: macOS, classic windows, common web spinners etc. Be creative!</p>
    <div class="preview">{% include progress/spinners.html %}</div>
  </section>
</div>

<style>
  .progress-showcase {
    margin: 2rem 0;
    max-width: 100%;
  }

  .progress-item {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
  }

  .progress-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .progress-item h2 {
    font-weight: 500;
    font-size: 1.25rem;
    color: #333;
    line-height: 1.4;
    margin: 0 0 0.5rem 0;
  }

  .progress-item .subtitle {
    font-size: 0.875rem;
    color: #777;
    font-style: italic;
    line-height: 1.3;
    margin: 0 0 1.5rem 0;
  }

  .progress-item .preview {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>