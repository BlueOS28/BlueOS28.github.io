/**
 * BlueOS Shutdown Handler
 * Manages system shutdown sequence
 */

class ShutdownHandler {
  constructor() {
    this.shutdownTasks = [];
  }

  registerTask(task) {
    this.shutdownTasks.push(task);
  }

  async execute() {
    console.log('[Shutdown] Executing shutdown sequence');
    for (const task of this.shutdownTasks) {
      try {
        await task();
      } catch (error) {
        console.error('[Shutdown] Task failed:', error);
      }
    }
    console.log('[Shutdown] System shutdown complete');
  }
}

module.exports = ShutdownHandler;