/**
 * BlueOS Theme Manager
 * Manages UI themes and visual styling
 */

class ThemeManager {
  constructor() {
    this.themes = new Map();
    this.currentTheme = 'default';
    this.initializeDefaultThemes();
  }

  initializeDefaultThemes() {
    this.themes.set('default', {
      name: 'default',
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745'
      }
    });
    this.themes.set('dark', {
      name: 'dark',
      colors: {
        primary: '#0d47a1',
        secondary: '#424242',
        success: '#1b5e20'
      }
    });
  }

  registerTheme(name, theme) {
    this.themes.set(name, theme);
  }

  setTheme(name) {
    if (this.themes.has(name)) {
      this.currentTheme = name;
    }
  }

  getTheme(name) {
    return this.themes.get(name ?? this.currentTheme);
  }
}

module.exports = ThemeManager;