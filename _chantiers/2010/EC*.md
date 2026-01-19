---
layout: chantier-blank
title: EC*
result: [dataset]
spicy: true
tech: [eMule, iTunes, Apple&nbsp;Music, Music&nbsp;Kit.js]
started: 2010-09-01 20:00
description:
    EC* is a dataset of more than 3500 electronic music tracks organized in 150 playlists.
css:
  - /assets/2026/EC*/EC*.css
js:
  - /assets/2026/EC*/EC*.js
---

{% include fonteawesome.html %}

{% if site.data.playlists %}
{% assign ec_playlists = site.data.playlists | where_exp: "item", "item.name contains 'EC'" %}
{% assign total_tracks = 0 %}
{% assign total_playlists = 0 %}
{% assign total_duration_ms = 0 %}

{% for playlist in ec_playlists %}
  {% assign playlist_prefix = playlist.name | slice: 0, 2 %}
  {% if playlist_prefix == "EC" %}
    {% assign total_playlists = total_playlists | plus: 1 %}
    {% assign total_tracks = total_tracks | plus: playlist.trackCount %}
    {% for track in playlist.tracks %}
      {% if track.duration %}
        {% assign total_duration_ms = total_duration_ms | plus: track.duration %}
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}

{% assign total_duration_days = total_duration_ms | divided_by: 86400000.0 | round: 2 %}

<!-- Artwork Lightbox -->
<div id="artwork-lightbox" class="artwork-lightbox">
  <div class="artwork-lightbox-overlay"></div>
  <img id="artwork-lightbox-img" class="artwork-lightbox-img" src="" alt="">
</div>

<div id="ec-viewer" class="ec-viewer">
  <!-- Controls Bar -->
  <div class="ec-controls">
    <!-- Left side: Filter, VU Meters, and Controls -->
    <div class="ec-controls-left">
      <div class="ec-filter-mode">
        <label class="ec-radio-label">
          <input type="radio" name="filter-mode" value="and" checked>
          <span>&</span>
        </label>
        <label class="ec-radio-label">
          <input type="radio" name="filter-mode" value="or">
          <span>|</span>
        </label>
      </div>
      <div class="ec-filters-wrapper">
        <div class="ec-filter-container">
          <input type="search" id="filter-playlists" name="filter-playlists" placeholder="Filter 1" autocomplete="off">
        </div>
        <div class="ec-filter-container">
          <input type="search" id="filter-tracks" name="filter-tracks" placeholder="Filter 2" autocomplete="off">
        </div>
      </div>
      <div class="ec-vu-meters">
        <div class="ec-vu-meter">
          <div class="ec-vu-meter-bar" id="vu-meter-left"></div>
        </div>
        <div class="ec-vu-meter">
          <div class="ec-vu-meter-bar" id="vu-meter-right"></div>
        </div>
      </div>
      <div class="ec-vu-controls">
        <button id="player-next" class="ec-player-btn" title="Next track (random)"><i class="fas fa-forward"></i></button>
        <button id="player-mute" class="ec-player-btn" title="Mute"><i class="fas fa-volume-up"></i></button>
      </div>
    </div>
    <!-- Center: Now Playing -->
    <div class="ec-player">
      <div id="player-artwork" class="ec-player-artwork"></div>
      <div class="ec-player-track-info">
        <div class="ec-live-badge">LIVE</div>
        <div id="player-title" class="ec-player-title">—</div>
        <div id="player-artist" class="ec-player-artist">—</div>
      </div>
      <button id="player-goto" class="ec-player-goto-btn" title="Show in table">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
    <!-- Stats -->
    <div class="ec-stats">
      <span id="stats-display">{{ total_tracks }} tracks <br>{{ total_duration_days }} days<br></span>
    </div>
  </div>
  
  <div class="ec-columns">
    <!-- Column 1: Playlists -->
    <div class="ec-column ec-playlists-column">
      <div class="ec-column-header">
        <span>Playlists</span>
        <span id="playlist-counter">0</span>
      </div>
      <div class="ec-column-content" id="playlists-list">
        <table class="ec-table">
          <tbody>
            {% for playlist in site.data.playlists %}
            {% assign playlist_prefix = playlist.name | slice: 0, 2 %}
            {% if playlist_prefix == "EC" %}
            <tr class="ec-playlist-row" 
                data-playlist-id="{{ playlist.id }}" 
                data-playlist-name="{{ playlist.name | downcase }}"
                data-track-count="{{ playlist.trackCount }}">
              <td class="ec-thumb-cell">
                {% if playlist.artwork.small %}
                <img src="{{ playlist.artwork.small }}" alt="{{ playlist.name }}" class="ec-playlist-thumb" loading="lazy">
                {% else %}
                <div class="ec-playlist-thumb ec-no-artwork"></div>
                {% endif %}
              </td>
              <td class="ec-info-cell">
                <div class="ec-playlist-name">{{ playlist.name }}</div>
                <div class="ec-playlist-meta">{% if playlist.description %}{{ playlist.description }} {% endif %}({{ playlist.trackCount }} tracks)</div>
              </td>
            </tr>
            {% endif %}
            {% endfor %}
          </tbody>
        </table>
      </div>
    </div>
    <!-- Column 2: Tracks -->
    <div class="ec-column ec-tracks-column">
      <div class="ec-column-header">
        <span>Tracks</span>
        <span id="track-counter">0</span>
      </div>
      <div class="ec-column-content" id="tracks-list">
        <div class="ec-empty-state">Nothing to show.</div>
      </div>
    </div>
    <!-- Column 3: Track Metadata -->
    <div class="ec-column ec-metadata-column">
      <div class="ec-column-header">
        <span>Metadata</span>
      </div>
      <div class="ec-column-content" id="track-metadata">
        <div class="ec-empty-state">Nothing to show.</div>
      </div>
    </div>
    <!-- Column 4: Structure -->
    <div class="ec-column ec-structure-column">
      <div class="ec-column-header">
        <span>Playlists</span>
      </div>
      <div class="ec-column-content" id="structure-list">
        <div class="ec-empty-state">Nothing to show.</div>
      </div>
    </div>
  </div>
</div>

<!-- Embed playlist data for JavaScript -->
<script>
  window.ecPlaylistData = {{ ec_playlists | jsonify }}.filter(p => p.name.startsWith('EC'));
</script>

{% else %}
<p>Something went wrong when generating this page!</p>
{% endif %}

