---
hidden: true
layout: chantier
title: CHANGELOG
started: 2020-07-28 12:49:28
ended: 
labels: [list]
description: |
    Changelog for the website.
related:
  label: the website
  url: _chantiers/2024/the-website.md
---

## v{{ "now" | date: "%Y.%m" }}-rc
🏗️ Bug fixes and performance improvements.

{% for log in site.data.changelog %}
## {{ log.version }}
{{ log.emoji }} {{ log.description }}
{% endfor %}