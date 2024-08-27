---
layout: default
title: lobby
started: 2024-08-04 00:00
modified: 
archived:
type: web
permalink: /2024/lobby
---

<!--

LOAD ONE VERSION OF THE LOBBY FROM THE LOBBY PROJECT

-->


# WORKINPROGRESS.dufour.xyz

Welcome. This over here have been in progress for some time. Others are not anymore.

You can learn more on my blog: https://blog.dufour.xyz/lab-project-un-hibernated 🚧


## Stats

- oldest active construction side: 2hat museums look like (1554 days)
- oldest construction site: fin du monde...
- shortest construction site: test (32 sec)

## Active construction sites

{% for chantier in site.chantiers reversed %}
{% unless chantier.open_to_public == false %}
{% unless chantier.finished %}
- **{{ chantier.started | date: "%Y" }}**: [{{ chantier.title }}]({% link {{ chantier.relative_path }} %}) ({{ chantier.type | join: ", " }}) {% if chantier.featured == true %}✭{% endif %}
{% endunless %}
{% endunless %}
{% endfor %}

## Finished construction sites

{% for chantier in site.chantiers %}
{% unless chantier.open_to_public == false %}
{% if chantier.finished %}
- **{{ chantier.started | date: "%Y" }}**: [{{ chantier.title }}]({% link {{ chantier.relative_path }} %}) ({{ chantier.type | join: ", " }}) {% if chantier.featured == true %}✭{% endif %}
{% endif %}
{% endunless %}
{% endfor %}