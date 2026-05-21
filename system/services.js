/**
 * BlueOS Services Manager
 * Manages system services and their lifecycle
 */

class ServicesManager {
  constructor() {
    this.services = new Map();
    this.running = new Set();
  }

  registerService(name, service) {
    this.services.set(name, service);
  }

  async startService(name) {
    const service = this.services.get(name);
    if (!service) throw new Error(`Service not found: ${name}`);
    
    await service.start?.();
    this.running.add(name);
  }

  async stopService(name) {
    const service = this.services.get(name);
    if (service) await service.stop?.();
    this.running.delete(name);
  }

  isRunning(name) {
    return this.running.has(name);
  }
}

module.exports = ServicesManager;