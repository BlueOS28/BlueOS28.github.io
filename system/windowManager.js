/**
 * BlueOS Window Manager
 * Manages application windows and UI elements
 */

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.nextWindowId = 1;
    this.focusedWindow = null;
  }

  createWindow(title, options = {}) {
    const id = this.nextWindowId++;
    const window = {
      id,
      title,
      visible: true,
      ...options
    };
    this.windows.set(id, window);
    return window;
  }

  closeWindow(id) {
    return this.windows.delete(id);
  }

  focusWindow(id) {
    this.focusedWindow = id;
  }

  getFocusedWindow() {
    return this.windows.get(this.focusedWindow);
  }

  listWindows() {
    return Array.from(this.windows.values());
  }
}

module.exports = WindowManager;