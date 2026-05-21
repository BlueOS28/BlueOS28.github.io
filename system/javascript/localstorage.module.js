// localStorageModule.js

class LocalStorageModule {
  /**
   * Save data
   * @param {string} key
   * @param {*} value
   */
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[LocalStorage] Set Error (${key}):`, error);
      return false;
    }
  }

  /**
   * Get data
   * @param {string} key
   * @param {*} defaultValue
   * @returns {*}
   */
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);

      if (item === null) return defaultValue;

      return JSON.parse(item);
    } catch (error) {
      console.error(`[LocalStorage] Get Error (${key}):`, error);
      return defaultValue;
    }
  }

  /**
   * Update existing object data
   * @param {string} key
   * @param {object} newData
   */
  static update(key, newData) {
    try {
      const currentData = this.get(key, {});

      if (typeof currentData !== "object") {
        throw new Error("Stored data is not an object");
      }

      const updatedData = {
        ...currentData,
        ...newData,
      };

      this.set(key, updatedData);

      return updatedData;
    } catch (error) {
      console.error(`[LocalStorage] Update Error (${key}):`, error);
      return null;
    }
  }

  /**
   * Push item into array
   * @param {string} key
   * @param {*} value
   */
  static push(key, value) {
    try {
      const array = this.get(key, []);

      if (!Array.isArray(array)) {
        throw new Error("Stored data is not an array");
      }

      array.push(value);

      this.set(key, array);

      return array;
    } catch (error) {
      console.error(`[LocalStorage] Push Error (${key}):`, error);
      return null;
    }
  }

  /**
   * Remove item from array
   * @param {string} key
   * @param {Function} callback
   */
  static removeFromArray(key, callback) {
    try {
      const array = this.get(key, []);

      if (!Array.isArray(array)) {
        throw new Error("Stored data is not an array");
      }

      const filtered = array.filter((item, index) => !callback(item, index));

      this.set(key, filtered);

      return filtered;
    } catch (error) {
      console.error(`[LocalStorage] RemoveFromArray Error (${key}):`, error);
      return null;
    }
  }

  /**
   * Remove key
   * @param {string} key
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[LocalStorage] Remove Error (${key}):`, error);
      return false;
    }
  }

  /**
   * Check if key exists
   * @param {string} key
   * @returns {boolean}
   */
  static exists(key) {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Get all keys
   * @returns {string[]}
   */
  static keys() {
    return Object.keys(localStorage);
  }

  /**
   * Get storage size in KB
   * @returns {string}
   */
  static size() {
    let total = 0;

    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }

    return `${(total / 1024).toFixed(2)} KB`;
  }

  /**
   * Clear all localStorage
   */
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("[LocalStorage] Clear Error:", error);
      return false;
    }
  }
}

export default LocalStorageModule;
