---
layout: chantier
title: All projects
permalink: /all
started:  2025-06-27 17:46
ended: 2025-06-27 17:46
---

{% comment %} Collect all unique results from chantiers {% endcomment %}
{%- assign all_results = "" | split: "" -%}
{%- for chantier in site.chantiers -%}
  {%- if chantier.result and chantier.result.size > 0 -%}
    {%- for result_item in chantier.result -%}
      {%- unless all_results contains result_item -%}
        {%- assign all_results = all_results | push: result_item -%}
      {%- endunless -%}
    {%- endfor -%}
  {%- endif -%}
{%- endfor -%}

{% comment %} Manual alphabetical sorting of results {% endcomment %}
{%- assign sorted_results = all_results | sort_natural -%}

{% comment %} Display chantiers grouped by result {% endcomment %}
{%- for result_item in sorted_results -%}
  {%- assign chantiers_for_result = "" | split: "" -%}
  {%- for chantier in site.chantiers -%}
    {%- if chantier.result and chantier.result contains result_item -%}
      {%- assign chantiers_for_result = chantiers_for_result | push: chantier -%}
    {%- endif -%}
  {%- endfor -%}
  
  <details>
    <summary>{{ result_item }} <span style="color: darkgrey;">({{ chantiers_for_result.size }})</span></summary>
    <ul>
      {%- assign sorted_chantiers = chantiers_for_result | sort: 'title' -%}
      {%- for chantier in sorted_chantiers -%}
        <li>
          <a href="{{ chantier.url }}">{{ chantier.title }}</a>
          {%- if chantier.highlighted %} ✭{%- endif -%}
          {%- if chantier.ended %}
            <span style="color: darkgrey;">({{ chantier.ended | date: "%Y" }})</span>
          {%- else %}
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
          {%- if chantier.highlighted %} ✭{%- endif -%}
          {%- if chantier.ended %}
            <span style="color: darkgrey;">({{ chantier.ended | date: "%Y" }})</span>
          {%- else %}
            <span style="color: darkgrey;">({{ chantier.started | date: "%Y" }})</span>
          {%- endif -%}
        </li>
      {%- endfor -%}
    </ul>
  </details>
{%- endif -%}
<br>