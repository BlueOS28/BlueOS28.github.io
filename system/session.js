/**
 * BlueOS Session Manager
 * Manages user sessions and state
 */

class SessionManager {
  constructor() {
    this.sessions = new Map();
    this.nextSessionId = 1;
  }

  createSession(userId, options = {}) {
    const sessionId = this.nextSessionId++;
    const session = {
      id: sessionId,
      userId,
      created: new Date(),
      lastActivity: new Date(),
      data: {},
      ...options
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  getSession(sessionId) {
    return this.sessions.get(sessionId);
  }

  updateActivity(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session) session.lastActivity = new Date();
  }

  destroySession(sessionId) {
    return this.sessions.delete(sessionId);
  }
}

module.exports = SessionManager;