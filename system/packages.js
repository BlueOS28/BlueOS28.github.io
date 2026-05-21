/**
 * BlueOS Package Manager
 * Handles package installation and management
 */

class PackageManager {
  constructor() {
    this.packages = new Map();
    this.registry = new Map();
  }

  registerPackage(name, version, metadata = {}) {
    const key = `${name}@${version}`;
    this.registry.set(key, metadata);
  }

  install(name, version) {
    const key = `${name}@${version}`;
    const metadata = this.registry.get(key);
    
    if (!metadata) {
      throw new Error(`Package not found: ${key}`);
    }
    
    this.packages.set(name, {
      name,
      version,
      installed: new Date(),
      ...metadata
    });
  }

  uninstall(name) {
    return this.packages.delete(name);
  }

  getInstalledPackages() {
    return Array.from(this.packages.values());
  }
}

module.exports = PackageManager;