import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('SimpleChalkFast', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Basic functionality', () => {
    it('should return plain text when colors are disabled', async () => {
      process.env.NO_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkFast');
      expect(chalk.red('test')).toBe('test');
    });

    it('should apply colors when enabled', async () => {
      delete process.env.NO_COLOR;
      delete process.env.MCP_MODE;
      process.env.FORCE_COLOR = '1';
      
      const { default: chalk } = await import('./SimpleChalkFast');
      expect(chalk.red('test')).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should work as a function', async () => {
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkFast');
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
        const { default: chalk } = await import('./SimpleChalkFast');
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
        const { default: chalk } = await import('./SimpleChalkFast');
        expect(chalk[name]('test')).toBe(`${code}test\x1b[0m`);
      });
    });
  });

  describe('Pre-created combinations', () => {
    beforeEach(() => {
      process.env.FORCE_COLOR = '1';
      delete process.env.NO_COLOR;
      delete process.env.MCP_MODE;
    });

    const combinationTests = [
      { name: 'redBold', codes: '\x1b[31m\x1b[1m' },
      { name: 'greenBold', codes: '\x1b[32m\x1b[1m' },
      { name: 'blueBold', codes: '\x1b[34m\x1b[1m' },
      { name: 'yellowBold', codes: '\x1b[33m\x1b[1m' },
      { name: 'redUnderline', codes: '\x1b[31m\x1b[4m' },
      { name: 'greenUnderline', codes: '\x1b[32m\x1b[4m' },
      { name: 'blueUnderline', codes: '\x1b[34m\x1b[4m' },
      { name: 'boldRed', codes: '\x1b[1m\x1b[31m' },
      { name: 'boldGreen', codes: '\x1b[1m\x1b[32m' },
      { name: 'boldBlue', codes: '\x1b[1m\x1b[34m' },
      { name: 'boldYellow', codes: '\x1b[1m\x1b[33m' },
    ];

    combinationTests.forEach(({ name, codes }) => {
      it(`should apply ${name} combination`, async () => {
        const { default: chalk } = await import('./SimpleChalkFast');
        expect(chalk[name]('test')).toBe(`${codes}test\x1b[0m`);
      });
    });
  });

  describe('No chaining support', () => {
    beforeEach(() => {
      process.env.FORCE_COLOR = '1';
      delete process.env.NO_COLOR;
      delete process.env.MCP_MODE;
    });

    it('should not support dynamic chaining', async () => {
      const { default: chalk } = await import('./SimpleChalkFast');
      
      // These should be undefined since chaining is not supported
      expect(chalk.red.bold).toBeUndefined();
      expect(chalk.blue.underline).toBeUndefined();
    });
  });

  describe('Environment variable handling', () => {
    it('should disable colors when NO_COLOR is set', async () => {
      process.env.NO_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkFast');
      expect(chalk.red('test')).toBe('test');
    });

    it('should disable colors when MCP_MODE is set', async () => {
      process.env.MCP_MODE = '1';
      const { default: chalk } = await import('./SimpleChalkFast');
      expect(chalk.red('test')).toBe('test');
    });

    it('should enable colors when FORCE_COLOR is set', async () => {
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkFast');
      expect(chalk.red('test')).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should prioritize NO_COLOR over FORCE_COLOR', async () => {
      process.env.NO_COLOR = '1';
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkFast');
      expect(chalk.red('test')).toBe('test');
    });

    it('should prioritize MCP_MODE over FORCE_COLOR', async () => {
      process.env.MCP_MODE = '1';
      process.env.FORCE_COLOR = '1';
      const { default: chalk } = await import('./SimpleChalkFast');
      expect(chalk.red('test')).toBe('test');
    });
  });
});
