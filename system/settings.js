/**
 * BlueOS Settings Manager
 * Manages system configuration and preferences
 */

class SettingsManager {
  constructor() {
    this.settings = new Map();
    this.defaults = new Map();
  }

  setDefault(key, value) {
    this.defaults.set(key, value);
    if (!this.settings.has(key)) {
      this.settings.set(key, value);
    }
  }

  set(key, value) {
    this.settings.set(key, value);
  }

  get(key) {
    return this.settings.get(key) ?? this.defaults.get(key);
  }

  getAll() {
    return Object.fromEntries(this.settings);
  }

  reset(key) {
    if (this.defaults.has(key)) {
      this.settings.set(key, this.defaults.get(key));
    }
  }
}

module.exports = SettingsManager;