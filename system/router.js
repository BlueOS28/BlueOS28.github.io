/**
 * BlueOS Router
 * Manages application routing and navigation
 */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.history = [];
  }

  registerRoute(path, component, config = {}) {
    this.routes.set(path, { component, config });
  }

  navigate(path, params = {}) {
    const route = this.routes.get(path);
    if (!route) {
      console.error(`Route not found: ${path}`);
      return false;
    }
    
    this.currentRoute = { path, params, component: route.component };
    this.history.push(this.currentRoute);
    return true;
  }

  back() {
    if (this.history.length > 1) {
      this.history.pop();
      this.currentRoute = this.history[this.history.length - 1];
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

module.exports = Router;