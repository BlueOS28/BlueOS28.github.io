/**
 * File Explorer - File browsing application
 * Provides UI for navigating the virtual filesystem
 */

class FileExplorer {
  constructor(kernel) {
    this.kernel = kernel;
    this.currentPath = '/home';
    this.selectedFile = null;
  }

  /**
   * Initialize file explorer
   */
  async initialize() {
    return true;
  }

  /**
   * Render file explorer UI
   */
  render(container) {
    const explorer = document.createElement('div');
    explorer.style.cssText = `
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    `;

    // Address bar
    const addressBar = this.createAddressBar();
    explorer.appendChild(addressBar);

    // File list
    const fileList = this.createFileList();
    explorer.appendChild(fileList);

    container.appendChild(explorer);
  }

  /**
   * Create address bar
   */
  createAddressBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `
      display: flex;
      gap: 10px;
      padding: 10px;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
      align-items: center;
    `;

    const backBtn = document.createElement('button');
    backBtn.textContent = '← Back';
    backBtn.style.cssText = `
      padding: 6px 12px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    `;
    backBtn.addEventListener('click', () => this.goBack());
    bar.appendChild(backBtn);

    const pathInput = document.createElement('input');
    pathInput.type = 'text';
    pathInput.value = this.currentPath;
    pathInput.style.cssText = `
      flex: 1;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
    `;
    pathInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.navigateTo(pathInput.value);
      }
    });
    bar.appendChild(pathInput);

    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = '🔄 Refresh';
    refreshBtn.style.cssText = `
      padding: 6px 12px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    `;
    refreshBtn.addEventListener('click', () => this.refresh());
    bar.appendChild(refreshBtn);

    return bar;
  }

  /**
   * Create file list
   */
  createFileList() {
    const listContainer = document.createElement('div');
    listContainer.id = 'file-list';
    listContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    `;

    const files = this.kernel.fileSystem.listDirectory(this.currentPath);
    if (files) {
      for (const file of files) {
        const fileItem = this.createFileItem(file);
        listContainer.appendChild(fileItem);
      }
    }

    return listContainer;
  }

  /**
   * Create file item
   */
  createFileItem(file) {
    const item = document.createElement('div');
    item.style.cssText = `
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 5px;
      background: #f9f9f9;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 0.2s;
    `;

    const icon = document.createElement('div');
    icon.style.cssText = `
      font-size: 20px;
      margin-right: 10px;
    `;
    icon.textContent = file.type === 'directory' ? '📁' : '📄';

    const info = document.createElement('div');
    info.style.cssText = `
      flex: 1;
    `;

    const name = document.createElement('div');
    name.textContent = file.name;
    name.style.cssText = 'font-weight: bold;';
    info.appendChild(name);

    const details = document.createElement('div');
    details.style.cssText = 'font-size: 12px; color: #999;';
    details.textContent = `${file.size} bytes • ${file.createdAt}`;
    info.appendChild(details);

    item.appendChild(icon);
    item.appendChild(info);

    item.addEventListener('mouseenter', () => {
      item.style.background = '#e8e8e8';
      item.style.borderColor = '#ddd';
    });

    item.addEventListener('mouseleave', () => {
      item.style.background = '#f9f9f9';
      item.style.borderColor = 'transparent';
    });

    item.addEventListener('dblclick', () => {
      if (file.type === 'directory') {
        this.navigateTo(`${this.currentPath}/${file.name}`);
      }
    });

    return item;
  }

  /**
   * Navigate to path
   */
  navigateTo(path) {
    if (this.kernel.fileSystem.exists(path)) {
      this.currentPath = path;
      this.refresh();
    } else {
      alert('Path does not exist');
    }
  }

  /**
   * Go back
   */
  goBack() {
    const parts = this.currentPath.split('/').filter(p => p);
    if (parts.length > 0) {
      parts.pop();
      this.currentPath = '/' + parts.join('/') || '/';
      this.refresh();
    }
  }

  /**
   * Refresh file list
   */
  refresh() {
    const listContainer = document.getElementById('file-list');
    if (listContainer) {
      listContainer.innerHTML = '';
      const files = this.kernel.fileSystem.listDirectory(this.currentPath);
      if (files) {
        for (const file of files) {
          const fileItem = this.createFileItem(file);
          listContainer.appendChild(fileItem);
        }
      }
    }
  }
}

export { FileExplorer };
