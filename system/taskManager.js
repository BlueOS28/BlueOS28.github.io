/**
 * BlueOS Task Manager
 * Manages system tasks and job scheduling
 */

class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.nextTaskId = 1;
  }

  createTask(name, callback, options = {}) {
    const id = this.nextTaskId++;
    const task = {
      id,
      name,
      callback,
      status: 'pending',
      ...options
    };
    this.tasks.set(id, task);
    return task;
  }

  async executeTask(id) {
    const task = this.tasks.get(id);
    if (!task) throw new Error(`Task not found: ${id}`);
    
    task.status = 'running';
    try {
      await task.callback();
      task.status = 'completed';
    } catch (error) {
      task.status = 'failed';
      task.error = error.message;
    }
  }

  listTasks() {
    return Array.from(this.tasks.values());
  }
}

module.exports = TaskManager;