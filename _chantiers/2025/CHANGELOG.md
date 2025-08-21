---
hidden: true
layout: chantier
title: CHANGELOG
started:  2020-07-28 12:49:28
ended: 
result: [list]
---

{%- comment -%} Calculate statistics {%- endcomment -%}
{%- assign total_chantiers = site.chantiers.size -%}
{%- assign open_chantiers = 0 -%}
{%- assign closed_chantiers = 0 -%}
{%- assign total_duration_days = 0 -%}
{%- assign longest_running_days = 0 -%}
{%- assign longest_running_project = "" -%}
{%- assign years = "" | split: "" -%}
{%- assign current_year = "now" | date: "%Y" -%}
{%- assign current_year_projects = 0 -%}

{%- comment -%} Process all chantiers {%- endcomment -%}
{%- for chantier in site.chantiers -%}
  {%- assign ended_value = chantier.ended -%}
  {%- assign created_value = chantier.started -%}

  {%- if ended_value and ended_value != "" and ended_value != nil -%}
    {%- if created_value and created_value != "" and created_value != nil -%}
      {%- assign closed_chantiers = closed_chantiers | plus: 1 -%}
      {%- assign created_sec = chantier.started | date: '%s' -%}
      {%- assign ended_sec = chantier.ended | date: '%s' -%}
      {%- assign duration_sec = ended_sec | minus: created_sec -%}
      {%- assign duration_days = duration_sec | divided_by: 86400 | plus: 1 -%}
      {%- assign total_duration_days = total_duration_days | plus: duration_days -%}
    {%- endif -%}
  {%- else -%}
    {%- assign open_chantiers = open_chantiers | plus: 1 -%}
    {%- if created_value and created_value != "" and created_value != nil -%}
      {%- assign created_sec = chantier.started | date: '%s' -%}
      {%- assign now_sec = "now" | date: '%s' -%}
      {%- assign running_duration_sec = now_sec | minus: created_sec -%}
      {%- assign running_duration_days = running_duration_sec | divided_by: 86400 -%}
      {%- if running_duration_days > longest_running_days -%}
        {%- assign longest_running_days = running_duration_days -%}
        {%- assign longest_running_project = chantier.title -%}
      {%- endif -%}
    {%- endif -%}
  {%- endif -%}

  {%- if created_value and created_value != "" and created_value != nil -%}
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

```
===================================
WIP {{ site.time | date: "%Y-%m-%d %H:%M:%S" }} (build 150)
===================================

Open projects    {% assign open_bars = open_chantiers | times: 50 | divided_by: total_chantiers %}{% for i in (1..open_bars) %}█{% endfor %}{% for i in (open_bars..49) %}░{% endfor %} {{ open_chantiers }}
Closed projects  {% assign closed_bars = closed_chantiers | times: 50 | divided_by: total_chantiers %}{% for i in (1..closed_bars) %}█{% endfor %}{% for i in (closed_bars..49) %}░{% endfor %} {{ closed_chantiers }}
Total Projects                                                      {{ total_chantiers }}

Projects completion:         {{ completion_rate | round: 1 }}%
Average project duration:    {{ avg_duration_days | round: 0 }} days
{%- if open_chantiers > 0 %}
Longest running project:     {{ longest_running_days | round: 0 }} days ({{ longest_running_project }})
{%- else %}
Longest running project: N/A (no open projects)
{%- endif %}
Average projects per year:   {{ total_chantiers | divided_by: sorted_years.size | round: 1 }}
Projects started this year:  {{ current_year_projects }}
```

{% comment %} Process all chantiers and create a simple list of events {% endcomment %}
{% assign all_events = "" | split: "" %}

{% comment %} Add all chantier events {% endcomment %}
{% for chantier in site.chantiers %}
  {% if chantier.started and chantier.started != "" %}
    {% assign event = chantier.title | append: "|started|" | append: chantier.started | append: "|" | append: chantier.url %}
    {% assign all_events = all_events | push: event %}
  {% endif %}
  {% if chantier.ended and chantier.ended != "" %}
    {% assign event = chantier.title | append: "|ended|" | append: chantier.ended | append: "|" | append: chantier.url %}
    {% assign all_events = all_events | push: event %}
  {% endif %}
{% endfor %}

{% comment %} Add manual changelog entries {% endcomment %}
{% for entry in site.data.changelog %}
  {% assign event = entry.description | append: "|manual|" | append: entry.date | append: "|manual" %}
  {% assign all_events = all_events | push: event %}
{% endfor %}

{% comment %} Sort events by date (newest first) {% endcomment %}
{% assign sorted_events = all_events | sort | reverse %}

{% comment %} Group events by month and prepare output {% endcomment %}
{% assign output = "" | split: "" %}
{% assign current_month = "" %}
{% assign current_month_events = "" | split: "" %}

{% for event in sorted_events %}
  {% assign parts = event | split: "|" %}
  {% assign title = parts[0] %}
  {% assign type = parts[1] %}
  {% assign date = parts[2] %}
  {% assign url = parts[3] %}
  
  {% comment %} Extract year and month {% endcomment %}
  {% assign date_parts = date | split: "-" %}
  {% assign year = date_parts[0] %}
  {% assign month = date_parts[1] %}
  {% assign month_key = year | append: "-" | append: month %}
  
  {% if month_key != current_month %}
    {% comment %} Save previous month if it exists {% endcomment %}
    {% if current_month != "" and current_month_events.size > 0 %}
      {% assign month_output = current_month | append: "|" | append: current_month_events | join: "||" %}
      {% assign output = output | push: month_output %}
    {% endif %}
    
    {% comment %} Start new month {% endcomment %}
    {% assign current_month = month_key %}
    {% assign current_month_events = "" | split: "" %}
  {% endif %}
  
  {% comment %} Add event to current month {% endcomment %}
  {% assign current_month_events = current_month_events | push: event %}
{% endfor %}

{% comment %} Add the last month {% endcomment %}
{% if current_month != "" and current_month_events.size > 0 %}
  {% assign month_output = current_month | append: "|" | append: current_month_events | join: "||" %}
  {% assign output = output | push: month_output %}
{% endif %}

{% comment %} Now output the changelog {% endcomment %}
{% for month_data in output %}
  {% assign month_parts = month_data | split: "|" %}
  {% assign month_key = month_parts[0] %}
  {% assign month_events = month_parts[1] | split: "||" %}
  
  {% comment %} Extract month info {% endcomment %}
  {% assign month_parts = month_key | split: "-" %}
  {% assign year = month_parts[0] %}
  {% assign month_num = month_parts[1] %}
  {% assign month_name = month_key | append: "-01" | date: "%B" %}
  
  {% comment %} Process events for this month {% endcomment %}
  {% assign started_projects = "" | split: "" %}
  {% assign ended_projects = "" | split: "" %}
  {% assign created_projects = "" | split: "" %}
  {% assign manual_entries = "" | split: "" %}
  
  {% for event in month_events %}
    {% assign parts = event | split: "|" %}
    {% assign title = parts[0] %}
    {% assign type = parts[1] %}
    {% assign date = parts[2] %}
    {% assign url = parts[3] %}
    
    {% if type == "manual" %}
      {% assign manual_entries = manual_entries | push: title %}
    {% elsif type == "started" %}
      {% comment %} Check if project also ended this month {% endcomment %}
      {% assign chantier = site.chantiers | where: "title", title | first %}
      {% assign same_month_ended = false %}
      {% if chantier.ended and chantier.ended != "" %}
        {% assign ended_parts = chantier.ended | split: "-" %}
        {% if ended_parts[0] == year and ended_parts[1] == month_num %}
          {% assign same_month_ended = true %}
        {% endif %}
      {% endif %}
      
      {% if same_month_ended %}
        {% assign created_projects = created_projects | push: title %}
      {% else %}
        {% assign started_projects = started_projects | push: title %}
      {% endif %}
    {% elsif type == "ended" %}
      {% comment %} Check if project also started this month {% endcomment %}
      {% assign chantier = site.chantiers | where: "title", title | first %}
      {% assign same_month_started = false %}
      {% if chantier.started and chantier.started != "" %}
        {% assign started_parts = chantier.started | split: "-" %}
        {% if started_parts[0] == year and started_parts[1] == month_num %}
          {% assign same_month_started = true %}
        {% endif %}
      {% endif %}
      
      {% unless same_month_started %}
        {% assign ended_projects = ended_projects | push: title %}
      {% endunless %}
    {% endif %}
  {% endfor %}
  
  {% comment %} Output this month {% endcomment %}
  {% if manual_entries.size > 0 or started_projects.size > 0 or ended_projects.size > 0 or created_projects.size > 0 %}
    ---
    
    ## {{ month_name }} {{ year }}
    
    {% if manual_entries.size > 0 %}
      {% for entry in manual_entries %}
        > {{ entry }}
      {% endfor %}
    {% endif %}
    
    {% if created_projects.size > 0 %}
      ### Created
      {% for title in created_projects %}
        {% assign chantier = site.chantiers | where: "title", title | first %}
        {% assign ended_sec = chantier.started | date: '%s' %}
        {% assign started_sec = chantier.ended | date: '%s' %}
        {% assign seconds_diff = started_sec | minus: ended_sec %}
        {% assign days_diff = seconds_diff | divided_by: 86400 | plus: 1 %}
        - **{{ title }}** ({{ days_diff }} days, [GO ➟]({{ chantier.url }}))
      {% endfor %}
    {% endif %}
    
    {% if started_projects.size > 0 %}
      ### Started
      {% for title in started_projects %}
        {% assign chantier = site.chantiers | where: "title", title | first %}
        - **{{ title }}**
      {% endfor %}
    {% endif %}
    
    {% if ended_projects.size > 0 %}
      ### Ended
      {% for title in ended_projects %}
        {% assign chantier = site.chantiers | where: "title", title | first %}
        {% assign ended_sec = chantier.started | date: '%s' %}
        {% assign started_sec = chantier.ended | date: '%s' %}
        {% assign seconds_diff = started_sec | minus: ended_sec %}
        {% assign days_diff = seconds_diff | divided_by: 86400 | plus: 1 %}
        - **{{ title }}** ({{ days_diff }} days, [GO ➟]({{ chantier.url }}))
      {% endfor %}
    {% endif %}
  {% endif %}
{% endfor %}

<style>
h2 {
  padding-bottom: 6px;
  margin-bottom: 8px;
}

h3 {
  margin-top: 12px;
  margin-bottom: 6px;
  font-size: 1.05em;
}

/* First h3 after h2 has less top margin */
h2 + h3 {
  margin-top: 8px;
}

/* Compact list styling */
ul {
  margin: 0 0 8px 0;
  padding-left: 20px;
}

li {
  margin-bottom: 2px;
  line-height: 1.4;
  color: #24292e;
}

/* Tighter spacing between sections */
h3 + ul {
  margin-top: 4px;
}

blockquote {
  margin: 0 0 0.5em 0;
  padding-left: 1em;
  border-left: 2px solid #ccc;
}

blockquote p {
  margin: 0 0 0 0;
}
</style>