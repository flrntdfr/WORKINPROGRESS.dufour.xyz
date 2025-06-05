---
hidden: true
layout: chantier-standalone
title: The website
started: 2024-08-04 00:00
labels: [web]
tech: [html, css, js, Jekyll]
permalink: "/"
description: |
    This is a multi-media repository of projects I am working on. For more information, read the <a href="/README">README</a>.
---

<h1 style="word-wrap: break-word;">🏗️ WORKINPROGRESS.dufour.xyz 🚧</h1>

{{ page.description }}

<div style="display: flex; gap: 2rem; flex-wrap: wrap-reverse;">
  <div style="flex: 1; margin-left: 3%; max-width: 600px;">
    <h2>Closed projects</h2>
    <div style="flex: 1;">
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
                  <td><a href="{{ chantier.url }}">{{ chantier.title }}</a>{% if chantier.featured %}	✭ {% endif %}<span style="color: darkgrey; font-weight: 350;"> {{ chantier.labels | join: ", " }}</span></td>
                  </tr>
                  {% endif %}
              {% endif %}
              {% endunless %}
          {% endfor %}
        </tbody>
      </table>
    </div>
  </div>

  <div style="flex: 1; margin-left: 3%; max-width: 600px;">
    <h2>Open projects</h2>
    <div style="flex: 1;">
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
                  <td><a href="{{ chantier.url }}">{{ chantier.title }}</a> {% if chantier.featured %}	✭ {% endif %} <span style="color: darkgrey; font-weight: 350;"> {{ chantier.labels | join: ", " }}</span></td>
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

This project is published (and hosted) [on GitHub](https://github.com/flrntdfr/WORKINPROGRESS.dufour.xyz) and licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.](https://creativecommons.org/licenses/by-nc-sa/4.0/)

→ Info: [info@dufour.xyz](mailto:info@dufour.xyz) \
→ Business: [biz@dufour.xyz](mail:biz@dufour.xyz)

<div style="text-align: center;">
  <img src="{% link /assets/img/macmade-wht.gif %}" alt="macmade">
</div>

<br><br><br><br>

<div class="banner">
  {% include banner.html %}
</div>

<style>
tr {
    height: 2em;
}

td {
    padding-right: 15px;
    vertical-align: top;
}
    
a:link {
  color: black;
}

a:visited {
  color: darkgrey;
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