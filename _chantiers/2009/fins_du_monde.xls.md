---
layout: chantier
title: fins_du_monde.xls
started:  2009-12-01 00:00
ended: 2009-12-01 00:00
#touched: 2025-08-10
location: [Belleville]
highlighted: false
result: [list, vibe]
tech: [Excel<sup>*</sup>, GPT-5]
href:
    - ["ext", "<sup>†</sup>", "2012 (2009), on IMDB ➟", "https://www.imdb.com/title/tt1190080/"]
    - ["", "<sup>*</sup>", "Vibe coded with GPT-5 on 12.08.25", ""]
description: |
    I don't remember 2012<sup>†</sup> being a particularly great movie. What I remember however is getting back home and making an excel sheet on my parents Compaq. 
---

<style>
/* Excel 97–2003 inspired styling */
:root {
  --excel-bg: #c0c0c0;
  --excel-winbar: #000080;
  --excel-winbar-text: #ffffff;
  --excel-menu-bg: #c0c0c0;
  --excel-menu-text: #000000;
  --excel-grid-header: #d4d0c8;
  --excel-grid-border: #808080;
  --excel-cell-bg: #ffffff;
  --excel-cell-text: #000000;
  --excel-selection: #ffffff;
}

.excel97 {
  font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
  background: var(--excel-bg);
  border: 2px solid #000;
  box-shadow: 6px 6px 0 rgba(0,0,0,0.25);
  max-width: 100%;
  position: relative;
}

.excel97-titlebar {
  background: var(--excel-winbar);
  color: var(--excel-winbar-text);
  padding: 4px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.excel97-title {
  font-size: 12px;
}

.excel97-window-buttons .btn {
  display: inline-block;
  width: 18px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border: 1px solid #000;
  background: #c0c0c0;
  color: #000;
  margin-left: 2px;
  font-size: 12px;
}

.excel97-menubar {
  background: var(--excel-menu-bg);
  color: var(--excel-menu-text);
  border-bottom: 1px solid #000;
  padding: 3px 6px;
  font-size: 12px;
}

.excel97-menubar span {
  margin-right: 12px;
}

.excel97-formulabar {
  display: grid;
  grid-template-columns: 80px 28px 1fr;
  gap: 6px;
  align-items: center;
  background: var(--excel-menu-bg);
  border-bottom: 1px solid #000;
  padding: 6px;
}

.excel97-formulabar .name-box {
  border: 1px inset #fff;
  background: #fff;
  padding: 2px 6px;
  font-size: 12px;
}

.excel97-formulabar .fx {
  border: 1px inset #fff;
  background: #fff;
  padding: 2px 6px;
  font-size: 12px;
}

.excel97-formulabar .formula-input {
  border: 1px inset #fff;
  padding: 2px 6px;
  font-size: 12px;
}

.excel97-grid-wrapper {
  overflow: auto;
  background: var(--excel-cell-bg);
  max-height: calc(100vh - 300px);
}

.excel-grid {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12px;
}

.excel-grid thead th {
  position: sticky;
  top: 0;
  background: var(--excel-grid-header);
  border: 1px solid var(--excel-grid-border);
  padding: 2px 4px;
  font-weight: normal;
}

.excel-grid .row-header {
  position: sticky;
  left: 0;
  background: var(--excel-grid-header);
  border: 1px solid var(--excel-grid-border);
  width: 36px;
  text-align: right;
  padding: 2px 4px;
}

.excel-grid td {
  border: 1px solid var(--excel-grid-border);
  height: 22px;
  padding: 0 4px;
  color: var(--excel-cell-text);
  background: var(--excel-cell-bg);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: crosshair;
}

.excel-grid td input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 4px;
  font: inherit;
  color: inherit;
  cursor: text;
}

.excel-grid td.selected {
  outline: 2px solid #0000ff;
  background: var(--excel-selection);
}

.excel97-statusbar {
  display: flex;
  justify-content: space-between;
  background: var(--excel-menu-bg);
  border-top: 1px solid #000;
  padding: 2px 6px;
  font-size: 12px;
}

/* Birth input strip */
.birth-strip {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 4px;
  margin: 6px;
}

.birth-strip label {
  display: contents;
}

.birth-strip span {
  align-self: center;
  font-size: 12px;
}

.birth-strip input {
  border: 1px inset #fff;
  background: #fff;
  padding: 2px 6px;
  font-size: 12px;
  width: 100%;
}

/* Menu dropdown */
.excel97-menu {
  position: absolute;
  background: var(--excel-menu-bg);
  border: 1px solid #000;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
  font-size: 12px;
  display: none;
  z-index: 999;
}
.excel97-menu ul {
  list-style: none;
  margin: 0;
  padding: 2px;
}
.excel97-menu li {
  padding: 2px 20px 2px 24px;
  white-space: nowrap;
  cursor: default;
}
.excel97-menu li:hover {
  background: var(--excel-selection);
}
.excel97-menu .separator {
  height: 1px;
  background: #808080;
  margin: 2px 4px;
}
.excel97-menu .disabled {
  color: #666;
}
</style>

<div class="excel97" id="excel-fdmr" role="application" aria-label="Microsoft Excel 97–2003">
  <div class="excel97-titlebar">
    <div class="excel97-title">Microsoft Excel - fins_du_monde.xls</div>
    <div class="excel97-window-buttons" aria-hidden="true">
      <span class="btn minimize">_</span>
      <span class="btn maximize">□</span>
      <span class="btn close">×</span>
    </div>
  </div>
  <div class="excel97-menubar" role="menubar" aria-label="Menu">
    <span role="menuitem">File</span>
    <span role="menuitem">Edit</span>
    <span role="menuitem">View</span>
    <span role="menuitem">Insert</span>
    <span role="menuitem">Format</span>
    <span role="menuitem">Tools</span>
    <span role="menuitem">Data</span>
    <span role="menuitem">Window</span>
    <span role="menuitem">Help</span>
  </div>
  <div class="excel97-formulabar" aria-label="Formula Bar">
    <div class="name-box" aria-label="Name Box" title="Cell">
      <span id="excel-fdmr-active-cell">A1</span>
    </div>
    <div class="fx">fx</div>
    <input type="text" class="formula-input" id="excel-fdmr-formula" aria-label="Formula" value="">
  </div>
  <div class="excel97-grid-wrapper">
    <table class="excel-grid" role="grid" aria-rowcount="40" aria-colcount="8">
      <thead>
        <tr class="col-headers" aria-hidden="false">
          <!-- Filled by JS -->
        </tr>
      </thead>
      <tbody class="grid-body">
        <!-- Filled by JS -->
      </tbody>
    </table>
  </div>
  <div class="excel97-statusbar" aria-live="polite">
    <span>Ready</span>
    <span class="right" id="excel-fdmr-count"></span>
  </div>
</div>

<script>
/* Minimal Excel 97–2003-like grid with in-cell DOB input and interactive menus */
(function () {
  "use strict";

  var failedEnds = [
    { y: 66, m: 7, d: 1, label: "Great Jewish Revolt portents", source: "Josephus" },
    { y: 500, m: 1, d: 1, label: "Year 500 apocalyptic expectation", source: "Christian millenarian" },
    { y: 793, m: 6, d: 8, label: "Lindisfarne omen era", source: "Omen chronicles" },
    { y: 1000, m: 1, d: 1, label: "Anno 1000 panic", source: "Medieval Europe" },
    { y: 1033, m: 4, d: 3, label: "1,000 years after Crucifixion", source: "Various" },
    { y: 1186, m: 9, d: 16, label: "Letter of Toledo planetary alignment", source: "Toledo" },
    { y: 1284, m: 1, d: 1, label: "666 years after Islam 618", source: "Joachimite" },
    { y: 1348, m: 8, d: 20, label: "Black Death as apocalypse", source: "Europe" },
    { y: 1524, m: 2, d: 20, label: "Great Flood prediction", source: "Astrologers" },
    { y: 1533, m: 10, d: 19, label: "Münster Anabaptists", source: "Melchiorites" },
    { y: 1666, m: 6, d: 6, label: "Number of the Beast year", source: "London" },
    { y: 1843, m: 3, d: 21, label: "Millerite 'Great Disappointment'", source: "William Miller" },
    { y: 1910, m: 5, d: 18, label: "Halley's Comet cyanogen scare", source: "Newspapers" },
    { y: 1982, m: 3, d: 10, label: "Jupiter effect", source: "Gribbin & Plagemann" },
    { y: 1994, m: 9, d: 6, label: "1994? prophecy", source: "Harold Camping" },
    { y: 1997, m: 3, d: 26, label: "Heaven's Gate comet", source: "Cult" },
    { y: 1999, m: 8, d: 11, label: "Nostradamus eclipse", source: "Nostradamus" },
    { y: 2000, m: 1, d: 1, label: "Y2K apocalypse", source: "Tech panic" },
    { y: 2003, m: 5, d: 27, label: "Planet Nibiru", source: "Internet" },
    { y: 2011, m: 5, d: 21, label: "Rapture 2011", source: "Harold Camping" },
    { y: 2012, m: 12, d: 21, label: "Mayan Long Count", source: "Pop culture" },
    { y: 2015, m: 9, d: 28, label: "Blood Moon", source: "Hagee" },
    { y: 2017, m: 9, d: 23, label: "Revelation 12 sign", source: "YouTube" },
    { y: 2020, m: 6, d: 21, label: "Recalculated 2012", source: "Social media" }
  ];

  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function toComparableNumber(y, m, d) { return y * 10000 + m * 100 + d; }

  function createGrid(containerId) {
    var root = document.getElementById(containerId);
    if (!root) return;
    root.setAttribute("tabindex", "0");

    var title = root.querySelector(".excel97-title");
    var nameBox = root.querySelector("#excel-fdmr-active-cell");
    var formula = root.querySelector("#excel-fdmr-formula");
    var theadRow = root.querySelector(".col-headers");
    var tbody = root.querySelector(".grid-body");
    var countSpan = root.querySelector("#excel-fdmr-count");

    var columns = ["A", "B", "C"];
    theadRow.innerHTML = "";
    theadRow.appendChild(document.createElement("th"));
    columns.forEach(function (c) { var th = document.createElement("th"); th.textContent = c; theadRow.appendChild(th); });

    var activeCell = { r: 1, c: 1 }; /* r: 1.., c: 1..columns.length (A=1) */
    var selectedCellEl = null;

    function getCellElement(r, c) {
      var tr = tbody.children[r - 1];
      if (!tr) return null;
      /* Column index 0 = row header; shift by +1 to reach first data cell */
      return tr.children[c] || null;
    }

    function clearSelection() {
      if (selectedCellEl) { selectedCellEl.classList.remove("selected"); }
      selectedCellEl = null;
    }

    function setActive(r, c) {
      /* Clamp to valid data cell range (A..C), ignore row-header column */
      var maxCol = columns.length; /* 3 */
      if (c < 1) c = 1;
      if (c > maxCol) c = maxCol;
      if (r < 1) r = 1;
      activeCell.r = r; activeCell.c = c;
      var colLetter = String.fromCharCode(64 + c); /* A=1, B=2, ... */
      nameBox.textContent = colLetter + r;
      clearSelection();
      var cellEl = getCellElement(r, c);
      if (cellEl) {
        cellEl.classList.add("selected");
        selectedCellEl = cellEl;
        var inputInCell = cellEl.querySelector('input');
        if (inputInCell) { formula.value = inputInCell.value; } else if (r > 1) { formula.value = cellEl.textContent; } else { formula.value = ""; }
      }
    }

    function editCell(cellEl) {
      if (!cellEl || cellEl.classList.contains("row-header")) return;
      var current = cellEl.textContent;
      var input = document.createElement("input");
      input.type = "text";
      input.value = current;
      cellEl.textContent = "";
      cellEl.appendChild(input);
      input.focus();
      input.select();
      function commit() {
        var val = input.value;
        cellEl.removeChild(input);
        cellEl.textContent = val;
        formula.value = val;
      }
      function cancel() {
        cellEl.removeChild(input);
        cellEl.textContent = current;
        formula.value = current;
      }
      input.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") { commit(); }
        if (ev.key === "Escape") { cancel(); }
      });
      input.addEventListener("blur", commit);
    }

    function bindBirthInputs() {
      var dEl = root.querySelector("#cell-day");
      var mEl = root.querySelector("#cell-month");
      var yEl = root.querySelector("#cell-year");
      function onKey(ev) { if (ev.key === "Enter") { filterByBirth(); } }
      [dEl, mEl, yEl].forEach(function (el) { if (!el) return; el.addEventListener("keydown", onKey); el.addEventListener("change", filterByBirth); });
    }

    function renderRows(rows) {
      tbody.innerHTML = "";
      var maxRows = Math.max(rows.length + 2, 12);
      for (var i = 1; i <= maxRows; i += 1) {
        var tr = document.createElement("tr");
        var rh = document.createElement("td");
        rh.className = "row-header";
        rh.textContent = i;
        tr.appendChild(rh);
        for (var c = 1; c <= columns.length; c += 1) {
          var td = document.createElement("td");
          if (i === 1) {
            var input = document.createElement("input");
            input.type = "text";
            if (c === 1) { input.id = "cell-day"; input.placeholder = "DD"; }
            if (c === 2) { input.id = "cell-month"; input.placeholder = "MM"; }
            if (c === 3) { input.id = "cell-year"; input.placeholder = "YYYY"; }
            td.appendChild(input);
          } else {
            var idx0 = i - 3;
            if (idx0 >= 0 && idx0 < rows.length) {
              var row = rows[idx0];
              if (c === 1) { td.textContent = row.date; td.setAttribute("data-sort", row.sort); }
              if (c === 2) { td.textContent = row.label; }
              if (c === 3) { td.textContent = row.source; }
            }
            td.addEventListener("click", function (ev) {
              var cell = ev.currentTarget;
              var trEl = cell.parentElement;
              var rIndex = Array.prototype.indexOf.call(tbody.children, trEl) + 1;
              var cIndex = Array.prototype.indexOf.call(trEl.children, cell); /* includes header at index 0 */
              setActive(rIndex, cIndex);
            });
            td.addEventListener("dblclick", function (ev) {
              var cell = ev.currentTarget;
              editCell(cell);
              ev.stopPropagation();
            });
          }
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      bindBirthInputs();
    }

    function getBirthValues() {
      var dEl = root.querySelector("#cell-day");
      var mEl = root.querySelector("#cell-month");
      var yEl = root.querySelector("#cell-year");
      var d = dEl ? parseInt(dEl.value, 10) : NaN;
      var m = mEl ? parseInt(mEl.value, 10) : NaN;
      var y = yEl ? parseInt(yEl.value, 10) : NaN;
      return { d: d, m: m, y: y };
    }

    function filterByBirth() {
      var v = getBirthValues();
      var d = parseInt(v.d, 10), m = parseInt(v.m, 10), y = parseInt(v.y, 10);
      if (!y || !m || !d) {
        renderRows([]);
        countSpan.textContent = "";
        title.textContent = "Microsoft Excel - Book1";
        return;
      }
      var born = toComparableNumber(y, m, d);
      var rows = failedEnds
        .filter(function (e) { return toComparableNumber(e.y, e.m, e.d) < born; })
        .sort(function (a, b) { return toComparableNumber(a.y, a.m, a.d) - toComparableNumber(b.y, b.m, b.d); })
        .map(function (e) { return { sort: toComparableNumber(e.y, e.m, e.d), date: e.y + "-" + pad2(e.m) + "-" + pad2(e.d), label: e.label, source: e.source }; });
      renderRows(rows);
      countSpan.textContent = rows.length + " events";
      title.textContent = "Microsoft Excel - Book1 [" + rows.length + "]";
    }

    formula.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        if (activeCell.r > 1 && activeCell.c > 1) {
          var cellEl = getCellElement(activeCell.r, activeCell.c);
          if (cellEl) { cellEl.textContent = formula.value; }
        }
        ev.preventDefault();
      }
    });

    root.addEventListener("keydown", function (ev) {
      var r = activeCell.r; var c = activeCell.c;
      if (ev.key === "ArrowDown") { r += 1; ev.preventDefault(); }
      if (ev.key === "ArrowUp") { r = Math.max(1, r - 1); ev.preventDefault(); }
      if (ev.key === "ArrowRight") { c = Math.min(columns.length, c + 1); ev.preventDefault(); }
      if (ev.key === "ArrowLeft") { c = Math.max(1, c - 1); ev.preventDefault(); }
      if (ev.key === "Tab") { c += (ev.shiftKey ? -1 : 1); ev.preventDefault(); }
      if (ev.key === "PageDown") { r += 10; ev.preventDefault(); }
      if (ev.key === "PageUp") { r = Math.max(1, r - 10); ev.preventDefault(); }
      /* Start typing to edit the active cell */
      if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
        var cellEl = getCellElement(r, c);
        if (cellEl) {
          editCell(cellEl);
          var input = cellEl.querySelector('input');
          if (input) { input.value = ev.key; input.setSelectionRange(input.value.length, input.value.length); }
          ev.preventDefault();
          return;
        }
      }
      setActive(r, c);
    });

    renderRows([]);
    setActive(1, 2);
    root.focus();

    /* Menubar interactivity */
    var menubar = root.querySelector(".excel97-menubar");
    var menuPopup = document.createElement("div");
    menuPopup.className = "excel97-menu";
    menuPopup.innerHTML = "<ul></ul>";
    root.appendChild(menuPopup);

    var menus = {
      File: [
        { label: "New", action: null },
        { label: "Open...", disabled: true },
        { label: "Save", disabled: true },
        { separator: true },
        { label: "Exit", disabled: true }
      ],
      Edit: [
        { label: "Undo", disabled: true },
        { separator: true },
        { label: "Cut", disabled: true },
        { label: "Copy", disabled: true },
        { label: "Paste", disabled: true }
      ],
      View: [
        { label: "Zoom 100%", action: null },
        { label: "Status Bar", action: null }
      ],
      Insert: [
        { label: "Cells...", disabled: true },
        { label: "Rows...", disabled: true },
        { label: "Columns...", disabled: true }
      ],
      Format: [
        { label: "Cells...", disabled: true },
        { label: "Row...", disabled: true },
        { label: "Column...", disabled: true }
      ],
      Tools: [
        { label: "Options...", disabled: true }
      ],
      Data: [
        { label: "Sort...", disabled: true },
        { label: "Filter", action: filterByBirth },
        { label: "Recalculate", action: filterByBirth }
      ],
      Window: [
        { label: "Arrange...", disabled: true },
        { label: "Split", disabled: true }
      ],
      Help: [
        { label: "About...", action: function () { alert("Les fins du monde ratées\nExcel 97 look, 2025"); } }
      ]
    };

    function hideMenu() {
      menuPopup.style.display = "none";
      document.removeEventListener("mousedown", onDocDown);
    }

    function onDocDown(ev) {
      if (!menuPopup.contains(ev.target) && !menubar.contains(ev.target)) { hideMenu(); }
    }

    function openMenu(name, anchorEl) {
      var items = menus[name] || [];
      var ul = menuPopup.querySelector("ul");
      ul.innerHTML = "";
      items.forEach(function (item) {
        if (item.separator) { var sep = document.createElement("div"); sep.className = "separator"; ul.appendChild(sep); return; }
        var li = document.createElement("li");
        li.textContent = item.label;
        if (item.disabled) { li.className = "disabled"; }
        li.addEventListener("click", function (ev) { if (!item.disabled && item.action) { item.action(); } hideMenu(); ev.stopPropagation(); });
        ul.appendChild(li);
      });
      /* Position menu right under the clicked menu item, aligned left edge */
      var rect = anchorEl.getBoundingClientRect();
      var rootRect = root.getBoundingClientRect();
      var menubarRect = menubar.getBoundingClientRect();
      var left = rect.left - rootRect.left;
      var top = menubarRect.bottom - rootRect.top;
      menuPopup.style.left = left + "px";
      menuPopup.style.top = top + "px";
      menuPopup.style.display = "block";
      document.addEventListener("mousedown", onDocDown);
    }

    menubar.addEventListener("click", function (ev) {
      var el = ev.target;
      if (el.getAttribute("role") === "menuitem") { openMenu(el.textContent.trim(), el); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { createGrid("excel-fdmr"); });
  } else {
    createGrid("excel-fdmr");
  }
}());
</script>

