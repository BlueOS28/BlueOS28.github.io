/**
 * BlueOS Security Manager
 * Handles security policies and threat management
 */

class SecurityManager {
  constructor() {
    this.policies = new Map();
    this.threats = [];
  }

  setPolicy(name, policy) {
    this.policies.set(name, policy);
  }

  getPolicy(name) {
    return this.policies.get(name);
  }

  reportThreat(level, message) {
    this.threats.push({
      timestamp: new Date(),
      level,
      message
    });
  }

  getThreatLog() {
    return this.threats;
  }
}

module.exports = SecurityManager;