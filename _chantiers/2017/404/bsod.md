---
hidden: true
theme-color: "#0000AA"
layout: blank
title: "404 (variation 3)"
permalink: "/404/3"
description: A fatal exception 404 has occurred.
---


<div class="bsod">
  <div class="bsod-title">WORK IN PROGRESS</div>
  <div class="bsod-content">
    <pre>
A fatal exception 404 has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.
The current application will be terminated.

*  Press any key to terminate the current application and return to the home page.
*  Press CTRL+ALT+DEL to restart your computer. You will lose all unsaved data.

If you continue to experience problems, disable or remove any newly installed hardware or software. 
Contact your system administrator. This incident has not been logged.

Technical information:
*** 404_NOT_FOUND *** PAGE_NOT_FOUND
>>> Exception 0E at 0028:C0011E36
>>> VXD VMM(01) + 00010E36
    </pre>
  </div>
</div>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.bsod {
  background: #0000AA;
  color: #FFFFFF;
  font-family: var(--font-family-monospace);
  cursor: not-allowed;
  margin: 0 0 0 0;
  padding: 1em 1em 1em 1em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.bsod-title {
  text-align: center;
  margin-bottom: 1em;
  font-size: 1em;
}

.bsod-content {
  white-space: pre;
  font-family: var(--font-family-monospace);
  line-height: 1.4;
  text-align: left;
}
</style>

<script>
document.addEventListener('keydown', function(event) {
  window.location.href = '/';
});
</script>