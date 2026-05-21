/**
 * BlueOS Logger
 * Handles system logging and debugging
 */

class Logger {
  constructor() {
    this.logs = [];
    this.level = 'info';
    this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
  }

  log(level, message, data = null) {
    if (this.levels[level] >= this.levels[this.level]) {
      const entry = {
        timestamp: new Date(),
        level,
        message,
        data
      };
      this.logs.push(entry);
      console.log(`[${level.toUpperCase()}] ${message}`, data || '');
    }
  }

  debug(message, data) { this.log('debug', message, data); }
  info(message, data) { this.log('info', message, data); }
  warn(message, data) { this.log('warn', message, data); }
  error(message, data) { this.log('error', message, data); }

  getLogs() {
    return this.logs;
  }
}

module.exports = Logger;