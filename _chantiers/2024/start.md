---
hidden: true
layout: chantier-standalone
title: Start here
started: 2024-08-04 00:00
result: [web]
tech: [html, css, js, Jekyll]
permalink: "/"
description: |
    This is a multi-media repository of projects I am working on. For more information, refer to the&nbsp;<a href="/README">README</a>.
head_raw_inject:
  - <link rel="preload" href="/assets/2024/start/grue-100.webp" as="image" type="image/webp">
  - <link rel="preload" href="/assets/2024/start/barriere-100.webp" as="image" type="image/webp">
---

{% include_relative start/WIP_logo_animated.html %}

{{ page.description }}

<div class="projects-portfolio">
  <div class="projects-column">
    <h2>Finished projects</h2>
    <div class="projects-table">
      <table>
        <thead>
        </thead>
        <tbody>
          {% assign last_year = 0 %}
          {% assign current_year = 0 %}
          {% assign label_year = 0 %}
          {% assign chantiers = site.chantiers | sort: 'ended' %}
          {% for chantier in chantiers reversed %}
              {% unless chantier.hidden %}
              {% if chantier.ended %}
              {% assign current_year = chantier.ended | date: "%Y" %}

              {% if current_year != last_year %}
                  {% assign label_year = current_year %}
                  {% assign last_year = chantier.ended | date: "%Y" %}
              {% else %}
                  {% assign label_year = "" %}
              {% endif %}
                  {% if chantier.ended %}
                  <tr>
                  <td><b>{{ label_year }}</b></td>
                  <td><a href="{{ chantier.url }}">{{ chantier.title }}</a>{% if chantier.spicy %}{% include emojis/spicy.html %}{% endif %}<span class="result-tag"> {{ chantier.result | first }}</span></td>
                  </tr>
                  {% endif %}
              {% endif %}
              {% endunless %}
          {% endfor %}
        </tbody>
      </table>
    </div>
  </div>

  <div class="projects-column">
    <h2>Ongoing projects</h2>
    <div class="projects-table">
      <table>
        <thead>
        </thead>
        <tbody>
          {% assign last_year = 0 %}
          {% assign current_year = 0 %}
          {% assign label_year = 0 %}
          {% assign chantiers = site.chantiers | sort: 'started' %}
          {% for chantier in chantiers reversed %}
              {% unless chantier.ended %}
              {% unless chantier.hidden %}
              {% assign current_year = chantier.started | date: "%Y" %}

              {% if current_year != last_year %}
                  {% assign label_year = current_year %}
                  {% assign last_year = chantier.started | date: "%Y" %}
              {% else %}
                  {% assign label_year = "" %}
              {% endif %}
                  {% if chantier.started %}
                  <tr>
                  <td><b>{{ label_year }}</b></td>
                  <td><a href="{{ chantier.url }}">{{ chantier.title }}</a> {% if chantier.spicy %}{% include emojis/spicy.html %}{% endif %} <span class="result-tag"> {{ chantier.result | first }}</span></td>
                  </tr>
                  {% endif %}
              {% endunless %}
              {% endunless %}
          {% endfor %}
        </tbody>
      </table>
    </div>
  </div>
</div>

{% include license.html %}

<br>

<div class="macmade-container">
  {% comment %}
  <a href="{% link _chantiers/2025/nix-config.md %}">
  {% endcomment %}
    <picture>
      <source srcset="{% link /assets/img/macmade-blk.gif %}" media="(prefers-color-scheme: dark)">
      <img src="{% link /assets/img/macmade-wht.gif %}" alt="macmade">
    </picture>
  {% comment %}
  </a>
  {% endcomment %}
</div>

<br><br><br><br>

<div class="banner">
  {% include_relative start/banner.html %}
</div>

<style>
.main-title {
  word-wrap: break-word;
}

.projects-portfolio {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap-reverse;
}

.projects-column {
  flex: 1;
  margin-left: 3%;
  min-width: 280px;
  max-width: 600px;
}

.projects-table {
  flex: 1;
}

.macmade-container {
  text-align: center;
}

/* Result tags */
.result-tag {
  color: darkgrey;
  font-weight: 350;
}

/* Table styles */
tr {
  height: 2em;
}

td {
  padding-right: 15px;
  vertical-align: top;
}

/* Link styles */
a:link {
  color: black;
}

a:visited {
  color: darkgrey;
}

/* Add padding to prevent content from being hidden behind fixed banner */
body {
  padding-bottom: 2rem;
}
</style>
