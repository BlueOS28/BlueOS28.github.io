/**
 * BlueOS Filesystem Manager
 * Handles file operations and directory structure
 */

class FileSystem {
  constructor() {
    this.files = new Map();
    this.directories = new Map();
  }

  createFile(path, content = '') {
    this.files.set(path, {
      path,
      content,
      created: new Date(),
      modified: new Date()
    });
  }

  readFile(path) {
    return this.files.get(path);
  }

  writeFile(path, content) {
    if (this.files.has(path)) {
      this.files.get(path).content = content;
      this.files.get(path).modified = new Date();
    }
  }

  deleteFile(path) {
    return this.files.delete(path);
  }

  createDirectory(path) {
    this.directories.set(path, { path, created: new Date() });
  }

  listFiles(dirPath) {
    return Array.from(this.files.values()).filter(f => f.path.startsWith(dirPath));
  }
}

module.exports = FileSystem;