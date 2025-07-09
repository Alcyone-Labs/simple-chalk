import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('SimpleChalkBrowser', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
    // Clean up any added properties
    delete (globalThis as any).window;
    delete (globalThis as any).document;
    delete (globalThis as any).NO_COLOR;
  });

  describe('Node.js environment', () => {
    beforeEach(() => {
      // Ensure we're in Node.js environment
      delete (globalThis as any).window;
      delete (globalThis as any).document;
    });

    it('should return ANSI strings in Node.js when colors enabled', async () => {
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      const result = chalk.red('test');
      expect(typeof result).toBe('string');
      expect(result).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should return plain strings in Node.js when colors disabled', async () => {
      process.env.NO_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      const result = chalk.red('test');
      expect(typeof result).toBe('string');
      expect(result).toBe('test');
    });

    it('should handle combinations in Node.js', async () => {
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      const result = chalk.redBold('test');
      expect(typeof result).toBe('string');
      expect(result).toBe('\x1b[31m\x1b[1mtest\x1b[0m');
    });
  });

  describe('Browser environment', () => {
    beforeEach(() => {
      // Mock browser environment
      (globalThis as any).window = {};
      (globalThis as any).document = {};
    });

    it('should return CSS arrays in browser when colors enabled', async () => {
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      const result = chalk.red('test');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(['%ctest', 'color: #ff0000;']);
    });

    it('should return plain arrays in browser when colors disabled', async () => {
      (globalThis as any).NO_COLOR = true;
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      const result = chalk.red('test');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(['test']);
    });

    it('should handle combinations in browser', async () => {
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      const result = chalk.redBold('test');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(['%ctest', 'color: #ff0000; font-weight: bold;']);
    });

    it('should handle all colors in browser', async () => {
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      expect(chalk.black('test')).toEqual(['%ctest', 'color: #000000;']);
      expect(chalk.red('test')).toEqual(['%ctest', 'color: #ff0000;']);
      expect(chalk.green('test')).toEqual(['%ctest', 'color: #00ff00;']);
      expect(chalk.blue('test')).toEqual(['%ctest', 'color: #0000ff;']);
      expect(chalk.yellow('test')).toEqual(['%ctest', 'color: #ffff00;']);
      expect(chalk.magenta('test')).toEqual(['%ctest', 'color: #ff00ff;']);
      expect(chalk.cyan('test')).toEqual(['%ctest', 'color: #00ffff;']);
      expect(chalk.white('test')).toEqual(['%ctest', 'color: #ffffff;']);
      expect(chalk.gray('test')).toEqual(['%ctest', 'color: #808080;']);
      expect(chalk.grey('test')).toEqual(['%ctest', 'color: #808080;']);
      expect(chalk.blueBright('test')).toEqual(['%ctest', 'color: #00ffff;']);
    });

    it('should handle all modifiers in browser', async () => {
      const { default: chalk } = await import('./SimpleChalkBrowser');
      
      expect(chalk.bold('test')).toEqual(['%ctest', 'font-weight: bold;']);
      expect(chalk.dim('test')).toEqual(['%ctest', 'opacity: 0.5;']);
      expect(chalk.underline('test')).toEqual(['%ctest', 'text-decoration: underline;']);
    });
  });

  describe('Function call behavior', () => {
    it('should work as a function in Node.js', async () => {
      process.env.FORCE_COLOR = '1';
      delete (globalThis as any).window;
      delete (globalThis as any).document;
      
      const { default: chalk } = await import('./SimpleChalkBrowser');
      expect(chalk('test')).toBe('test');
    });

    it('should work as a function in browser', async () => {
      (globalThis as any).window = {};
      (globalThis as any).document = {};
      
      const { default: chalk } = await import('./SimpleChalkBrowser');
      expect(chalk('test')).toBe('test');
    });
  });

  describe('Environment variable handling', () => {
    beforeEach(() => {
      delete (globalThis as any).window;
      delete (globalThis as any).document;
    });

    it('should disable colors when NO_COLOR is set', async () => {
      process.env.NO_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkBrowser');
      expect(chalk.red('test')).toBe('test');
    });

    it('should disable colors when MCP_MODE is set', async () => {
      process.env.MCP_MODE = '1';
      const { default: chalk } = await import('./SimpleChalkBrowser');
      expect(chalk.red('test')).toBe('test');
    });

    it('should enable colors when FORCE_COLOR is set', async () => {
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkBrowser');
      expect(chalk.red('test')).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should prioritize NO_COLOR over FORCE_COLOR', async () => {
      process.env.NO_COLOR = '1';
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkBrowser');
      expect(chalk.red('test')).toBe('test');
    });
  });
});
