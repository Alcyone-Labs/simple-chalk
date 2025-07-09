/**
 * Simple chalk replacement for basic terminal colors
 * Provides the same API as chalk but without dynamic requires or complex dependencies
 * Perfect for bundling in autonomous builds
 */

// Type definitions for our chalk replacement
interface ChalkFunction {
  (text: string): string;
  bold: ChalkFunction;
  dim: ChalkFunction;
  underline: ChalkFunction;
  black: ChalkFunction;
  red: ChalkFunction;
  green: ChalkFunction;
  yellow: ChalkFunction;
  blue: ChalkFunction;
  magenta: ChalkFunction;
  cyan: ChalkFunction;
  white: ChalkFunction;
  gray: ChalkFunction;
  grey: ChalkFunction;
  blueBright: ChalkFunction;
}

// ANSI color codes
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const UNDERLINE = '\x1b[4m';

// Colors
const BLACK = '\x1b[30m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';
const GRAY = '\x1b[90m';

// Check if colors should be enabled
function supportsColor(): boolean {
  // Browser environment detection
  const isBrowser = typeof (globalThis as any).window !== 'undefined' && typeof (globalThis as any).document !== 'undefined';

  if (isBrowser) {
    // In browsers, enable colors by default (modern browsers support ANSI in console)
    // But respect NO_COLOR if somehow set in browser environment
    return !(globalThis as any).NO_COLOR;
  }

  // Node.js environment
  if (typeof process !== 'undefined') {
    // In MCP mode or when NO_COLOR is set, disable colors
    if (process.env['NO_COLOR'] || process.env['MCP_MODE']) {
      return false;
    }

    // Enable colors if FORCE_COLOR is set
    if (process.env['FORCE_COLOR']) {
      return true;
    }

    // Check if we're in a TTY
    if (process.stdout && process.stdout.isTTY) {
      return true;
    }
  }

  return false;
}

const colorEnabled = supportsColor();

function colorize(text: string, ...codes: string[]): string {
  if (!colorEnabled || codes.length === 0) {
    return text;
  }
  return codes.join('') + text + RESET;
}

// Helper function to add a property to a chalk function
function addChalkProperty(fn: ChalkFunction, name: string, code: string, codes: string[]): void {
  Object.defineProperty(fn, name, {
    get: () => createColorFunction([...codes, code]),
    configurable: true
  });
}

// Create a chainable color function
function createColorFunction(codes: string[]): ChalkFunction {
  const fn = ((text: string) => colorize(text, ...codes)) as ChalkFunction;

  // Add modifier properties
  addChalkProperty(fn, 'bold', BOLD, codes);
  addChalkProperty(fn, 'dim', DIM, codes);
  addChalkProperty(fn, 'underline', UNDERLINE, codes);

  // Add color properties
  addChalkProperty(fn, 'black', BLACK, codes);
  addChalkProperty(fn, 'red', RED, codes);
  addChalkProperty(fn, 'green', GREEN, codes);
  addChalkProperty(fn, 'yellow', YELLOW, codes);
  addChalkProperty(fn, 'blue', BLUE, codes);
  addChalkProperty(fn, 'magenta', MAGENTA, codes);
  addChalkProperty(fn, 'cyan', CYAN, codes);
  addChalkProperty(fn, 'white', WHITE, codes);
  addChalkProperty(fn, 'gray', GRAY, codes);
  addChalkProperty(fn, 'grey', GRAY, codes);
  addChalkProperty(fn, 'blueBright', CYAN, codes);

  return fn;
}

// Create the main chalk object
const simpleChalk: ChalkFunction = createColorFunction([]);

export default simpleChalk;
