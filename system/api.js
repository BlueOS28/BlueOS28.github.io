/**
 * BlueOS API Server
 * Manages REST API and external communication
 */

class APIServer {
  constructor() {
    this.routes = new Map();
    this.middleware = [];
  }

  registerRoute(method, path, handler) {
    const key = `${method}:${path}`;
    this.routes.set(key, handler);
  }

  use(middleware) {
    this.middleware.push(middleware);
  }

  async handleRequest(method, path, data = null) {
    const key = `${method}:${path}`;
    const handler = this.routes.get(key);
    
    if (!handler) {
      return { status: 404, error: 'Not Found' };
    }
    
    try {
      const result = await handler(data);
      return { status: 200, data: result };
    } catch (error) {
      return { status: 500, error: error.message };
    }
  }
}

module.exports = APIServer;