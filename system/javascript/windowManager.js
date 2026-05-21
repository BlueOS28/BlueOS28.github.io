/**
 * Window Manager - Manages application windows
 * Handles window creation, positioning, focus, and z-index
 */

class Window {
  constructor(id, title, app, options = {}) {
    this.id = id;
    this.title = title;
    this.app = app;
    this.options = {
      width: options.width || 800,
      height: options.height || 600,
      x: options.x || 100,
      y: options.y || 100,
      resizable: options.resizable !== false,
      minimizable: options.minimizable !== false,
      maximizable: options.maximizable !== false,
      closable: options.closable !== false,
      ...options
    };

    this.state = 'normal'; // normal, minimized, maximized
    this.isDragging = false;
    this.isResizing = false;
    this.isFocused = false;
    this.element = null;
    this.eventListeners = {};
    this.createdAt = Date.now();
  }

  /**
   * Focus the window
   */
  focus() {
    this.isFocused = true;
    if (this.element) {
      this.element.classList.add('focused');
    }
    this.emit('focused', this);
  }

  /**
   * Blur the window
   */
  blur() {
    this.isFocused = false;
    if (this.element) {
      this.element.classList.remove('focused');
    }
    this.emit('blurred', this);
  }

  /**
   * Minimize the window
   */
  minimize() {
    if (!this.options.minimizable) return false;
    this.state = 'minimized';
    if (this.element) {
      this.element.style.display = 'none';
    }
    this.emit('minimized', this);
    return true;
  }

  /**
   * Maximize the window
   */
  maximize() {
    if (!this.options.maximizable) return false;
    this.state = 'maximized';
    this.options.prevWidth = this.options.width;
    this.options.prevHeight = this.options.height;
    this.options.prevX = this.options.x;
    this.options.prevY = this.options.y;

    this.options.width = window.innerWidth;
    this.options.height = window.innerHeight - 40;
    this.options.x = 0;
    this.options.y = 0;

    if (this.element) {
      this.updatePosition();
    }
    this.emit('maximized', this);
    return true;
  }

  /**
   * Restore the window
   */
  restore() {
    this.state = 'normal';
    
    if (this.options.prevWidth) {
      this.options.width = this.options.prevWidth;
      this.options.height = this.options.prevHeight;
      this.options.x = this.options.prevX;
      this.options.y = this.options.prevY;
    }

    if (this.element) {
      this.element.style.display = 'block';
      this.updatePosition();
    }
    this.emit('restored', this);
    return true;
  }

  /**
   * Close the window
   */
  close() {
    if (!this.options.closable) return false;
    this.emit('closed', this);
    return true;
  }

  /**
   * Update position on screen
   */
  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.options.x}px`;
      this.element.style.top = `${this.options.y}px`;
      this.element.style.width = `${this.options.width}px`;
      this.element.style.height = `${this.options.height}px`;
    }
  }

  /**
   * Set z-index
   */
  setZIndex(zIndex) {
    if (this.element) {
      this.element.style.zIndex = zIndex;
    }
  }

  /**
   * Listen for window events
   */
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  /**
   * Emit window event
   */
  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  /**
   * Get window info
   */
  getInfo() {
    return {
      id: this.id,
      title: this.title,
      state: this.state,
      isFocused: this.isFocused,
      position: {
        x: this.options.x,
        y: this.options.y,
        width: this.options.width,
        height: this.options.height
      },
      createdAt: this.createdAt
    };
  }
}

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.focusedWindow = null;
    this.nextWindowId = 1;
    this.nextZIndex = 1000;
    this.eventListeners = {};
    this.container = null;
  }

  /**
   * Initialize window manager
   */
  async initialize() {
    // Create windows container
    this.container = document.createElement('div');
    this.container.id = 'window-container';
    this.container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `;
    document.body.appendChild(this.container);
    return true;
  }

  /**
   * Create a new window
   */
  createWindow(app, title = null, options = {}) {
    const windowId = this.nextWindowId++;
    const windowTitle = title || app.name || `Window ${windowId}`;

    const window = new Window(windowId, windowTitle, app, options);

    // Render window UI
    const windowElement = this.renderWindowUI(window);
    window.element = windowElement;
    this.container.appendChild(windowElement);

    // Store window
    this.windows.set(windowId, window);

    // Set up window event listeners
    this.setupWindowListeners(window);

    // Focus the new window
    this.focusWindow(windowId);

    this.emit('window-created', window);
    return window;
  }

  /**
   * Render window UI
   */
  renderWindowUI(window) {
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.dataset.windowId = window.id;
    windowElement.style.cssText = `
      position: absolute;
      left: ${window.options.x}px;
      top: ${window.options.y}px;
      width: ${window.options.width}px;
      height: ${window.options.height}px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      z-index: ${this.nextZIndex++};
      user-select: none;
    `;

    // Title bar
    const titleBar = document.createElement('div');
    titleBar.className = 'window-title-bar';
    titleBar.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 10px;
      border-radius: 8px 8px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      cursor: move;
      font-weight: bold;
    `;

    const titleText = document.createElement('span');
    titleText.textContent = window.title;
    titleBar.appendChild(titleText);

    // Control buttons
    const controlsContainer = document.createElement('div');
    controlsContainer.style.cssText = `
      display: flex;
      gap: 5px;
    `;

    if (window.options.minimizable) {
      const minBtn = document.createElement('button');
      minBtn.textContent = '_';
      minBtn.style.cssText = `
        background: rgba(255,255,255,0.3);
        border: none;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 3px;
        cursor: pointer;
        font-weight: bold;
      `;
      minBtn.onclick = () => window.minimize();
      controlsContainer.appendChild(minBtn);
    }

    if (window.options.maximizable) {
      const maxBtn = document.createElement('button');
      maxBtn.textContent = '□';
      maxBtn.style.cssText = `
        background: rgba(255,255,255,0.3);
        border: none;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 3px;
        cursor: pointer;
        font-weight: bold;
      `;
      maxBtn.onclick = () => {
        if (window.state === 'maximized') {
          window.restore();
        } else {
          window.maximize();
        }
        window.updatePosition();
      };
      controlsContainer.appendChild(maxBtn);
    }

    if (window.options.closable) {
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = `
        background: rgba(255,255,255,0.3);
        border: none;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 3px;
        cursor: pointer;
        font-weight: bold;
      `;
      closeBtn.onclick = () => this.closeWindow(window.id);
      controlsContainer.appendChild(closeBtn);
    }

    titleBar.appendChild(controlsContainer);
    windowElement.appendChild(titleBar);

    // Content area
    const contentArea = document.createElement('div');
    contentArea.className = 'window-content';
    contentArea.style.cssText = `
      flex: 1;
      overflow: auto;
      padding: 10px;
      background: white;
    `;

    if (window.app && window.app.render) {
      window.app.render(contentArea);
    }

    windowElement.appendChild(contentArea);

    // Make window draggable
    this.makeWindowDraggable(window, windowElement, titleBar);

    // Make window resizable
    if (window.options.resizable) {
      this.makeWindowResizable(window, windowElement);
    }

    return windowElement;
  }

  /**
   * Make window draggable
   */
  makeWindowDraggable(window, windowElement, titleBar) {
    let offset = { x: 0, y: 0 };

    titleBar.addEventListener('mousedown', (e) => {
      offset.x = e.clientX - window.options.x;
      offset.y = e.clientY - window.options.y;
      window.isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
      if (window.isDragging && window.state === 'normal') {
        window.options.x = e.clientX - offset.x;
        window.options.y = e.clientY - offset.y;
        window.updatePosition();
      }
    });

    document.addEventListener('mouseup', () => {
      window.isDragging = false;
    });
  }

  /**
   * Make window resizable
   */
  makeWindowResizable(window, windowElement) {
    const resizeHandle = document.createElement('div');
    resizeHandle.style.cssText = `
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      background: linear-gradient(135deg, transparent 0%, #667eea 100%);
      border-radius: 0 0 8px 0;
    `;
    windowElement.appendChild(resizeHandle);

    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = window.options.width;
      startHeight = window.options.height;
      window.isResizing = true;
    });

    document.addEventListener('mousemove', (e) => {
      if (window.isResizing) {
        window.options.width = startWidth + (e.clientX - startX);
        window.options.height = startHeight + (e.clientY - startY);
        window.updatePosition();
      }
    });

    document.addEventListener('mouseup', () => {
      window.isResizing = false;
    });
  }

  /**
   * Setup window event listeners
   */
  setupWindowListeners(window) {
    window.element.addEventListener('mousedown', () => {
      this.focusWindow(window.id);
    });
  }

  /**
   * Focus a window
   */
  focusWindow(windowId) {
    if (this.focusedWindow && this.focusedWindow.id !== windowId) {
      this.focusedWindow.blur();
    }

    const window = this.windows.get(windowId);
    if (window) {
      window.focus();
      window.setZIndex(this.nextZIndex++);
      this.focusedWindow = window;
      this.emit('window-focused', window);
    }
  }

  /**
   * Get a window
   */
  getWindow(windowId) {
    return this.windows.get(windowId);
  }

  /**
   * Close a window
   */
  closeWindow(windowId) {
    const window = this.windows.get(windowId);
    if (window) {
      if (window.close()) {
        window.element?.remove();
        this.windows.delete(windowId);
        
        if (this.focusedWindow === window) {
          this.focusedWindow = null;
        }

        this.emit('window-closed', window);
      }
    }
  }

  /**
   * Close all windows
   */
  closeAllWindows() {
    const windowIds = Array.from(this.windows.keys());
    for (const windowId of windowIds) {
      this.closeWindow(windowId);
    }
  }

  /**
   * Get all windows
   */
  getAllWindows() {
    return Array.from(this.windows.values());
  }

  /**
   * Listen for window manager events
   */
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  /**
   * Emit window manager event
   */
  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }
}

export { WindowManager, Window };
