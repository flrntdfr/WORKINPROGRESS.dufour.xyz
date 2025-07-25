---
layout: chantier
title: Progress...
started: 2025-06-16 04:50
ended: 2025-07-17 11:08
labels: [list, vibe]
tech: [Claude 4]
description: |
    This is a vibe coding experiment with animations evoque progress.
---

<div class="progress-showcase">
  <table class="progress-table">
    <thead>
      <tr>
        <th class="description-col">Description</th>
        <th class="preview-col">Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="description">
          <span class="title">BIOS Boot Sequence</span>
          <span class="subtitle">System initialization process</span>
        </td>
        <td class="preview">{% include progress/bios.html %}</td>
      </tr>
      <tr>
        <td class="description">
          <span class="title">Dynamic Link Library Loading</span>
          <span class="subtitle">DOS-style DLL enumeration</span>
        </td>
        <td class="preview">{% include progress/dll.html %}</td>
      </tr>
      <tr>
        <td class="description">
          <span class="title">Windows 95 Progress Bar</span>
          <span class="subtitle">Authentic retro interface element</span>
        </td>
        <td class="preview">{% include progress/win95.html %}</td>
      </tr>
      <tr>
        <td class="description">
          <span class="title">Aqua Loading Interface</span>
          <span class="subtitle">Dual-meaning progress indicator</span>
        </td>
        <td class="preview">{% include progress/aqua.html %}</td>
      </tr>
      <tr>
        <td class="description">
          <span class="title">Windows 8 Wait State</span>
          <span class="subtitle">Minimal system notification</span>
        </td>
        <td class="preview">{% include progress/win8.html %}</td>
      </tr>
      <tr>
        <td class="description">
          <span class="title">Time Machine Interface</span>
          <span class="subtitle">Reference implementation</span>
        </td>
        <td class="preview">{% include progress/time-machine.html id="main" %}</td>
      </tr>
      <tr>
        <td class="description">
          <span class="title">Futuristic Apple UI</span>
          <span class="subtitle">Next-generation interface</span>
        </td>
        <td class="preview">{% include progress/apple.html %}</td>
      </tr>
      <tr>
        <td class="description">
          <span class="title">Claude 4 Interface</span>
          <span class="subtitle">AI assistant visualization</span>
        </td>
        <td class="preview">{% include progress/claude.html %}</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .progress-showcase {
    margin: 2rem 0;
    max-width: 100%;
  }

  .progress-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;
    background: transparent;
  }

  .progress-table thead th {
    padding: 1.5rem 2rem 1rem 0;
    font-weight: 400;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #666;
    border-bottom: 1px solid #eee;
    background: transparent;
  }

  .progress-table .description-col {
    width: 40%;
  }

  .progress-table .preview-col {
    width: 60%;
  }

  .progress-table tbody tr {
    border-bottom: 1px solid #f5f5f5;
    transition: background-color 0.2s ease;
  }

  .progress-table tbody tr:last-child {
    border-bottom: none;
  }

  .progress-table td {
    padding: 2rem 2rem 2rem 0;
    vertical-align: top;
    line-height: 1.6;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .description .title {
    font-weight: 500;
    font-size: 1rem;
    color: #333;
    line-height: 1.4;
  }

  .description .subtitle {
    font-size: 0.875rem;
    color: #777;
    font-style: italic;
    line-height: 1.3;
  }

  .preview {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  /* Responsive adjustments */
  @media screen and (max-width: 768px) {
    .progress-table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
    
    .progress-table thead,
    .progress-table tbody,
    .progress-table th,
    .progress-table td,
    .progress-table tr {
      display: block;
    }
    
    .progress-table thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    
    .progress-table tr {
      border: 1px solid #f5f5f5;
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 4px;
      background: #fafafa;
    }
    
    .progress-table td {
      border: none;
      padding: 0.5rem 0;
      position: relative;
    }
    
    .progress-table td:first-child {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
  }

  @media screen and (max-width: 450px) {
    .progress-showcase {
      margin: 1rem -20px;
      padding: 0 20px;
    }
    
    .progress-table td {
      padding: 0.75rem 0;
    }
  }
</style>