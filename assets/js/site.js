document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[alt]:not([title])').forEach(img => {
      if (img.alt) img.title = img.alt;
    });
});