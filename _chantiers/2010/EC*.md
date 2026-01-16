---
layout: chantier
title: EC*
result: [proof-of-concept]
spicy: true
tech: [eMule, iTunes, Apple&nbsp;Music, Music&nbsp;Kit.js]
started: 2010-09-01 20:00
description:
    EC* is a system of 300 playlists made to store and retrieve dance music. It is fuzzy.
---

<p>
  <a href="https://music.apple.com/profile/flrntdfr" target="_blank">View Profile on Apple&nbsp;Music &rarr;</a>
</p>

{% if site.data.playlists %}
<div class="playlist-grid">
  {% for playlist in site.data.playlists %}
    <a href="{{ playlist.url }}" target="_blank" class="playlist-card">
      {% if playlist.artwork %}
        <img src="{{ playlist.artwork }}" alt="{{ playlist.name }}" loading="lazy">
      {% else %}
        <div class="no-artwork"></div>
      {% endif %}
      <h3>{{ playlist.name }}</h3>
    </a>
  {% endfor %}
</div>
{% else %}
<p>No playlists found (yet).</p>
{% endif %}

<style>
.playlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.playlist-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}

.playlist-card:hover {
  transform: translateY(-4px);
  text-decoration: none;
}

.playlist-card img, .no-artwork {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background: #f0f0f0;
}

.playlist-card h3 {
  margin: 12px 0 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
  color: #333;
  
  /* Truncate to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Dark mode support if applicable */
@media (prefers-color-scheme: dark) {
  .playlist-card h3 {
    color: #eee;
  }
  .playlist-card img, .no-artwork {
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    background: #333;
  }
}
</style>
