/**
 * BlueOS Network Manager
 * Handles network connections and communications
 */

class NetworkManager {
  constructor() {
    this.connections = new Map();
    this.interfaces = new Map();
  }

  createConnection(name, config) {
    const connection = {
      name,
      status: 'disconnected',
      ...config
    };
    this.connections.set(name, connection);
    return connection;
  }

  connect(name) {
    const conn = this.connections.get(name);
    if (conn) conn.status = 'connected';
  }

  disconnect(name) {
    const conn = this.connections.get(name);
    if (conn) conn.status = 'disconnected';
  }

  getStatus(name) {
    return this.connections.get(name)?.status;
  }
}

module.exports = NetworkManager;