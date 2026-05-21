/**
 * BlueOS Kernel
 * Core system initialization and management
 */

class Kernel {
  constructor() {
    this.modules = new Map();
    this.initialized = false;
    this.version = '28.0.0';
  }

  init() {
    console.log(`[Kernel] Initializing BlueOS ${this.version}`);
    this.initialized = true;
  }

  registerModule(name, module) {
    this.modules.set(name, module);
  }

  getModule(name) {
    return this.modules.get(name);
  }
}

module.exports = Kernel;