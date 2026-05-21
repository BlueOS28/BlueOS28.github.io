/**
 * BlueOS Boot Manager
 * Handles system startup sequence
 */

class BootManager {
  constructor() {
    this.bootSequence = [];
    this.bootTime = null;
  }

  addToBootSequence(task) {
    this.bootSequence.push(task);
  }

  async boot() {
    this.bootTime = Date.now();
    console.log('[Boot] Starting BlueOS boot sequence');
    
    for (const task of this.bootSequence) {
      await task();
    }
    
    const elapsed = Date.now() - this.bootTime;
    console.log(`[Boot] Boot completed in ${elapsed}ms`);
  }
}

module.exports = BootManager;