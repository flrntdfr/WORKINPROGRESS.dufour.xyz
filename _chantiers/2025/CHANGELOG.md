---
hidden: true
layout: chantier
title: CHANGELOG
started: 2020-07-28 12:49:28
ended: 
labels: [list]
description: |
    Changelog of the website.
---

## v{{ "now" | date: "%Y.%m" }}-rc
🏗️ Bug fixes and performance improvements.

{% for log in site.data.changelog %}
## {{ log.version }}
{{ log.emoji }} {{ log.description }}
{% endfor %}