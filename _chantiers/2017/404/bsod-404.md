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
A fatal exception 404 has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.<br>
The current application will be terminated.<br>
<br>
*  Press any key to terminate the current application and return to the home page.<br>
*  Press CTRL+ALT+DEL to restart your computer. You will lose all unsaved data.<br>
<br>
If you continue to experience problems, disable or remove any newly installed hardware or software.<br>
Contact your system administrator. This incident has not been logged.<br>
<br>
Technical information:<br>
*** 404_NOT_FOUND *** PAGE_NOT_FOUND<br>
>>> Exception 0E at 0028:C0011E36<br>
>>> VXD VMM(01) + 00010E36<br>
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
  font-size: 0.8em;
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