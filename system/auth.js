/**
 * BlueOS Authentication Manager
 * Handles user authentication and tokens
 */

class AuthManager {
  constructor() {
    this.credentials = new Map();
    this.tokens = new Map();
    this.nextTokenId = 1;
  }

  registerUser(username, password) {
    this.credentials.set(username, {
      username,
      password: Buffer.from(password).toString('base64'),
      created: new Date()
    });
  }

  authenticate(username, password) {
    const user = this.credentials.get(username);
    if (!user) return null;
    
    const hashed = Buffer.from(password).toString('base64');
    if (user.password === hashed) {
      const token = this.nextTokenId++;
      this.tokens.set(token, { username, created: new Date() });
      return token;
    }
    return null;
  }

  validateToken(token) {
    return this.tokens.has(token);
  }

  revokeToken(token) {
    return this.tokens.delete(token);
  }
}

module.exports = AuthManager;