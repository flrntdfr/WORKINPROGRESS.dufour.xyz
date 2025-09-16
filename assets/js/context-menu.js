/* Custom Context Menu JavaScript */

class CustomContextMenu {
  constructor() {
    this.menu = null;
    this.isVisible = false;
    this.init();
  }

  init() {
    /* Create the context menu element */
    this.menu = document.createElement('div');
    this.menu.className = 'custom-context-menu';
    document.body.appendChild(this.menu);

    /* Add event listeners */
    document.addEventListener('contextmenu', this.handleContextMenu.bind(this));
    document.addEventListener('click', this.hideMenu.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('scroll', this.hideMenu.bind(this));
  }

  handleContextMenu(event) {
    /* Prevent default browser context menu */
    event.preventDefault();
    
    /* Get click coordinates */
    const x = event.clientX;
    const y = event.clientY;
    
    /* Show custom menu */
    this.showMenu(x, y, event.target);
  }

  showMenu(x, y, target) {
    /* Clear existing menu items */
    this.menu.innerHTML = '';
    
    /* Add menu items based on target */
    this.addMenuItems(target);
    
    /* Position the menu */
    this.positionMenu(x, y);
    
    /* Show the menu */
    this.menu.classList.add('show');
    this.isVisible = true;
  }

  hideMenu() {
    if (this.isVisible) {
      this.menu.classList.remove('show');
      this.isVisible = false;
    }
  }

  handleKeydown(event) {
    /* Hide menu on Escape key */
    if (event.key === 'Escape') {
      this.hideMenu();
    }
  }

  positionMenu(x, y) {
    /* Get menu dimensions */
    const menuRect = this.menu.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    /* Adjust position if menu would go off-screen */
    let finalX = x;
    let finalY = y;
    
    if (x + menuRect.width > windowWidth) {
      finalX = windowWidth - menuRect.width - 10;
    }
    
    if (y + menuRect.height > windowHeight) {
      finalY = windowHeight - menuRect.height - 10;
    }
    
    /* Apply position */
    this.menu.style.left = finalX + 'px';
    this.menu.style.top = finalY + 'px';
  }

  addMenuItems(target) {
    /* Default menu items */
    const defaultItems = [
        { text: '⋯ Search', action: () => this.activateSearch() },
        { separator: true },
        { text: '↑ Start', action: () => window.location.href = '/' },
        { text: '← Previous', action: () => this.navigateToPreviousChantier() },
        { text: '→ Next', action: () => this.navigateToNextChantier() },
        { text: '↔ Random', action: () => this.openRandomPage() },
        { text: '↻ Restart', action: () => this.restart() },
        { separator: true },
        { text: '☰ Admin panel', action: () => { window.location.href = '/admin'; } },
    ];

    /* Add target-specific items */
    let items = [...defaultItems];
    
    if (target.tagName === 'A') {
      items.push(
        { separator: true },
        { text: 'Open in new tab', action: () => window.open(target.href, '_blank') },
        { text: 'Copy link', action: () => this.copyToClipboard(target.href) }
      );
    }
    
    if (target.tagName === 'IMG') {
      items.push(
        { separator: true },
        { text: 'Open image', action: () => window.open(target.src, '_blank') },
        { text: 'Copy image URL', action: () => this.copyToClipboard(target.src) }
      );
    }

    /* Create menu items */
    items.forEach(item => {
      if (item.separator) {
        const separator = document.createElement('div');
        separator.className = 'custom-context-menu-separator';
        this.menu.appendChild(separator);
      } else {
        const menuItem = document.createElement('div');
        menuItem.className = 'custom-context-menu-item';
        menuItem.textContent = item.text;
        menuItem.addEventListener('click', () => {
          item.action();
          this.hideMenu();
        });
        this.menu.appendChild(menuItem);
      }
    });
  }

  activateSearch() {
    /* Activate search if available */
    if (window.chantierSearch) {
      window.chantierSearch.show();
    } else {
      console.warn('Search functionality not available');
    }
  }

  openRandomPage() {
    /* Check if chantiers data is available */
    if (!window.chantiersData || window.chantiersData.length === 0) {
      console.warn('No chantiers data available for random selection');
      return;
    }

    /* Get current URL to exclude it from random selection */
    const currentUrl = window.location.pathname;
    
    /* Filter out the current page from available options */
    const availableChantiers = window.chantiersData.filter(chantier => chantier.url !== currentUrl);
    
    /* If no other pages available, stay on current page */
    if (availableChantiers.length === 0) {
      console.warn('No other pages available for random selection');
      return;
    }

    /* Get a random chantier from available options */
    const randomIndex = Math.floor(Math.random() * availableChantiers.length);
    const randomChantier = availableChantiers[randomIndex];

    /* Navigate to the random page */
    window.location.href = randomChantier.url;
  }

  navigateToNextChantier() {
    /* Check if chantiers data is available */
    if (!window.chantiersData || window.chantiersData.length === 0) {
      console.warn('No chantiers data available for navigation');
      return;
    }

    /* Find current chantier index */
    const currentUrl = window.location.pathname;
    const currentIndex = window.chantiersData.findIndex(chantier => chantier.url === currentUrl);
    
    if (currentIndex === -1) {
      /* If not on a chantier page, go to the first one */
      window.location.href = window.chantiersData[0].url;
      return;
    }

    /* Navigate to next chantier (wrap around to first if at end) */
    const nextIndex = (currentIndex + 1) % window.chantiersData.length;
    window.location.href = window.chantiersData[nextIndex].url;
  }

  navigateToPreviousChantier() {
    /* Check if chantiers data is available */
    if (!window.chantiersData || window.chantiersData.length === 0) {
      console.warn('No chantiers data available for navigation');
      return;
    }

    /* Find current chantier index */
    const currentUrl = window.location.pathname;
    const currentIndex = window.chantiersData.findIndex(chantier => chantier.url === currentUrl);
    
    if (currentIndex === -1) {
      /* If not on a chantier page, go to the last one */
      window.location.href = window.chantiersData[window.chantiersData.length - 1].url;
      return;
    }

    /* Navigate to previous chantier (wrap around to last if at beginning) */
    const previousIndex = currentIndex === 0 ? window.chantiersData.length - 1 : currentIndex - 1;
    window.location.href = window.chantiersData[previousIndex].url;
  }

  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (window.showNotification) {
          window.showNotification('Link copied to clipboard');
        }
      });
    } else {
      /* Fallback for older browsers */
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      if (window.showNotification) {
        window.showNotification('Link copied to clipboard');
      }
    }
  }

  restart() {
    /* Create overlay with accent color */
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--accent-color, #007acc);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
    `;
    document.body.appendChild(overlay);

    /* Fade in overlay */
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);

    /* Reload after 1 second */
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  }
}

/* Initialize context menu when DOM is loaded */
document.addEventListener('DOMContentLoaded', () => {
  new CustomContextMenu();
  
  /* Check if search should be activated after navigation */
  if (sessionStorage.getItem('activateSearch') === 'true') {
    sessionStorage.removeItem('activateSearch');
    /* Wait a bit for search to initialize */
    setTimeout(() => {
      if (window.chantierSearch) {
        window.chantierSearch.show();
      }
    }, 100);
  }
}); 