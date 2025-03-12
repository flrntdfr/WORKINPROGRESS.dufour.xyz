---
layout: chantier
title: La Carotte
started: 2025-02-21 16:12
ended: 2025-02-21 17:12 
tags: web
---



<div class=run>
🥕
</div>

<script>
const runDiv = document.querySelector('.run');
let dashCount = 300;

const animate = () => {
    dashCount++;
    runDiv.innerHTML = '---'.repeat(dashCount) + '8>  🥕';
    setTimeout(animate, 50);
};

animate();
</script>