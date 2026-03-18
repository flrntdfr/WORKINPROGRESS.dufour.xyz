---
hidden: true
layout: chantier-blank
title: Admin panel
permalink: /admin
result: [web]
started: 2025-09-15 16:47
ended: 2025-09-15 16:47
description: |
  This view give an overview of all projects.
---

<div class="chantiers-container">  
  <div class="controls-panel">
    <div class="control-group">
      <label for="search-input">Search</label>
      <input type="text" id="search-input" placeholder="Search title, description, tech...">
    </div>
    <div class="control-group">
      <label for="result-filter">Result</label>
      <select id="result-filter">
        <option value="">All Results</option>
      </select>
    </div>
    <div class="control-group">
      <label for="tech-filter">Technology</label>
      <select id="tech-filter">
        <option value="">All Tech</option>
      </select>
    </div>
    <div class="control-group">
      <label for="status-filter">Status</label>
      <select id="status-filter">
        <option value="">All</option>
        <option value="finished">finished</option>
        <option value="ongoing">Ongoing</option>
      </select>
    </div>
    <div class="control-group">
      <label for="year-filter">Year</label>
      <select id="year-filter">
        <option value="">All Years</option>
      </select>
    </div>
    <div class="control-group">
      <label for="highlighted-filter">Highlighted</label>
      <select id="highlighted-filter">
        <option value="">All</option>
        <option value="true">Highlighted Only</option>
        <option value="false">Regular Only</option>
      </select>
    </div>
    <div class="control-group">
      <label>&nbsp;</label>
      <button id="clear-filters" type="button">Clear All Filters</button>
    </div>
  </div>

  <table class="chantiers-table" id="chantiers-table">
    <thead>
      <tr>
        <th class="sortable" data-sort="title">Title</th>
        <th class="sortable" data-sort="started">Started</th>
        <th class="sortable" data-sort="ended">Ended</th>
        <th data-sort="result">Results</th>
        <th data-sort="tech">Tech</th>
        <th data-sort="location">Location</th>
        <th data-sort="status">Status</th>
      </tr>
    </thead>
    <tbody id="chantiers-tbody">
      <!-- Data will be populated by JavaScript -->
    </tbody>
  </table>
  
  <div id="empty-state" class="empty-state" style="display: none;">
    <p>No chantiers match your current filters.</p>
  </div>
  <div class="site-now">
  {% include site-now.html %}
  </div>
</div>

<script>
/* Chantiers data - populated from Jekyll */
const chantiers = [
  {% for chantier in site.chantiers %}
    {% unless chantier.hidden %}
    {
      title: {{ chantier.title | jsonify }},
      url: "{{ chantier.url }}",
      started: {{ chantier.started | jsonify }},
      ended: {{ chantier.ended | jsonify }},
      result: {{ chantier.result | jsonify }},
      tech: {{ chantier.tech | jsonify }},
      location: {{ chantier.location | jsonify }},
      spicy: {{ chantier.spicy | jsonify }},
      description: {{ chantier.description | strip_html | jsonify }},
      layout: {{ chantier.layout | jsonify }}
    },
    {% endunless %}
  {% endfor %}
];

/* State management */
let currentSort = { column: null, direction: 'asc' };
let filteredData = [...chantiers];

/* Helper functions */
function parseDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-CA', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
}

function getStatus(chantier) {
  return chantier.ended ? 'finished' : 'ongoing';
}

function getYear(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).getFullYear();
}

/* Populate filter options */
function populateFilters() {
  const resultTypes = new Set();
  const techTypes = new Set();
  const years = new Set();
  
  chantiers.forEach(chantier => {
    if (chantier.result && Array.isArray(chantier.result)) {
      chantier.result.forEach(result => resultTypes.add(result));
    }
    
    if (chantier.tech) {
      const techArray = Array.isArray(chantier.tech) ? chantier.tech : [chantier.tech];
      techArray.forEach(tech => techTypes.add(tech));
    }
    
    if (chantier.started) {
      years.add(getYear(chantier.started));
    }
    if (chantier.ended) {
      years.add(getYear(chantier.ended));
    }
  });
  
  /* Populate result filter */
  const resultFilter = document.getElementById('result-filter');
  Array.from(resultTypes).sort().forEach(result => {
    const option = document.createElement('option');
    option.value = result;
    option.textContent = result;
    resultFilter.appendChild(option);
  });
  
  /* Populate tech filter */
  const techFilter = document.getElementById('tech-filter');
  Array.from(techTypes).sort().forEach(tech => {
    const option = document.createElement('option');
    option.value = tech;
    option.textContent = tech;
    techFilter.appendChild(option);
  });
  
  /* Populate year filter */
  const yearFilter = document.getElementById('year-filter');
  Array.from(years).sort((a, b) => b - a).forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
}

/* Rendering functions */
function renderResultTags(results) {
  if (!results || !Array.isArray(results)) return '';
  return results.map(result => 
    `<span class="result-tag clickable-tag" data-result="${result}">${result}</span>`
  ).join('');
}

function renderTechTags(tech) {
  if (!tech) return '';
  const techArray = Array.isArray(tech) ? tech : [tech];
  return techArray.map(t => 
    `<span class="tech-tag clickable-tag" data-tech="${t}">${t}</span>`
  ).join('');
}

function renderLocation(location) {
  if (!location || !Array.isArray(location)) return '';
  return location.join(', ');
}

function renderTable() {
  const tbody = document.getElementById('chantiers-tbody');
  const emptyState = document.getElementById('empty-state');
  
  if (filteredData.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  tbody.innerHTML = filteredData.map(chantier => `
    <tr>
      <td>
        <a href="${chantier.url}">${chantier.title}</a>
        ${chantier.spicy ? '<span class="highlighted-indicator">{% include emojis/spicy.html %}</span>' : ''}
      </td>
      <td>${formatDate(chantier.started)}</td>
      <td>${formatDate(chantier.ended)}</td>
      <td><div class="result-tags">${renderResultTags(chantier.result)}</div></td>
      <td><div class="tech-tags">${renderTechTags(chantier.tech)}</div></td>
      <td>${renderLocation(chantier.location)}</td>
      <td>
        <span class="status-badge clickable-tag ${getStatus(chantier) === 'finished' ? 'status-finished' : 'status-ongoing'}" data-status="${getStatus(chantier)}">
          ${getStatus(chantier)}
        </span>
      </td>
    </tr>
  `).join('');
}

/* Sorting functions */
function sortData(column, direction) {
  filteredData.sort((a, b) => {
    let aVal, bVal;
    
    switch (column) {
      case 'title':
        aVal = String(a.title || '').toLowerCase();
        bVal = String(b.title || '').toLowerCase();
        break;
      case 'started':
      case 'ended':
        aVal = parseDate(a[column]);
        bVal = parseDate(b[column]);
        /* Handle null dates - put them at the end */
        if (!aVal && !bVal) return 0;
        if (!aVal) return direction === 'asc' ? 1 : -1;
        if (!bVal) return direction === 'asc' ? -1 : 1;
        break;
      case 'result':
        aVal = (a.result && a.result[0]) || '';
        bVal = (b.result && b.result[0]) || '';
        break;
      case 'tech':
        aVal = Array.isArray(a.tech) ? a.tech[0] || '' : a.tech || '';
        bVal = Array.isArray(b.tech) ? b.tech[0] || '' : b.tech || '';
        break;
      case 'location':
        aVal = (a.location && a.location[0]) || '';
        bVal = (b.location && b.location[0]) || '';
        break;
      case 'status':
        aVal = getStatus(a);
        bVal = getStatus(b);
        break;
      default:
        return 0;
    }
    
    /* Handle string comparison properly for titles */
    if (column === 'title') {
      const comparison = aVal.localeCompare(bVal, undefined, { 
        numeric: true, 
        sensitivity: 'base' 
      });
      return direction === 'asc' ? comparison : -comparison;
    }
    
    /* Default comparison for other columns */
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

/* Filtering functions */
function applyFilters() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const resultFilter = document.getElementById('result-filter').value;
  const techFilter = document.getElementById('tech-filter').value;
  const statusFilter = document.getElementById('status-filter').value;
  const yearFilter = document.getElementById('year-filter').value;
  const highlightedFilter = document.getElementById('highlighted-filter').value;
  
  filteredData = chantiers.filter(chantier => {
    /* Search filter */
    if (searchTerm) {
      const searchText = [
        chantier.title,
        chantier.description,
        Array.isArray(chantier.tech) ? chantier.tech.join(' ') : chantier.tech,
        Array.isArray(chantier.result) ? chantier.result.join(' ') : '',
        Array.isArray(chantier.location) ? chantier.location.join(' ') : ''
      ].join(' ').toLowerCase();
      
      if (!searchText.includes(searchTerm)) return false;
    }
    
    /* Result filter */
    if (resultFilter && (!chantier.result || !chantier.result.includes(resultFilter))) {
      return false;
    }
    
    /* Tech filter */
    if (techFilter) {
      const techArray = Array.isArray(chantier.tech) ? chantier.tech : [chantier.tech];
      if (!techArray || !techArray.includes(techFilter)) {
        return false;
      }
    }
    
    /* Status filter */
    if (statusFilter && getStatus(chantier) !== statusFilter) {
      return false;
    }
    
    /* Year filter */
    if (yearFilter) {
      const year = parseInt(yearFilter);
      const startYear = chantier.started ? getYear(chantier.started) : null;
      const endYear = chantier.ended ? getYear(chantier.ended) : null;
      
      if (startYear !== year && endYear !== year) {
        return false;
      }
    }
    
    /* Highlighted filter */
    if (highlightedFilter !== '') {
      const isHighlighted = chantier.spicy === true;
      if ((highlightedFilter === 'true') !== isHighlighted) {
        return false;
      }
    }
    
    return true;
  });
  
  /* Reapply current sort */
  if (currentSort.column) {
    sortData(currentSort.column, currentSort.direction);
  }
  
  renderTable();
  updateTagHighlights();
}

/* Update tag highlights based on current filters */
function updateTagHighlights() {
  const resultFilter = document.getElementById('result-filter').value;
  const techFilter = document.getElementById('tech-filter').value;
  const statusFilter = document.getElementById('status-filter').value;
  
  /* Remove all highlights first */
  document.querySelectorAll('.result-tag, .tech-tag, .status-badge').forEach(tag => {
    tag.classList.remove('active');
  });
  
  /* Add highlights for the current filters */
  if (resultFilter) {
    document.querySelectorAll(`[data-result="${resultFilter}"]`).forEach(tag => {
      tag.classList.add('active');
    });
  }
  
  if (techFilter) {
    document.querySelectorAll(`[data-tech="${techFilter}"]`).forEach(tag => {
      tag.classList.add('active');
    });
  }
  
  if (statusFilter) {
    document.querySelectorAll(`[data-status="${statusFilter}"]`).forEach(tag => {
      tag.classList.add('active');
    });
  }
}

/* Generic function to handle tag clicking */
function handleTagClick(tagValue, tagType) {
  const filterId = `${tagType}-filter`;
  const filterElement = document.getElementById(filterId);
  const dataAttribute = `data-${tagType}`;
  
  /* Toggle filter: if already selected, clear it; otherwise set it */
  if (filterElement.value === tagValue) {
    filterElement.value = '';
  } else {
    filterElement.value = tagValue;
  }
  
  applyFilters();
}

/* Clear all filters function */
function clearAllFilters() {
  /* Reset all filter controls */
  document.getElementById('search-input').value = '';
  document.getElementById('result-filter').value = '';
  document.getElementById('tech-filter').value = '';
  document.getElementById('status-filter').value = '';
  document.getElementById('year-filter').value = '';
  document.getElementById('highlighted-filter').value = '';
  
  /* Reapply filters to show all data */
  applyFilters();
}

/* Lock table layout after initial render to preserve column widths */
function lockTableLayout() {
  const table = document.getElementById('chantiers-table');
  /* Table layout is already fixed via CSS, just add the class for consistency */
  table.classList.add('layout-locked');
}

/* Event listeners */
document.addEventListener('DOMContentLoaded', function() {
  populateFilters();
  
  /* Sort by started date descending by default */
  currentSort = { column: 'started', direction: 'desc' };
  sortData('started', 'desc');
  renderTable();
  
  /* Lock table layout after initial render to preserve column widths */
  setTimeout(() => {
    lockTableLayout();
  }, 100);
  
  /* Update sort indicators */
  const startedHeader = document.querySelector('[data-sort="started"]');
  startedHeader.classList.add('desc');
  
  /* Header click handlers for sorting */
  document.querySelectorAll('.chantiers-table th[data-sort]').forEach(header => {
    header.addEventListener('click', () => {
      const column = header.dataset.sort;
      
      /* Toggle direction if same column, otherwise start with asc */
      if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.direction = 'asc';
      }
      currentSort.column = column;
      
      /* Update header classes */
      document.querySelectorAll('.chantiers-table th').forEach(h => {
        h.classList.remove('asc', 'desc');
      });
      header.classList.add(currentSort.direction);
      
      sortData(column, currentSort.direction);
      renderTable();
    });
  });
  
  /* Filter change handlers */
  document.getElementById('search-input').addEventListener('input', applyFilters);
  document.getElementById('result-filter').addEventListener('change', applyFilters);
  document.getElementById('tech-filter').addEventListener('change', applyFilters);
  document.getElementById('status-filter').addEventListener('change', applyFilters);
  document.getElementById('year-filter').addEventListener('change', applyFilters);
  document.getElementById('highlighted-filter').addEventListener('change', applyFilters);
  
  /* Clear filters button handler */
  document.getElementById('clear-filters').addEventListener('click', clearAllFilters);
  
  /* Tag click handlers - generalized for result, tech, and status tags */
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('clickable-tag')) {
      /* Check if it's a result tag */
      if (event.target.dataset.result) {
        handleTagClick(event.target.dataset.result, 'result');
      }
      /* Check if it's a tech tag */
      else if (event.target.dataset.tech) {
        handleTagClick(event.target.dataset.tech, 'tech');
      }
      /* Check if it's a status tag */
      else if (event.target.dataset.status) {
        handleTagClick(event.target.dataset.status, 'status');
      }
    }
  });
});
</script>

<style>

.controls-panel {
  margin-bottom: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding: 0.5em 0;
  border-bottom: 1px solid #ccc;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.control-group label {
  font-size: 0.85em;
  color: #666;
}

 .control-group input,
 .control-group select {
   padding: 0.25em 0.5em;
   border: 1px solid #ccc;
   font-family: inherit;
   font-size: 0.9em;
   background: white;
 }
 
 .control-group select {
   background: white;
   border-radius: 2px;
   cursor: pointer;
   appearance: none;
   background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
   background-repeat: no-repeat;
   background-position: right 0.5em center;
   background-size: 1em;
   padding-right: 2em;
 }
 
 .control-group input:focus,
 .control-group select:focus {
   outline: none;
   border-color: #000;
   box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
 }
 
 .control-group select:hover {
   border-color: #999;
 }

 .control-group button {
   padding: 0.25em 0.75em;
   border: 1px solid #ccc;
   font-family: inherit;
   font-size: 0.9em;
   background: white;
   cursor: pointer;
   border-radius: 2px;
   transition: all 0.2s ease;
 }
 
 .control-group button:hover {
   border-color: #999;
   background: #f8f9fa;
 }
 
 .control-group button:focus {
   outline: none;
   border-color: #000;
   box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
 }
 
 .control-group button:active {
   transform: scale(0.95);
   background: #e9ecef;
 }
 
 .control-group button.clearing {
   animation: clearPulse 0.6s ease-out;
 }
 
 @keyframes clearPulse {
   0% {
     transform: scale(1);
     background: white;
   }
   25% {
     transform: scale(0.95);
     background: #d4edda;
     border-color: #2e7d32;
   }
   50% {
     transform: scale(1.05);
     background: #d4edda;
     border-color: #2e7d32;
   }
   100% {
     transform: scale(1);
     background: white;
     border-color: #ccc;
   }
 }

.chantiers-container {
  max-width: 100vw;
  overflow-x: auto;
  box-sizing: border-box;
  padding-left: 1em;
  padding-right: 1em;
}

.chantiers-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  table-layout: fixed;
  max-width: 100%;
}

.chantiers-table th,
.chantiers-table td {
  padding: 0.5em;
  text-align: left;
  border-bottom: 1px solid #eee;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 0;
}

/* Set specific column widths as percentages */
.chantiers-table th:nth-child(1), 
.chantiers-table td:nth-child(1) { width: 20%; } /* Title */
.chantiers-table th:nth-child(2), 
.chantiers-table td:nth-child(2) { width: 10%; } /* Started */
.chantiers-table th:nth-child(3), 
.chantiers-table td:nth-child(3) { width: 10%; } /* Ended */
.chantiers-table th:nth-child(4), 
.chantiers-table td:nth-child(4) { width: 12%; } /* Results */
.chantiers-table th:nth-child(5), 
.chantiers-table td:nth-child(5) { width: 15%; } /* Tech */
.chantiers-table th:nth-child(6), 
.chantiers-table td:nth-child(6) { width: 27%; } /* Location */
.chantiers-table th:nth-child(7), 
.chantiers-table td:nth-child(7) { width: 6%; }  /* Status */

/* Applied dynamically after content loads */
.chantiers-table.layout-locked {
  table-layout: fixed;
}

.chantiers-table.layout-locked th,
.chantiers-table.layout-locked td {
  overflow: hidden;
  word-wrap: break-word;
}

.chantiers-table th {
  font-weight: normal;
  cursor: pointer;
  user-select: none;
  background: #f9f9f9;
}

.chantiers-table th:hover {
  background: #f0f0f0;
}

.chantiers-table th.sortable::after {
  content: ' ↕';
  opacity: 0.3;
}

.chantiers-table th.asc::after {
  content: ' ↓';
  opacity: 0.7;
}

.chantiers-table th.desc::after {
  content: ' ↑';
  opacity: 0.7;
}

.chantiers-table tbody tr:hover {
  background: #fafafa;
}

.result-tags,
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
}

.result-tag {
  background: #e1f5fe;
  color: #0277bd;
  padding: 0.1em 0.4em;
  font-size: 0.8em;
  white-space: nowrap;
}

.clickable-tag {
  cursor: pointer;
  transition: all 0.2s ease;
}

.clickable-tag:hover {
  background: #b3e5fc;
}

.clickable-tag.active {
  background: #0277bd;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tech-tag {
  background: #f3e5f5;
  color: #7b1fa2;
  padding: 0.1em 0.4em;
  font-size: 0.8em;
  white-space: nowrap;
}

.tech-tag.clickable-tag:hover {
  background: #e1bee7;
}

.tech-tag.clickable-tag.active {
  background: #7b1fa2;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.highlighted-indicator {
  color: #ff8f00;
}

.status-badge {
  font-size: 0.8em;
  padding: 0.1em 0.3em;
}

.status-finished {
  background: #e8f5e8;
  color: #2e7d32;
}

.status-ongoing {
  background: #fff8e1;
  color: #f57c00;
}

.status-badge.clickable-tag {
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-badge.clickable-tag:hover {
  transform: scale(1.05);
}

.status-finished.clickable-tag:hover {
  background: #c8e6c9;
}

.status-ongoing.clickable-tag:hover {
  background: #ffecb3;
}

.status-finished.clickable-tag.active {
  background: #2e7d32;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.status-ongoing.clickable-tag.active {
  background: #f57c00;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.empty-state {
  text-align: center;
  padding: 2em;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .controls-panel {
    flex-direction: column;
    gap: 0.5em;
  }
  
  .chantiers-table {
    font-size: 0.85em;
  }
  
  .chantiers-table th,
  .chantiers-table td {
    padding: 0.4em 0.3em;
  }
}

.site-now {
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2em;
  color: #666;
  font-size: 0.85em;
}
</style>