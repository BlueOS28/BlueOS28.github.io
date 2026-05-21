/**
 * BlueOS Storage Manager
 * Manages persistent data storage
 */

class StorageManager {
  constructor() {
    this.storage = new Map();
    this.maxSize = 1024 * 1024 * 100; // 100MB
    this.currentSize = 0;
  }

  setItem(key, value) {
    const itemSize = JSON.stringify(value).length;
    if (this.currentSize + itemSize > this.maxSize) {
      throw new Error('Storage quota exceeded');
    }
    this.storage.set(key, value);
    this.currentSize += itemSize;
  }

  getItem(key) {
    return this.storage.get(key);
  }

  removeItem(key) {
    const value = this.storage.get(key);
    if (value) {
      this.currentSize -= JSON.stringify(value).length;
      this.storage.delete(key);
    }
  }

  clear() {
    this.storage.clear();
    this.currentSize = 0;
  }

  getUsage() {
    return { current: this.currentSize, max: this.maxSize };
  }
}

module.exports = StorageManager;