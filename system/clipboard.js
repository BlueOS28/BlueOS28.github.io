/**
 * BlueOS Clipboard Manager
 * Manages copy/paste and clipboard operations
 */

class ClipboardManager {
  constructor() {
    this.clipboard = null;
    this.history = [];
    this.maxHistory = 50;
  }

  copy(data) {
    this.clipboard = data;
    this.history.unshift({
      data,
      timestamp: new Date(),
      type: typeof data
    });
    
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }
  }

  paste() {
    return this.clipboard;
  }

  getHistory() {
    return this.history;
  }

  clearClipboard() {
    this.clipboard = null;
  }

  clearHistory() {
    this.history = [];
  }
}

module.exports = ClipboardManager;