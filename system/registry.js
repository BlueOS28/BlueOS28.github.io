/**
 * BlueOS Registry
 * Central configuration and data registry
 */

class Registry {
  constructor() {
    this.entries = new Map();
  }

  set(key, value) {
    this.entries.set(key, value);
  }

  get(key) {
    return this.entries.get(key);
  }

  has(key) {
    return this.entries.has(key);
  }

  delete(key) {
    return this.entries.delete(key);
  }

  clear() {
    this.entries.clear();
  }
}

module.exports = Registry;