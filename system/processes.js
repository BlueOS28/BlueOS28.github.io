/**
 * BlueOS Process Manager
 * Manages running processes and their lifecycle
 */

class ProcessManager {
  constructor() {
    this.processes = new Map();
    this.nextPID = 1000;
  }

  spawn(name, options = {}) {
    const pid = this.nextPID++;
    const process = {
      pid,
      name,
      created: new Date(),
      ...options
    };
    this.processes.set(pid, process);
    return process;
  }

  getProcess(pid) {
    return this.processes.get(pid);
  }

  kill(pid) {
    return this.processes.delete(pid);
  }

  list() {
    return Array.from(this.processes.values());
  }
}

module.exports = ProcessManager;