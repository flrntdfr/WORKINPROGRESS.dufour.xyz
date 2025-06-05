document.addEventListener('DOMContentLoaded', () => {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Update cursor position
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add hover effect
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || 
        e.target.tagName === 'TEXTAREA') {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || 
        e.target.tagName === 'TEXTAREA') {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });
}); 