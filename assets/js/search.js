/* Search functionality for chantiers */

class ChantierSearch {
    constructor() {
      this.searchInput = null;
      this.searchContainer = null;
      this.resultsContainer = null;
      this.overlay = null;
      this.isVisible = false;
      this.init();
    }
  
    init() {
      /* Wait for DOM to be ready */
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setupSearch());
      } else {
        this.setupSearch();
      }
    }
  
    setupSearch() {
      /* Create the spotlight search interface */
      this.createSpotlightSearch();
      
      /* Add global event listeners */
      document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
      
      /* Make search globally accessible */
      window.chantierSearch = this;
    }
  
    createSpotlightSearch() {
      /* Create overlay */
      this.overlay = document.createElement('div');
      this.overlay.id = 'searchOverlay';
      this.overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 9999;
        display: none;
        backdrop-filter: blur(2px) brightness(1.2);
      `;
  
      /* Create search container */
      this.searchContainer = document.createElement('div');
      this.searchContainer.id = 'spotlightSearch';
      this.searchContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--accent-color);
        border: 1px solid black;
        padding: 20px;
        min-width: 500px;
        max-width: 80vw;
        max-height: 70vh;
        z-index: 10000;
        display: none;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      `;
  
      /* Create search input */
      this.searchInput = document.createElement('input');
      this.searchInput.id = 'spotlightSearchInput';
      this.searchInput.type = 'text';
      this.searchInput.placeholder = 'Start typing…';
      this.searchInput.style.cssText = `
        width: 100%;
        padding: 12px 12px;
        font-size: 16px;
        border: solid 1px black;
        box-sizing: border-box;
      `;
  
      /* Create results container */
      this.resultsContainer = document.createElement('div');
      this.resultsContainer.id = 'searchResults';
      this.resultsContainer.style.cssText = `
        max-height: 400px;
        overflow-y: auto;
        padding-top: 15px;
        display: none;
      `;
  
      /* Assemble search interface */
      this.searchContainer.appendChild(this.searchInput);
      this.searchContainer.appendChild(this.resultsContainer);
      
      /* Add to page */
      document.body.appendChild(this.overlay);
      document.body.appendChild(this.searchContainer);
      
      /* Add event listeners */
      this.searchInput.addEventListener('input', this.handleSearch.bind(this));
      this.searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
      this.overlay.addEventListener('click', () => this.hide());
    }
  
    handleGlobalKeydown(event) {
      /* Show search on Ctrl+F or Cmd+F */
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        this.show();
      }
      
      /* Hide search on Escape */
      if (event.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    }
  
    handleSearch(event) {
      const searchTerm = event.target.value.toLowerCase().trim();
      
      if (searchTerm === '') {
        this.hideResults();
        return;
      }
      
      this.performSearch(searchTerm);
    }
  
    handleKeydown(event) {
      /* Handle Enter key to navigate to first result */
      if (event.key === 'Enter') {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        if (searchTerm !== '') {
          this.navigateToFirstResult(searchTerm);
        }
      }
      
      /* Handle Escape key to hide search */
      if (event.key === 'Escape') {
        this.hide();
      }
    }
  
    performSearch(searchTerm) {
      /* Check if chantiers data is available */
      if (!window.chantiersData || window.chantiersData.length === 0) {
        this.showNoDataMessage();
        return;
      }
  
      /* Filter chantiers data */
      const filteredChantiers = window.chantiersData.filter(chantier => 
        chantier.title.toLowerCase().includes(searchTerm)
      );
  
      if (filteredChantiers.length === 0) {
        this.showNoResultsMessage(searchTerm);
        return;
      }
  
      this.displayResults(filteredChantiers, searchTerm);
    }
  
    displayResults(chantiers, searchTerm) {
      let resultsHTML = `<div style="margin-bottom: 10px; font-size: 14px; color: var(--font-color-muted, #6c757d);">
        ${chantiers.length} mathing project${chantiers.length !== 1 ? 's' : ''}
      </div>`;
      
      chantiers.forEach((chantier, index) => {
        const underlinedTitle = chantier.title.replace(
          new RegExp(searchTerm, 'gi'),
          match => `<span style="text-decoration: underline;">${match}</span>`
        );
        
        const isFirst = index === 0;
        resultsHTML += `
          <div class="search-result-item" style="
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            color: var(--font-color, #1a1a1a);
            text-decoration: none;
            display: block;
            margin-bottom: 2px;
            ${isFirst ? 'background-color: rgba(0, 0, 0, 0.1);' : ''}
          " data-url="${chantier.url}" data-index="${index}">
            ${underlinedTitle}
          </div>
        `;
      });
      
      this.resultsContainer.innerHTML = resultsHTML;
      this.resultsContainer.style.display = 'block';
      
      /* Add click handlers to results */
      const resultItems = this.resultsContainer.querySelectorAll('.search-result-item');
      resultItems.forEach(item => {
        item.addEventListener('click', () => {
          window.location.href = item.dataset.url;
        });
        
        item.addEventListener('mouseenter', () => {
          item.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
          const index = parseInt(item.dataset.index);
          if (index !== 0) {
            item.style.backgroundColor = 'transparent';
          }
        });
      });
    }
  
    showNoResultsMessage(searchTerm) {
      this.resultsContainer.innerHTML = `
        <div style="text-align: center; color: var(--font-color-muted, #6c757d); padding: 20px;">
          Nothing matching: "${searchTerm}"
        </div>
      `;
      this.resultsContainer.style.display = 'block';
    }
  
    showNoDataMessage() {
      this.resultsContainer.innerHTML = `
        <div style="text-align: center; color: var(--font-color-muted, #6c757d); padding: 20px;">
          No match.
        </div>
      `;
      this.resultsContainer.style.display = 'block';
    }
  
    hideResults() {
      this.resultsContainer.style.display = 'none';
    }
  
    /* Public methods for external access */
    show() {
      this.overlay.style.display = 'block';
      this.searchContainer.style.display = 'block';
      this.searchInput.focus();
      this.searchInput.select();
      this.isVisible = true;
      this.hideResults();
      
      /* Prevent body scrolling */
      document.body.style.overflow = 'hidden';
    }
  
    hide() {
      this.overlay.style.display = 'none';
      this.searchContainer.style.display = 'none';
      this.searchInput.value = '';
      this.isVisible = false;
      this.hideResults();
      
      /* Restore body scrolling */
      document.body.style.overflow = '';
    }
  
    toggle() {
      if (this.isVisible) {
        this.hide();
      } else {
        this.show();
      }
    }
  
    navigateToFirstResult(searchTerm) {
      if (!window.chantiersData || window.chantiersData.length === 0) {
        return;
      }
  
      const filteredChantiers = window.chantiersData.filter(chantier => 
        chantier.title.toLowerCase().includes(searchTerm)
      );
  
      if (filteredChantiers.length > 0) {
        window.location.href = filteredChantiers[0].url;
      }
    }
  }
  
  /* Initialize search when DOM is loaded */
  document.addEventListener('DOMContentLoaded', () => {
    new ChantierSearch();
  });