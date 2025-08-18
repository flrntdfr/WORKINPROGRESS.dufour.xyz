---
hidden: true
layout: chantier
title: CHANGELOG
started:  2020-07-28 12:49:28
ended: 
result: [list]
description: |
    Changelog of the CMS.
---

## v0.1.{{ "now" | date: "%y%m" }}-rc
Bug fixes and performance improvements.

{% for log in site.data.changelog %}
## {{ log.version }}
{{ log.emoji }} {{ log.description }}
{% endfor %}