import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('SimpleChalk', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    // Clear module cache to ensure fresh imports
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Basic functionality', () => {
    it('should return plain text when colors are disabled', async () => {
      process.env.NO_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red('test')).toBe('test');
    });

    it('should apply colors when enabled', async () => {
      delete process.env.NO_COLOR;
      delete process.env.MCP_MODE;
      process.env.FORCE_COLOR = '1';

      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red('test')).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should work as a function', async () => {
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk('test')).toBe('test');
    });
  });

  describe('Color functions', () => {
    beforeEach(() => {
      process.env.FORCE_COLOR = '1';
      delete process.env.NO_COLOR;
      delete process.env.MCP_MODE;
    });

    const colorTests = [
      { name: 'black', code: '\x1b[30m' },
      { name: 'red', code: '\x1b[31m' },
      { name: 'green', code: '\x1b[32m' },
      { name: 'yellow', code: '\x1b[33m' },
      { name: 'blue', code: '\x1b[34m' },
      { name: 'magenta', code: '\x1b[35m' },
      { name: 'cyan', code: '\x1b[36m' },
      { name: 'white', code: '\x1b[37m' },
      { name: 'gray', code: '\x1b[90m' },
      { name: 'grey', code: '\x1b[90m' },
      { name: 'blueBright', code: '\x1b[36m' },
    ];

    colorTests.forEach(({ name, code }) => {
      it(`should apply ${name} color`, async () => {
        const { default: chalk } = await import('./SimpleChalk');
        expect(chalk[name]('test')).toBe(`${code}test\x1b[0m`);
      });
    });
  });

  describe('Modifier functions', () => {
    beforeEach(() => {
      process.env.FORCE_COLOR = '1';
      delete process.env.NO_COLOR;
      delete process.env.MCP_MODE;
    });

    const modifierTests = [
      { name: 'bold', code: '\x1b[1m' },
      { name: 'dim', code: '\x1b[2m' },
      { name: 'underline', code: '\x1b[4m' },
    ];

    modifierTests.forEach(({ name, code }) => {
      it(`should apply ${name} modifier`, async () => {
        const { default: chalk } = await import('./SimpleChalk');
        expect(chalk[name]('test')).toBe(`${code}test\x1b[0m`);
      });
    });
  });

  describe('Chaining', () => {
    beforeEach(() => {
      process.env.FORCE_COLOR = '1';
      delete process.env.NO_COLOR;
      delete process.env.MCP_MODE;
    });

    it('should chain colors and modifiers', async () => {
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red.bold('test')).toBe('\x1b[31m\x1b[1mtest\x1b[0m');
    });

    it('should chain multiple modifiers', async () => {
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.bold.underline('test')).toBe('\x1b[1m\x1b[4mtest\x1b[0m');
    });

    it('should chain colors with multiple modifiers', async () => {
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.blue.bold.underline('test')).toBe('\x1b[34m\x1b[1m\x1b[4mtest\x1b[0m');
    });

    it('should work with complex chaining', async () => {
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red.bold.dim.underline('test')).toBe('\x1b[31m\x1b[1m\x1b[2m\x1b[4mtest\x1b[0m');
    });
  });

  describe('Environment variable handling', () => {
    it('should disable colors when NO_COLOR is set', async () => {
      process.env.NO_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red('test')).toBe('test');
    });

    it('should disable colors when MCP_MODE is set', async () => {
      process.env.MCP_MODE = '1';
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red('test')).toBe('test');
    });

    it('should enable colors when FORCE_COLOR is set', async () => {
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red('test')).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should prioritize NO_COLOR over FORCE_COLOR', async () => {
      process.env.NO_COLOR = '1';
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red('test')).toBe('test');
    });

    it('should prioritize MCP_MODE over FORCE_COLOR', async () => {
      process.env.MCP_MODE = '1';
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalk');
      expect(chalk.red('test')).toBe('test');
    });
  });
});
