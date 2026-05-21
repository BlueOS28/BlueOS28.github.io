/**
 * BlueOS Shell
 * Command-line interface and shell execution
 */

class Shell {
  constructor() {
    this.commands = new Map();
    this.history = [];
    this.aliases = new Map();
  }

  registerCommand(name, handler) {
    this.commands.set(name, handler);
  }

  createAlias(alias, command) {
    this.aliases.set(alias, command);
  }

  async execute(input) {
    this.history.push(input);
    const [command, ...args] = input.trim().split(' ');
    
    const actualCommand = this.aliases.get(command) || command;
    const handler = this.commands.get(actualCommand);
    
    if (!handler) {
      return { error: `Command not found: ${command}` };
    }
    
    try {
      const result = await handler(...args);
      return { output: result };
    } catch (error) {
      return { error: error.message };
    }
  }

  getHistory() {
    return this.history;
  }
}

module.exports = Shell;