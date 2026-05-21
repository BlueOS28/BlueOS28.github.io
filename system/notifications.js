/**
 * BlueOS Notifications Manager
 * Handles system notifications and alerts
 */

class NotificationsManager {
  constructor() {
    this.notifications = [];
    this.nextNotificationId = 1;
  }

  create(title, message, options = {}) {
    const notification = {
      id: this.nextNotificationId++,
      title,
      message,
      timestamp: new Date(),
      read: false,
      ...options
    };
    this.notifications.push(notification);
    return notification;
  }

  markAsRead(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
  }

  dismiss(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index > -1) this.notifications.splice(index, 1);
  }

  getUnread() {
    return this.notifications.filter(n => !n.read);
  }
}

module.exports = NotificationsManager;