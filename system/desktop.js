/**
 * BlueOS Desktop Environment
 * Manages desktop UI and user interface
 */

class Desktop {
  constructor() {
    this.widgets = new Map();
    this.applications = new Map();
    this.wallpaper = null;
  }

  addWidget(name, widget) {
    this.widgets.set(name, widget);
  }

  removeWidget(name) {
    return this.widgets.delete(name);
  }

  installApplication(name, app) {
    this.applications.set(name, app);
  }

  launchApplication(name) {
    const app = this.applications.get(name);
    if (!app) throw new Error(`Application not found: ${name}`);
    return app.launch?.();
  }

  setWallpaper(imageUrl) {
    this.wallpaper = imageUrl;
  }

  getWallpaper() {
    return this.wallpaper;
  }
}

module.exports = Desktop;