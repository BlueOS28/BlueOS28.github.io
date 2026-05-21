/**
 * BlueOS Cache Manager
 * Manages data caching and performance optimization
 */

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.ttls = new Map();
  }

  set(key, value, ttl = null) {
    this.cache.set(key, value);
    if (ttl) {
      this.ttls.set(key, Date.now() + ttl);
    }
  }

  get(key) {
    const expiry = this.ttls.get(key);
    if (expiry && Date.now() > expiry) {
      this.cache.delete(key);
      this.ttls.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    this.ttls.delete(key);
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
    this.ttls.clear();
  }
}

module.exports = CacheManager;