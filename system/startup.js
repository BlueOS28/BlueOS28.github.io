/**
 * BlueOS Startup Handler
 * Manages system startup initialization
 */

class StartupHandler {
  constructor() {
    this.startupTasks = [];
    this.initialized = false;
  }

  registerTask(task) {
    this.startupTasks.push(task);
  }

  async execute() {
    console.log('[Startup] Executing startup tasks');
    for (const task of this.startupTasks) {
      try {
        await task();
      } catch (error) {
        console.error('[Startup] Task failed:', error);
      }
    }
    this.initialized = true;
  }
}

module.exports = StartupHandler;