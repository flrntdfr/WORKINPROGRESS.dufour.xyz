---
layout: chantier
hidden: true
permalink: /random
title: Random
started: 2025-12-12 13:55
ended: 2025-12-12 13:55
result: [web]
description: |
    Loads a random project.
---

Loading a random project...

<script>
  (function() {
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
    window.location.replace(randomChantier.url);
  })();
</script>