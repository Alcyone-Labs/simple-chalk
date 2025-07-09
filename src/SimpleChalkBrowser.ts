/**
 * Browser-optimized SimpleChalk implementation
 * Uses CSS styling for browsers, ANSI codes for Node.js
 */

// Check if we're in a browser environment
const isBrowser = typeof (globalThis as any).window !== 'undefined' && typeof (globalThis as any).document !== 'undefined';

// CSS styles for browser console
const browserStyles = {
  reset: '',
  bold: 'font-weight: bold;',
  dim: 'opacity: 0.5;',
  underline: 'text-decoration: underline;',
  
  black: 'color: #000000;',
  red: 'color: #ff0000;',
  green: 'color: #00ff00;',
  yellow: 'color: #ffff00;',
  blue: 'color: #0000ff;',
  magenta: 'color: #ff00ff;',
  cyan: 'color: #00ffff;',
  white: 'color: #ffffff;',
  gray: 'color: #808080;',
};

// ANSI codes for Node.js
const ansiCodes = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  underline: '\x1b[4m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

// Check if colors should be enabled (dynamic check)
function supportsColor(): boolean {
  if (isBrowser) {
    // In browsers, enable colors by default
    return !(globalThis as any).NO_COLOR;
  }

  // Node.js environment
  if (typeof process !== 'undefined') {
    if (process.env['NO_COLOR'] || process.env['MCP_MODE']) {
      return false;
    }
    if (process.env['FORCE_COLOR']) {
      return true;
    }
    if (process.stdout && process.stdout.isTTY) {
      return true;
    }
  }

  return false;
}

// Browser-specific formatter using CSS
function formatBrowser(styles: string[], text: string): any[] {
  if (!supportsColor() || styles.length === 0) {
    return [text];
  }

  const cssStyle = styles.join(' ');
  return [`%c${text}`, cssStyle];
}

// Node.js formatter using ANSI codes
function formatNode(codes: string[], text: string): string {
  if (!supportsColor() || codes.length === 0) {
    return text;
  }
  return codes.join('') + text + ansiCodes.reset;
}

// Universal formatter that works in both environments
function format(styleKey: keyof typeof browserStyles) {
  return (text: string) => {
    if (isBrowser) {
      return formatBrowser([browserStyles[styleKey]], text);
    } else {
      return formatNode([ansiCodes[styleKey]], text);
    }
  };
}

// Create the browser-optimized chalk object
const simpleChalkBrowser = {
  // Colors
  black: format('black'),
  red: format('red'),
  green: format('green'),
  yellow: format('yellow'),
  blue: format('blue'),
  magenta: format('magenta'),
  cyan: format('cyan'),
  white: format('white'),
  gray: format('gray'),
  grey: format('gray'), // alias
  blueBright: format('cyan'), // alias

  // Modifiers
  bold: format('bold'),
  dim: format('dim'),
  underline: format('underline'),

  // Browser-specific combinations (CSS can combine styles)
  redBold: (text: string) => {
    if (isBrowser) {
      return formatBrowser([browserStyles.red, browserStyles.bold], text);
    } else {
      return formatNode([ansiCodes.red, ansiCodes.bold], text);
    }
  },
  
  greenBold: (text: string) => {
    if (isBrowser) {
      return formatBrowser([browserStyles.green, browserStyles.bold], text);
    } else {
      return formatNode([ansiCodes.green, ansiCodes.bold], text);
    }
  },
  
  blueBold: (text: string) => {
    if (isBrowser) {
      return formatBrowser([browserStyles.blue, browserStyles.bold], text);
    } else {
      return formatNode([ansiCodes.blue, ansiCodes.bold], text);
    }
  },
} as const;

// Make it callable as a function
const callableChalk = Object.assign(
  (text: string) => text,
  simpleChalkBrowser
);

export default callableChalk;
