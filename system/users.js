/**
 * BlueOS User Management
 * Handles user accounts and profiles
 */

class UserManager {
  constructor() {
    this.users = new Map();
    this.currentUser = null;
  }

  createUser(username, profile = {}) {
    const user = {
      username,
      created: new Date(),
      ...profile
    };
    this.users.set(username, user);
    return user;
  }

  getUser(username) {
    return this.users.get(username);
  }

  setCurrentUser(username) {
    if (this.users.has(username)) {
      this.currentUser = username;
    }
  }

  getCurrentUser() {
    return this.currentUser ? this.users.get(this.currentUser) : null;
  }
}

module.exports = UserManager;