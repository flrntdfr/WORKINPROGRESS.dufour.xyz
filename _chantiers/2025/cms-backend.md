---
hidden: true
layout: chantier
title: CMS backend (All)
started: 2025-06-27 17:46
ended: 2025-06-27 17:46
permalink: "/all"
description: |
    <pre>make install</pre>
    <pre>make build</pre>
    <pre>make serve</pre>
    <pre>make update</pre>
href:
  - ["ext", "", "du4://WIP/CMS", "du4://WIP/CMS"]
  - ["ext", "", "http://localhost:4000/all", "http://localhost:4000/all"]
---

{%- comment -%} Calculate comprehensive statistics {%- endcomment -%}
{%- assign total_chantiers = site.chantiers.size -%}
{%- assign open_chantiers = 0 -%}
{%- assign closed_chantiers = 0 -%}
{%- assign total_duration_days = 0 -%}
{%- assign longest_running_days = 0 -%}
{%- assign longest_running_project = "" -%}
{%- assign years = "" | split: "" -%}
{%- assign current_year = "now" | date: "%Y" -%}
{%- assign current_year_projects = 0 -%}

{%- comment -%} Capture build start time {%- endcomment -%}
{%- capture build_start_time -%}{{ site.time | date: "%s" }}{%- endcapture -%}

{%- comment -%} Process all chantiers {%- endcomment -%}
{%- for chantier in site.chantiers -%}
  {%- assign ended_value = chantier.ended -%}
  {%- assign started_value = chantier.started -%}

  {%- if ended_value and ended_value != "" and ended_value != nil -%}
    {%- if started_value and started_value != "" and started_value != nil -%}
      {%- assign closed_chantiers = closed_chantiers | plus: 1 -%}
      {%- assign started_sec = chantier.started | date: '%s' -%}
      {%- assign ended_sec = chantier.ended | date: '%s' -%}
      {%- assign duration_sec = ended_sec | minus: started_sec -%}
      {%- assign duration_days = duration_sec | divided_by: 86400 | plus: 1 -%}
      {%- assign total_duration_days = total_duration_days | plus: duration_days -%}
    {%- endif -%}
  {%- else -%}
    {%- assign open_chantiers = open_chantiers | plus: 1 -%}
    {%- if started_value and started_value != "" and started_value != nil -%}
      {%- assign started_sec = chantier.started | date: '%s' -%}
      {%- assign now_sec = "now" | date: '%s' -%}
      {%- assign running_duration_sec = now_sec | minus: started_sec -%}
      {%- assign running_duration_days = running_duration_sec | divided_by: 86400 -%}
      {%- if running_duration_days > longest_running_days -%}
        {%- assign longest_running_days = running_duration_days -%}
        {%- assign longest_running_project = chantier.title -%}
      {%- endif -%}
    {%- endif -%}
  {%- endif -%}

  {%- if started_value and started_value != "" and started_value != nil -%}
    {%- assign year = chantier.started | date: "%Y" -%}
    {%- unless years contains year -%}
      {%- assign years = years | push: year -%}
    {%- endunless -%}
    {%- if year == current_year -%}
      {%- assign current_year_projects = current_year_projects | plus: 1 -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}

{%- assign sorted_years = years | sort -%}

{%- comment -%} Calculate averages and rates {%- endcomment -%}
{%- if closed_chantiers > 0 -%}
  {%- assign avg_duration_days = total_duration_days | divided_by: closed_chantiers -%}
{%- else -%}
  {%- assign avg_duration_days = 0 -%}
{%- endif -%}
{%- if total_chantiers > 0 -%}
  {%- assign completion_rate = closed_chantiers | times: 100.0 | divided_by: total_chantiers -%}
{%- else -%}
  {%- assign completion_rate = 0 -%}
{%- endif -%}

**Statistics**

```
Total Projects: {{ total_chantiers }}

Open projects    {% assign open_bars = open_chantiers | times: 50 | divided_by: total_chantiers %}{% for i in (1..open_bars) %}█{% endfor %}{% for i in (open_bars..49) %}░{% endfor %} {{ open_chantiers }}
Closed projects  {% assign closed_bars = closed_chantiers | times: 50 | divided_by: total_chantiers %}{% for i in (1..closed_bars) %}█{% endfor %}{% for i in (closed_bars..49) %}░{% endfor %} {{ closed_chantiers }}

Completion Rate: {{ completion_rate | round: 1 }}%
Average Duration: {{ avg_duration_days | round: 0 }} days
{%- if open_chantiers > 0 %}
Longest Running Project: {{ longest_running_days | round: 0 }} days ({{ longest_running_project }})
{%- else %}
Longest Running Project: N/A (no open projects)
{%- endif %}
Projects started this year: {{ current_year_projects }}
Average projects per year: {{ total_chantiers | divided_by: sorted_years.size | round: 1 }}
```
<br>

---

<br>

**All projects**

{% comment %} Collect all unique labels from chantiers {% endcomment %}
{%- assign all_labels = "" | split: "" -%}
{%- for chantier in site.chantiers -%}
  {%- for label in chantier.labels -%}
    {%- unless all_labels contains label -%}
      {%- assign all_labels = all_labels | push: label -%}
    {%- endunless -%}
  {%- endfor -%}
{%- endfor -%}

{% comment %} Manual alphabetical sorting of labels {% endcomment %}
{%- assign sorted_labels = all_labels | sort_natural -%}

{% comment %} Display chantiers grouped by label {% endcomment %}
{%- for label in sorted_labels -%}
  {%- assign chantiers_for_label = "" | split: "" -%}
  {%- for chantier in site.chantiers -%}
    {%- if chantier.labels contains label -%}
      {%- assign chantiers_for_label = chantiers_for_label | push: chantier -%}
    {%- endif -%}
  {%- endfor -%}
  
  <details>
    <summary>{{ label }} <span style="color: darkgrey;">({{ chantiers_for_label.size }})</span></summary>
    <ul>
      {%- assign sorted_chantiers = chantiers_for_label | sort: 'title' -%}
      {%- for chantier in sorted_chantiers -%}
        <li>
          <a href="{{ chantier.url }}">{{ chantier.title }}</a>
          {%- if chantier.featured %} ✭{%- endif -%}
          {%- if chantier.ended -%}
            <span style="color: darkgrey;">({{ chantier.ended | date: "%Y" }})</span>
          {%- else -%}
            <span style="color: darkgrey;">({{ chantier.started | date: "%Y" }})</span>
          {%- endif -%}
        </li>
      {%- endfor -%}
    </ul>
  </details>
{%- endfor -%}

{% comment %} Display hidden chantiers {% endcomment %}
{%- assign hidden_chantiers = "" | split: "" -%}
{%- for chantier in site.chantiers -%}
  {%- if chantier.hidden -%}
    {%- assign hidden_chantiers = hidden_chantiers | push: chantier -%}
  {%- endif -%}
{%- endfor -%}

{%- if hidden_chantiers.size > 0 -%}
  <details>
    <summary>zz_hidden <span style="color: darkgrey;">({{ hidden_chantiers.size }})</span></summary>
    <ul>
      {%- assign sorted_hidden_chantiers = hidden_chantiers | sort: 'title' -%}
      {%- for chantier in sorted_hidden_chantiers -%}
        <li>
          <a href="{{ chantier.url }}">{{ chantier.title }}</a>
          {%- if chantier.featured %} ✭{%- endif -%}
          {%- if chantier.ended -%}
            <span style="color: darkgrey;">({{ chantier.ended | date: "%Y" }})</span>
          {%- else -%}
            <span style="color: darkgrey;">({{ chantier.started | date: "%Y" }})</span>
          {%- endif -%}
        </li>
      {%- endfor -%}
    </ul>
  </details>
{%- endif -%}

<br>

---

_Last touched: {{ site.time | date: "%Y-%m-%d %H:%M:%S" }}_



---