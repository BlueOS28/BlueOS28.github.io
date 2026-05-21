/**
 * BlueOS Permissions Manager
 * Manages access control and permissions
 */

class PermissionsManager {
  constructor() {
    this.permissions = new Map();
    this.roles = new Map();
  }

  createRole(name, permissions = []) {
    this.roles.set(name, {
      name,
      permissions: new Set(permissions)
    });
  }

  grantPermission(userId, permission) {
    if (!this.permissions.has(userId)) {
      this.permissions.set(userId, new Set());
    }
    this.permissions.get(userId).add(permission);
  }

  hasPermission(userId, permission) {
    const perms = this.permissions.get(userId);
    return perms ? perms.has(permission) : false;
  }

  revokePermission(userId, permission) {
    const perms = this.permissions.get(userId);
    if (perms) perms.delete(permission);
  }
}

module.exports = PermissionsManager;