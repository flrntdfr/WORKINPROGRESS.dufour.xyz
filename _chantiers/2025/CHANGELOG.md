---
#hidden: true
layout: chantier
title: CHANGELOG
started: 2025-05-17
ended: 2025-05-17
description: |
    Changelog for the website.
---

<ul>
{% for log in site.data.changelog %}
        <h2>{{ log.version }}</h2>
        <p>{{ log.description }}</p>
{% endfor %}
</ul>