---
hidden: true
layout: chantier
title: CHANGELOG
started: 2025-05-17
ended: 2025-05-17
description: |
    Changelog for the website.
---

## v{{ "now" | date: "%Y.%m" }}-rc
{% include random-emoji.html %} Bug fixes and performance improvements.

{% for log in site.data.changelog %}
## {{ log.version }}
{% include random-emoji.html %} {{ log.description }}
{% endfor %}