class ChantierSearch {
    constructor() {
        this.searchContainer = null;
        this.searchInput = null;
        this.resultsContainer = null;
        this.hintContainer = null;
        this.overlay = null;
        this.isVisible = false;
        this.selectedIndex = -1;
        this.currentResults = [];
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
        document.addEventListener('keyup', this.handleGlobalModifierKeys.bind(this));

        /* Make search globally accessible */
        window.chantierSearch = this;
    }

    createSpotlightSearch() {
        /* Create overlay */
        this.overlay = document.createElement('div');
        this.overlay.id = 'searchOverlay';

        /* Create search container */
        this.searchContainer = document.createElement('div');
        this.searchContainer.id = 'spotlightSearch';

        /* Create search input */
        this.searchInput = document.createElement('input');
        this.searchInput.id = 'spotlightSearchInput';
        this.searchInput.type = 'text';
        this.searchInput.placeholder = 'Start typing…';

        /* Create results container */
        this.resultsContainer = document.createElement('div');
        this.resultsContainer.id = 'searchResults';

        /* Create hint container */
        this.hintContainer = document.createElement('div');
        this.hintContainer.id = 'searchHint';

        /* Assemble search interface */
        this.searchContainer.appendChild(this.searchInput);
        this.searchContainer.appendChild(this.resultsContainer);
        this.searchContainer.appendChild(this.hintContainer);

        /* Add to page */
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.searchContainer);

        /* Add event listeners */
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
        this.searchInput.addEventListener('keydown', this.handleModifierKeys.bind(this));
        this.searchInput.addEventListener('keyup', this.handleModifierKeys.bind(this));
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

    handleModifierKeys(event) {
        /* Show hint when Cmd/Ctrl or Alt is pressed */
        if (event.metaKey || event.ctrlKey) {
            this.showHint('⌘ Open in background');
        } else if (event.altKey) {
            this.showHint('⌥ Copy link to clipboard');
        } else {
            this.hideHint();
        }
    }

    handleGlobalModifierKeys(event) {
        /* Handle modifier key releases globally */
        if (event.key === 'Meta' || event.key === 'Control' || event.key === 'Alt') {
            this.hideHint();
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
        /* Handle arrow keys for navigation */
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.selectNext();
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.selectPrevious();
            return;
        }

        /* Handle Enter key to navigate to selected result */
        if (event.key === 'Enter') {
            event.preventDefault();
            if (event.altKey) {
                this.copySelectedUrl();
            } else {
                this.navigateToSelected(event.metaKey || event.ctrlKey);
            }
            return;
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

        /* Find title matches with fuzzy search */
        const matches = window.chantiersData.filter(chantier => {
            return this.fuzzyMatch(searchTerm, chantier.title);
        });

        if (matches.length === 0) {
            this.showNoResultsMessage(searchTerm);
            return;
        }

        /* Sort by relevance (exact matches first, then fuzzy) */
        const sortedMatches = matches.sort((a, b) => {
            const aScore = this.getTitleRelevanceScore(searchTerm, a.title);
            const bScore = this.getTitleRelevanceScore(searchTerm, b.title);
            return bScore - aScore;
        });

        /* Limit results */
        this.currentResults = sortedMatches.slice(0, 20);
        this.selectedIndex = 0; /* Select first result by default */

        this.displayResults(this.currentResults, searchTerm);
    }

    getTitleRelevanceScore(searchTerm, title) {
        if (!searchTerm || !title) return 0;

        const searchLower = searchTerm.toLowerCase();
        const titleLower = title.toLowerCase();

        /* Exact match gets highest score */
        if (titleLower.includes(searchLower)) {
            return 100;
        }

        /* Word boundary matches get high score */
        const searchWords = searchTerm.toLowerCase().split(/\s+/);
        const titleWords = title.toLowerCase().split(/\s+/);

        let score = 0;
        searchWords.forEach(word => {
            if (titleWords.some(titleWord => titleWord.includes(word))) {
                score += 50;
            }
        });

        return score;
    }



    fuzzyMatch(searchTerm, text) {
        if (searchTerm.length === 0) return false;

        const searchLower = searchTerm.toLowerCase();
        const textLower = text.toLowerCase();

        /* Direct substring match */
        if (textLower.includes(searchLower)) return true;

        /* Character-by-character fuzzy match for short terms */
        if (searchLower.length <= 6) {
            let searchIndex = 0;
            for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
                if (textLower[i] === searchLower[searchIndex]) {
                    searchIndex++;
                }
            }
            return searchIndex === searchLower.length;
        }

        /* Word-based matching for longer terms */
        const searchWords = searchLower.split(/\s+/);
        const textWords = textLower.split(/\s+/);

        return searchWords.every(searchWord =>
            textWords.some(textWord => textWord.includes(searchWord))
        );
    }

    getDisplayYear(chantier) {
        /* Extract year from date strings */
        const getYearFromDate = (dateString) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            return isNaN(date.getFullYear()) ? null : date.getFullYear();
        };

        const createdYear = getYearFromDate(chantier.started);
        const endedYear = getYearFromDate(chantier.ended);

        /* Return ended year if it exists and is different from created year */
        if (endedYear && createdYear && endedYear !== createdYear) {
            return endedYear;
        }

        /* Otherwise return created year */
        return createdYear;
    }

    displayResults(matches, searchTerm) {
        let resultsHTML = '';

        matches.forEach((chantier, index) => {
            const underlinedTitle = chantier.title.replace(
                new RegExp(searchTerm, 'gi'),
                match => `<span class="search-highlight">${match}</span>`
            );

            const year = this.getDisplayYear(chantier);
            const yearDisplay = year ? ` (${year})` : '';

            const isSelected = index === this.selectedIndex;
            const selectedClass = isSelected ? ' selected' : '';
            resultsHTML += `
        <div class="search-result-item${selectedClass}" data-url="${chantier.url}" data-index="${index}">
          ${underlinedTitle}${yearDisplay}
        </div>
      `;
        });

        this.resultsContainer.innerHTML = resultsHTML;
        this.resultsContainer.style.display = 'block';

        /* Add click handlers to results */
        const resultItems = this.resultsContainer.querySelectorAll('.search-result-item');
        resultItems.forEach((item, index) => {
            item.addEventListener('click', (event) => {
                const newTab = event.metaKey || event.ctrlKey;
                const copyLink = event.altKey;

                if (copyLink) {
                    const fullUrl = window.location.origin + item.dataset.url;
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(fullUrl).then(() => {
                            this.showCopyNotification();
                        });
                    } else {
                        /* Fallback for older browsers */
                        const textArea = document.createElement('textarea');
                        textArea.value = fullUrl;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        this.showCopyNotification();
                    }
                } else if (newTab) {
                    window.open(item.dataset.url, '_blank');
                    this.hide();
                    if (window.showNotification) {
                        window.showNotification('Tab opened behind');
                    }
                } else {
                    window.location.href = item.dataset.url;
                }
            });

            item.addEventListener('mouseenter', () => {
                this.selectedIndex = index;
                this.updateSelection();
            });

            item.addEventListener('mouseleave', () => {
                /* Keep current selection on mouse leave */
            });
        });
    }

    showNoResultsMessage(searchTerm) {
        this.resultsContainer.innerHTML = `
        <div class="search-message">
          Nothing matching: "${searchTerm}"
        </div>
      `;
        this.resultsContainer.style.display = 'block';
    }

    showNoDataMessage() {
        this.resultsContainer.innerHTML = `
        <div class="search-message">
          No match.
        </div>
      `;
        this.resultsContainer.style.display = 'block';
    }

    hideResults() {
        this.resultsContainer.style.display = 'none';
        this.selectedIndex = -1;
        this.currentResults = [];
        this.hideHint();
    }

    showHint(text = '⌘ Open in new tab') {
        if (this.currentResults.length > 0) {
            this.hintContainer.innerHTML = text;
            this.hintContainer.style.display = 'block';
        }
    }

    hideHint() {
        this.hintContainer.style.display = 'none';
    }

    selectNext() {
        if (this.currentResults.length === 0) return;

        this.selectedIndex = (this.selectedIndex + 1) % this.currentResults.length;
        this.updateSelection();
    }

    selectPrevious() {
        if (this.currentResults.length === 0) return;

        this.selectedIndex = this.selectedIndex <= 0 ?
            this.currentResults.length - 1 :
            this.selectedIndex - 1;
        this.updateSelection();
    }

    updateSelection() {
        const resultItems = this.resultsContainer.querySelectorAll('.search-result-item');
        resultItems.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    navigateToSelected(newTab = false) {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.currentResults.length) {
            const selectedChantier = this.currentResults[this.selectedIndex];
            if (newTab) {
                window.open(selectedChantier.url, '_blank');
                this.hide();
                if (window.showNotification) {
                    window.showNotification('Tab opened behind');
                }
            } else {
                window.location.href = selectedChantier.url;
            }
        }
    }

    copySelectedUrl() {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.currentResults.length) {
            const selectedChantier = this.currentResults[this.selectedIndex];
            const fullUrl = window.location.origin + selectedChantier.url;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(fullUrl).then(() => {
                    this.showCopyNotification();
                });
            } else {
                /* Fallback for older browsers */
                const textArea = document.createElement('textarea');
                textArea.value = fullUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showCopyNotification();
            }
        }
    }

    showCopyNotification() {
        /* Hide search interface */
        this.hide();

        /* Show notification using the global system */
        if (window.showNotification) {
            window.showNotification('Link copied to clipboard');
        }
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
}

/* Initialize search when DOM is loaded */
document.addEventListener('DOMContentLoaded', () => {
    new ChantierSearch();
});