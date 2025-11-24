---
hidden: true
layout: chantier
title: CHANGELOG
started:  2025-08-23 11:45:16
ended: 
result: [list]
---

{% comment %} Calculate statistics {% endcomment %}
{% assign total_chantiers = site.chantiers.size %}
{% assign open_chantiers = 0 %}
{% assign open_chantiers_visible = 0 %}
{% assign open_chantiers_hidden = 0 %}
{% assign closed_chantiers = 0 %}
{% assign closed_chantiers_visible = 0 %}
{% assign closed_chantiers_hidden = 0 %}
{% assign total_duration_days = 0 %}
{% assign longest_running_days = 0 %}
{% assign longest_running_project = "" %}
{% assign years = "" | split: "" %}
{% assign current_year = "now" | date: "%Y" %}
{% assign current_year_projects = 0 %}

{% comment %} Process all chantiers {% endcomment %}
{% for chantier in site.chantiers %}
  {% assign ended_value = chantier.ended %}
  {% assign created_value = chantier.started %}

  {% if ended_value and ended_value != "" and ended_value != nil %}
    {% if created_value and created_value != "" and created_value != nil %}
      {% assign closed_chantiers = closed_chantiers | plus: 1 %}
      {% if chantier.hidden %}
        {% assign closed_chantiers_hidden = closed_chantiers_hidden | plus: 1 %}
      {% else %}
        {% assign closed_chantiers_visible = closed_chantiers_visible | plus: 1 %}
      {% endif %}
      {% assign created_sec = chantier.started | date: '%s' %}
      {% assign ended_sec = chantier.ended | date: '%s' %}
      {% assign duration_sec = ended_sec | minus: created_sec %}
      {% assign duration_days = duration_sec | divided_by: 86400 | plus: 1 %}
      {% assign total_duration_days = total_duration_days | plus: duration_days %}
    {% endif %}
  {% else %}
    {% assign open_chantiers = open_chantiers | plus: 1 %}
    {% if chantier.hidden %}
      {% assign open_chantiers_hidden = open_chantiers_hidden | plus: 1 %}
    {% else %}
      {% assign open_chantiers_visible = open_chantiers_visible | plus: 1 %}
    {% endif %}
    {% if created_value and created_value != "" and created_value != nil %}
      {% assign created_sec = chantier.started | date: '%s' %}
      {% assign now_sec = "now" | date: '%s' %}
      {% assign running_duration_sec = now_sec | minus: created_sec %}
      {% assign running_duration_days = running_duration_sec | divided_by: 86400 %}
      {% if running_duration_days > longest_running_days %}
        {% assign longest_running_days = running_duration_days %}
        {% assign longest_running_project = chantier.title %}
      {% endif %}
    {% endif %}
  {% endif %}

  {% if created_value and created_value != "" and created_value != nil %}
    {% assign year = chantier.started | date: "%Y" %}
    {% unless years contains year %}
      {% assign years = years | push: year %}
    {% endunless %}
    {% if year == current_year %}
      {% assign current_year_projects = current_year_projects | plus: 1 %}
    {% endif %}
  {% endif %}
{% endfor %}

{% assign sorted_years = years | sort %}

{% comment %} Calculate averages and rates {% endcomment %}
{% if closed_chantiers > 0 %}
  {% assign avg_duration_days = total_duration_days | divided_by: closed_chantiers %}
{% else %}
  {% assign avg_duration_days = 0 %}
{% endif %}
{% if total_chantiers > 0 %}
  {% assign completion_rate = closed_chantiers | times: 100.0 | divided_by: total_chantiers %}
{% else %}
  {% assign completion_rate = 0 %}
{% endif %}

```txt
=====================================
{% include site-now.html %}
=====================================

Ongoing projects   {% assign open_bars = open_chantiers | times: 50 | divided_by: total_chantiers %}{% for i in (1..open_bars) %}█{% endfor %}{% for i in (open_bars..49) %}░{% endfor %} {{ open_chantiers_visible }}
Finished projects  {% assign closed_bars = closed_chantiers | times: 50 | divided_by: total_chantiers %}{% for i in (1..closed_bars) %}█{% endfor %}{% for i in (closed_bars..49) %}░{% endfor %} {{ closed_chantiers_visible }}
Total Projects                                                        {{ open_chantiers_visible | plus: closed_chantiers_visible }}

Projects completion:         {{ completion_rate | round: 1 }}%
Average project duration:    {{ avg_duration_days | round: 0 }} days
{% if open_chantiers > 0 -%}
Longest running project:     {{ longest_running_days | round: 0 }} days ({{ longest_running_project }})
{% else -%}
Longest running project: N/A (no open projects)
{%- endif -%}
Average projects per year:   {{ total_chantiers | divided_by: sorted_years.size | round: 1 }}
Projects started this year:  {{ current_year_projects }}
```

{% comment %} Generate timeline {% endcomment %}
{% assign timeline_events = "" | split: "" %}

{% comment %} Collect project events {% endcomment %}
{% for chantier in site.chantiers %}
  {% if chantier.started and chantier.started != "" and chantier.started != nil %}
    {% comment %} Check if project was created (started and ended in same month) {% endcomment %}
    {% if chantier.ended and chantier.ended != "" and chantier.ended != nil %}
      {% assign started_month = chantier.started | date: "%Y%m" %}
      {% assign ended_month = chantier.ended | date: "%Y%m" %}
      {% if started_month == ended_month %}
        {% assign event = chantier.started | append: "|created|" | append: forloop.index0 %}
        {% assign timeline_events = timeline_events | push: event %}
      {% else %}
        {% assign event = chantier.started | append: "|started|" | append: forloop.index0 %}
        {% assign timeline_events = timeline_events | push: event %}
        {% assign event = chantier.ended | append: "|ended|" | append: forloop.index0 %}
        {% assign timeline_events = timeline_events | push: event %}
      {% endif %}
    {% else %}
      {% assign event = chantier.started | append: "|started|" | append: forloop.index0 %}
      {% assign timeline_events = timeline_events | push: event %}
    {% endif %}
  {% endif %}
{% endfor %}


{% comment %} Collect notes from changelog.yaml {% endcomment %}
{% for note in site.data.changelog %}
  {% if note.date and note.description %}
    {% assign event = note.date | append: "|note|" | append: note.description %}
    {% assign timeline_events = timeline_events | push: event %}
  {% endif %}
{% endfor %}

{% comment %} Sort timeline events by date (newest first) {% endcomment %}
{% assign sorted_timeline = timeline_events | sort | reverse %}

{% comment %} Get unique months from sorted timeline {% endcomment %}
{% assign months = "" | split: "" %}
{% for event in sorted_timeline %}
    {% assign date_str = event | split: "|" | first %}
    {% assign year_month = date_str | date: "%Y.%m" %}
    {% unless months contains year_month %}
        {% assign months = months | push: year_month %}
    {% endunless %}
{% endfor %}

{% comment %} Iterate through months and output events {% endcomment %}
{% for month in months %}

---

## v{{ month }}

  {% comment %} Output notes for this month first {% endcomment %}
  {% for event in sorted_timeline %}
    {% assign parts = event | split: "|" %}
    {% assign event_date = parts[0] %}
    {% assign event_month = event_date | date: "%Y.%m" %}
    {% if event_month == month %}
      {% assign type = parts[1] %}
      {% if type == "note" %}
        {% assign note_desc = parts[2] %}
> {{ note_desc }}
      {% endif %}
    {% endif %}
  {% endfor %}

  {% comment %} Output project events for this month {% endcomment %}
  {% for event in sorted_timeline %}
    {% assign parts = event | split: "|" %}
    {% assign event_date = parts[0] %}
    {% assign event_month = event_date | date: "%Y.%m" %}
    {% if event_month == month %}
      {% assign type = parts[1] %}
      {% assign content = parts[2] %}
      {% if type == "created" %}
        {% assign chantier_index = content | plus: 0 %}
        {% assign chantier = site.chantiers[chantier_index] %}
- **{{ chantier.title }}** created, ([see ➟]({{ chantier.url }}))
      {% elsif type == "started" %}
        {% assign chantier_index = content | plus: 0 %}
        {% assign chantier = site.chantiers[chantier_index] %}
- **{{ chantier.title }}** started
      {% elsif type == "ended" %}
        {% assign chantier_index = content | plus: 0 %}
        {% assign chantier = site.chantiers[chantier_index] %}
- **{{ chantier.title }}** ended, ([see ➟]({{ chantier.url }}))
      {% endif %}
    {% endif %}
  {% endfor %}
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

h2 + h3 {
  margin-top: 8px;
}

/* Compact list styling */
ul {
  margin: 0 0 0 0;
  padding-left: 20px;
}

li {
  margin-bottom: 2px;
  line-height: 1.4;
  color: #24292e;
}

h3 + ul {
  margin-top: 4px;
}

blockquote {
  margin: 0 0 1em 0;
  padding-left: 1em;
  border-left: 2px solid #ccc;
}

blockquote p {
  margin: 0 0 0 0;
}

pre {
  overflow-x: auto;
}
</style>