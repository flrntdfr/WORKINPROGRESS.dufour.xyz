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

{% comment %} Get all chantiers with start dates {% endcomment %}
{% assign sorted_chantiers = site.chantiers | where_exp: "chantier", "chantier.started != nil and chantier.started != ''" | sort: 'started' | reverse %}

{% comment %} Collect all events {% endcomment %}
{% assign all_events = "" | split: "" %}

{% comment %} Add started and ended events {% endcomment %}
{% for chantier in sorted_chantiers %}
  {% assign event_data = chantier.title | append: "|started|" | append: chantier.started | append: "|" | append: chantier.url %}
  {% assign all_events = all_events | push: event_data %}
  {% if chantier.ended and chantier.ended != "" and chantier.ended != nil %}
    {% assign event_data = chantier.title | append: "|ended|" | append: chantier.ended | append: "|" | append: chantier.url %}
    {% assign all_events = all_events | push: event_data %}
  {% endif %}
{% endfor %}

{% comment %} Add manual changelog entries {% endcomment %}
{% for entry in site.data.changelog %}
  {% assign event_data = entry.description | append: "|manual|" | append: entry.date | append: "|manual" %}
  {% assign all_events = all_events | push: event_data %}
{% endfor %}

{% comment %} Create sortable array for proper chronological sorting {% endcomment %}
{% assign sortable_events = "" | split: "" %}
{% for event_data in all_events %}
  {% assign parts = event_data | split: "|" %}
  {% assign title = parts[0] %}
  {% assign type = parts[1] %}
  {% assign date = parts[2] %}
  {% assign url = parts[3] %}
  
  {% comment %} Create sortable format: YYYY-MM-DD|original_event_data {% endcomment %}
  {% assign sortable_date = date | date: "%Y-%m-%d" %}
  {% assign sortable_event = sortable_date | append: "|" | append: event_data %}
  {% assign sortable_events = sortable_events | push: sortable_event %}
{% endfor %}

{% comment %} Sort by date (newest first) {% endcomment %}
{% assign sorted_sortable_events = sortable_events | sort | reverse %}

{% comment %} Extract original event data {% endcomment %}
{% assign sorted_events = "" | split: "" %}
{% for sortable_event in sorted_sortable_events %}
  {% assign parts = sortable_event | split: "|" %}
  {% assign original_event = parts[1] | append: "|" | append: parts[2] | append: "|" | append: parts[3] | append: "|" | append: parts[4] %}
  {% assign sorted_events = sorted_events | push: original_event %}
{% endfor %}

{% assign current_year_month = "" %}
{% assign current_started_projects = "" | split: "" %}
{% assign current_ended_projects = "" | split: "" %}
{% assign current_created_projects = "" | split: "" %}
{% assign current_manual_entries = "" | split: "" %}

{% for event_data in sorted_events %}
{% assign parts = event_data | split: "|" %}
{% assign title = parts[0] %}
{% assign type = parts[1] %}
{% assign date = parts[2] %}
{% assign url = parts[3] %}

{% assign year = date | date: "%Y" %}
{% assign month = date | date: "%m" %}
{% assign month_name = date | date: "%B" %}
{% assign year_month = year | append: "-" | append: month %}

{% if year_month != current_year_month %}
{% comment %} Display previous month's data {% endcomment %}
{% if current_year_month != "" %}
{% if current_started_projects.size > 0 or current_ended_projects.size > 0 or current_created_projects.size > 0 or current_manual_entries.size > 0 %}

---

## {{ month_name }} {{ year }}
{% if current_manual_entries.size > 0 %}
{% for entry in current_manual_entries %}
> {{ entry }}
{% endfor %}
{% endif %}
{% if current_created_projects.size > 0 %}
### Created
{% for project in current_created_projects %}
{% assign project_parts = project | split: "|" %}
{% assign project_title = project_parts[0] %}
{% assign project_url = project_parts[1] %}
{% assign project_location = project_parts[2] %}
{% assign project_result = project_parts[3] %}
- **{{ project_title }}**{% if project_location %} ({{ project_location }}){% endif %}{% if project_result %}
({{ project_result }}){% endif %} ([GO ➟]({{ project_url }}))
{% endfor %}
{% endif %}

{% if current_started_projects.size > 0 %}
### Started
{% for project in current_started_projects %}
{% assign project_parts = project | split: "|" %}
{% assign project_title = project_parts[0] %}
{% assign project_url = project_parts[1] %}
{% assign project_location = project_parts[2] %}
- **{{ project_title }}**{% if project_location %} ({{ project_location }}){% endif %}
{% endfor %}
{% endif %}

{% if current_ended_projects.size > 0 %}
### Ended
{% for project in current_ended_projects %}
{% assign project_parts = project | split: "|" %}
{% assign project_title = project_parts[0] %}
{% assign project_url = project_parts[1] %}
{% assign project_result = project_parts[2] %}
- **{{ project_title }}**{% if project_result %} ({{ project_result }}){% endif %} ([GO ➟]({{ project_url }}))
{% endfor %}
{% endif %}
{% endif %}
{% endif %}

{% comment %} Reset for new month {% endcomment %}
{% assign current_year_month = year_month %}
{% assign current_started_projects = "" | split: "" %}
{% assign current_ended_projects = "" | split: "" %}
{% assign current_created_projects = "" | split: "" %}
{% assign current_manual_entries = "" | split: "" %}
{% endif %}

{% if type == "manual" %}
{% comment %} Add manual changelog entry {% endcomment %}
{% assign current_manual_entries = current_manual_entries | push: title %}
{% elsif type == "started" %}
{% comment %} Check if this project also ended in the same month {% endcomment %}
{% assign chantier = site.chantiers | where: "title", title | first %}
{% assign project_ended_same_month = false %}
{% if chantier.ended and chantier.ended != "" and chantier.ended != nil %}
{% assign ended_year = chantier.ended | date: "%Y" %}
{% assign ended_month = chantier.ended | date: "%m" %}
{% if ended_year == year and ended_month == month %}
{% assign project_ended_same_month = true %}
{% endif %}
{% endif %}

{% if project_ended_same_month %}
{% comment %} Project started and ended in same month - add to created {% endcomment %}
{% assign location_tags = "" %}
{% if chantier.location and chantier.location.size > 0 %}
{% assign location_tags = chantier.location | join: ", " %}
{% endif %}
{% assign result_tags = "" %}
{% if chantier.result and chantier.result.size > 0 %}
{% assign result_tags = chantier.result | join: ", " %}
{% endif %}
{% assign project_data = title | append: "|" | append: url | append: "|" | append: location_tags | append: "|" | append: result_tags %}
{% assign current_created_projects = current_created_projects | push: project_data %}
{% else %}
{% comment %} Project only started - add to started {% endcomment %}
{% assign location_tags = "" %}
{% if chantier.location and chantier.location.size > 0 %}
{% assign location_tags = chantier.location | join: ", " %}
{% endif %}
{% assign project_data = title | append: "|" | append: url | append: "|" | append: location_tags %}
{% assign current_started_projects = current_started_projects | push: project_data %}
{% endif %}
{% elsif type == "ended" %}
{% comment %} Check if this project also started in the same month {% endcomment %}
{% assign chantier = site.chantiers | where: "title", title | first %}
{% assign project_started_same_month = false %}
{% if chantier.started and chantier.started != "" and chantier.started != nil %}
{% assign started_year = chantier.started | date: "%Y" %}
{% assign started_month = chantier.started | date: "%m" %}
{% if started_year == year and started_month == month %}
{% assign project_started_same_month = true %}
{% endif %}
{% endif %}

{% unless project_started_same_month %}
{% comment %} Project only ended (not started in same month) - add to ended {% endcomment %}
{% assign result_tags = "" %}
{% if chantier.result and chantier.result.size > 0 %}
{% assign result_tags = chantier.result | join: ", " %}
{% endif %}
{% assign project_data = title | append: "|" | append: url | append: "|" | append: result_tags %}
{% assign current_ended_projects = current_ended_projects | push: project_data %}
{% endunless %}
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