---
hidden: true
layout: chantier
title: CHANGELOG
started: 2020-07-28 12:49:28
ended: 
labels: [list]
description: |
    Changelog for the content management system.
related:
  label: content management system
  url: _chantiers/2025/cms.md
---

## v{{ "now" | date: "%Y.%m" }}-rc
🏗️ Bug fixes and performance improvements.

{% for log in site.data.changelog %}
## {{ log.version }}
{{ log.emoji }} {{ log.description }}
{% endfor %}