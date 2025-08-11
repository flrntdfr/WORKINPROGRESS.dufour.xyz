---
hidden: true
layout: chantier
title: OpenInfra Forum 2025
subtitle: Celebrating OpenStack 15th Anniversary
started:  2025-05-22
ended: 2025-05-22
location: ["Skandia-Teatern, Stockholm"]
result: [research]
href:
    - ["int", "Related project:", "DigiMed Secure Cloud", "_chantiers/2020/digimed-secure-cloud.md"]
---

<iframe
    src="{% link assets/2025/OpenInfra/20250522_OpenInfra.pdf %}" 
    width="100%" 
    height="440px"
    frameborder="0" 
    style="border: none; display: block; margin: 0 auto 2em auto; width: 100%;"
    id="auto-resize-iframe-{{ include.content | slugify }}">
</iframe>


<div class="responsive-grid">
    <div class="left-column">
        <img src="{% link assets/2025/OpenInfra/IMG_2818.jpg %}" alt="OpenInfra Forum 2025" />
    </div>
    <div class="right-column">
        <img src="{% link assets/2025/OpenInfra/IMG_2822.jpg %}" alt="OpenInfra Forum 2025" />
        <img src="{% link assets/2025/OpenInfra/IMG_20250522_173759076_MFNR_HDR.jpg %}" alt="OpenInfra Forum 2025" />
    </div>
</div>

<style>
/* Responsive iframe with aspect ratio preservation */
iframe {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16/9;
    height: auto;
    border: none;
    display: block;
    margin: 0 auto 2em auto;
}

.responsive-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.responsive-grid img {
    width: 100%;
    height: auto;
    display: block;
}

.responsive-grid .right-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

@media (max-width: 900px) {
    .responsive-grid {
        grid-template-columns: 1fr;
    }
}
</style>