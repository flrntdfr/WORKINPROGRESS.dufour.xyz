---
layout: chantier
title: test
started: 2024-08-04 19:06
finished: 2024-08-05 19:07
modified: 2024-08-04 19:07
tags: web
href: http://localhost:4000
description: |
    This construction site is reserved for testing purposes.
---

<button onclick="showTested()">test</button>
<p id="tested-label" style="display: none;">tested</p>

<script>
function showTested() {
    document.getElementById("tested-label").style.display = "block";
}
</script>

