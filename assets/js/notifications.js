/* Reusable notification system */

class NotificationSystem {
  constructor() {
    this.notifications = [];
    this.init();
  }

  init() {
    /* Create notification container */
    this.container = document.createElement('div');
    this.container.id = 'notificationContainer';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10001;
      pointer-events: none;
    `;
    document.body.appendChild(this.container);
  }

  show(message, options = {}) {
    const {
      duration = 2000,
      type = 'info',
      position = 'top-right'
    } = options;

    /* Create notification element */
    const notification = document.createElement('div');
    notification.style.cssText = `
      background: var(--accent-color);
      border: 1px solid black;
      padding: 12px 16px;
      font-size: 14px;
      margin-bottom: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      pointer-events: auto;
    `;
    notification.textContent = message;
    
    /* Add to container */
    this.container.appendChild(notification);
    this.notifications.push(notification);
    
    /* Animate in */
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    /* Remove after delay */
    setTimeout(() => {
      this.remove(notification);
    }, duration);
    
    return notification;
  }

  remove(notification) {
    if (!notification || !notification.parentNode) return;
    
    /* Animate out */
    notification.style.transform = 'translateX(100%)';
    
    /* Remove from DOM after animation */
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      
      /* Remove from notifications array */
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }, 300);
  }

  removeAll() {
    this.notifications.forEach(notification => {
      this.remove(notification);
    });
  }
}

/* Initialize notification system when DOM is loaded */
let notificationSystem;
document.addEventListener('DOMContentLoaded', () => {
  notificationSystem = new NotificationSystem();
  window.notifications = notificationSystem;
});

/* Convenience function for quick notifications */
window.showNotification = (message, options) => {
  if (window.notifications) {
    return window.notifications.show(message, options);
  }
};
