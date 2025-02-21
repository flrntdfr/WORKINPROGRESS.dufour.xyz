---
layout: chantier-standalone
title: lobby (you are here)
started: 2024-08-04 00:00
finished: 2025-02-20 00:00
archived:
tags: web
href: https://workinprogress.dufour.xyz/lobby
tech: html, css, Jekyll
permalink: "/"
---

# 🏗️ WORKINPROGRESS.dufour.xyz 🚧

Welcome. This over here have been in progress as of {{ "now" | date: "%m/%Y" }}. for some time. Others are not anymore. You can learn more on my blog: https://blog.dufour.xyz/lab-project-un-hibernated. Welcome. This over here have been in progress as of {{ "now" | date: "%m/%Y" }}. for some time. Others are not anymore. You can learn more on my blog: https://blog.dufour.xyz/lab-project-un-hibernated

<div class="row">
  <div class="column">
    <h2>Finished construction sites</h2>
    <ul>
      {% for chantier in site.chantiers reversed %}
      {% if chantier.finished %}
      <li><strong>{{ chantier.started | date: "%Y" }}</strong> <a href="{{ chantier.url }}">{{ chantier.title }}</a> {% if chantier.featured == true %}✭{% endif %} <span style="color: darkgrey; font-weight: 350;">{{ chantier.tags | join: ", " }} </span></li>
      {% endif %}
      {% endfor %}
    </ul>
  </div>
  <div class="column">
    <h2>Active construction sites</h2>
    <ul>
      {% for chantier in site.chantiers reversed %}
      {% unless chantier.finished %}
      <li><strong>{{ chantier.started | date: "%Y" }}</strong> <a href="{{ chantier.url }}">{{ chantier.title }}</a> {% if chantier.featured == true %}✭{% endif %} <span style="color: darkgrey; font-weight: 350;">{{ chantier.tags | join: ", " }} </span> </li>
      {% endunless %}
      {% endfor %}
    </ul>
  </div>
</div>

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.](https://creativecommons.org/licenses/by-nc-sa/4.0/)

For inquiries, please get in touch: contact@dufour.xyz, biz@dufour.xyz.

<style>
.banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color:#fdf52b;
  overflow: hidden;
  white-space: nowrap;
}

.banner p {
  display: inline-block;
  padding-left: 100%;
  animation: banner-slide 20s linear infinite;
  /* Enable GPU acceleration */
  transform: translateZ(0);
}

@keyframes banner-slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

<br><br><br>

<div class="banner">
  <p>Update {{ "now" | date: "%m/%Y" }}: A new feature has been added to enhance user experience. Bug fixes and performance improvements have also been made. Stay tuned for more updates!</p>
</div>