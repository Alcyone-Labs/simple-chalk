/**
 * Fast SimpleChalk implementation - no chaining, maximum performance
 * Similar to picocolors approach
 */

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

// Simple formatter function
const format = (code: string) => colorEnabled 
  ? (text: string) => code + text + RESET
  : (text: string) => text;

// Pre-created functions - no dynamic creation
const simpleChalkFast = {
  // Colors
  black: format(BLACK),
  red: format(RED),
  green: format(GREEN),
  yellow: format(YELLOW),
  blue: format(BLUE),
  magenta: format(MAGENTA),
  cyan: format(CYAN),
  white: format(WHITE),
  gray: format(GRAY),
  grey: format(GRAY), // alias
  blueBright: format(CYAN), // alias

  // Modifiers
  bold: format(BOLD),
  dim: format(DIM),
  underline: format(UNDERLINE),

  // Pre-created common combinations for some chaining support
  redBold: format(RED + BOLD),
  greenBold: format(GREEN + BOLD),
  blueBold: format(BLUE + BOLD),
  yellowBold: format(YELLOW + BOLD),

  redUnderline: format(RED + UNDERLINE),
  greenUnderline: format(GREEN + UNDERLINE),
  blueUnderline: format(BLUE + UNDERLINE),

  boldRed: format(BOLD + RED),
  boldGreen: format(BOLD + GREEN),
  boldBlue: format(BOLD + BLUE),
  boldYellow: format(BOLD + YELLOW),
} as const;

// Make it callable as a function
const callableChalk = Object.assign(
  (text: string) => text,
  simpleChalkFast
);

export default callableChalk;
