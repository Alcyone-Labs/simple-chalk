# SimpleChalk

A bundling-friendly, drop-in replacement for Chalk with basic terminal coloring features.

## Overview

SimpleChalk is a lightweight, zero-dependency alternative to the popular `chalk` library, designed for simplicity and performance. It provides a clean, familiar API for terminal colors while being incredibly fast and bundle-friendly. Perfect for CLI tools, logging libraries, and any application that needs reliable terminal coloring.

### Simple and Powerful

```typescript
// Clean, familiar API
import chalk from '@alcyone-labs/simple-chalk';
console.log(chalk.red.bold('Error message'));

// Or choose the fastest option
import { fast } from '@alcyone-labs/simple-chalk';
console.log(fast.redBold('Lightning fast!'));

// Perfect for browsers too
import { browser } from '@alcyone-labs/simple-chalk';
console.log(...browser.red('Works everywhere!'));
```

## Installation

```bash
npm install @alcyone-labs/simple-chalk
```

```bash
pnpm add @alcyone-labs/simple-chalk
```

```bash
yarn add @alcyone-labs/simple-chalk
```

## Import Options

SimpleChalk provides multiple ways to import based on your needs:

### Default Import (Full Chalk Compatibility)
```typescript
import chalk from '@alcyone-labs/simple-chalk';

// Full chaining support
console.log(chalk.red.bold.underline('Fully compatible with Chalk'));
```

### Fast Version (Maximum Performance)
```typescript
// Option 1: Named import
import { fast } from '@alcyone-labs/simple-chalk';
console.log(fast.redBold('140x faster than default'));

// Option 2: Direct import
import chalk from '@alcyone-labs/simple-chalk/fast';
console.log(chalk.redBold('Same performance, direct import'));
```

### Browser Support

SimpleChalk provides **three approaches** for browser compatibility:

#### Option 1: ANSI Codes (Chrome 69+)
```html
<script type="module">
import chalk from '@alcyone-labs/simple-chalk';
console.log(chalk.red('May show raw ANSI codes'));
</script>
```

#### Option 2: CSS-Based (Recommended for Browsers)
```html
<script type="module">
import chalk from '@alcyone-labs/simple-chalk/browser';
console.log(...chalk.red('Proper colors using CSS'));
console.log(...chalk.bold('Bold text using CSS'));
</script>
```

#### Option 3: Named Import
```typescript
import { browser } from '@alcyone-labs/simple-chalk';
console.log(...browser.red('CSS-based colors'));
```

**Note**: The browser version returns `[text, cssStyle]` arrays, so use the spread operator (`...`) when logging.

## Understanding ANSI Escape Codes

ANSI escape codes are special character sequences that control text formatting:

- `[31m` = Start red text
- `[1m` = Start bold text
- `[0m` = Reset all formatting

So `[31mHello[0m` should display as red "Hello". While Chalk documentation mentions Chrome 69+ supports ANSI codes, this support is **inconsistent** across browsers and contexts.

### The Problem
```javascript
// This might show raw codes: [31mRed text[0m
console.log(chalk.red('Red text'));
```

### The Solution
```javascript
// This shows actual red text in browsers
console.log(...chalk.red('Red text'));
```

The browser-optimized version automatically detects the environment and uses the appropriate formatting method.

## Usage

```typescript
import chalk from '@alcyone-labs/simple-chalk';

// Basic colors
console.log(chalk.red('Error message'));
console.log(chalk.green('Success message'));
console.log(chalk.blue('Info message'));

// Text styles
console.log(chalk.bold('Bold text'));
console.log(chalk.dim('Dimmed text'));
console.log(chalk.underline('Underlined text'));

// Chaining
console.log(chalk.red.bold('Bold red text'));
console.log(chalk.blue.underline('Underlined blue text'));
console.log(chalk.green.bold.dim('Green, bold, and dimmed'));
```

## Chalk Compatibility

SimpleChalk is designed as a **drop-in replacement** for Chalk's most commonly used features. Here's exactly what we support and what we don't:

### ✅ Supported Features

#### Basic Colors
```typescript
chalk.black('text')     // ✅ Supported
chalk.red('text')       // ✅ Supported
chalk.green('text')     // ✅ Supported
chalk.yellow('text')    // ✅ Supported
chalk.blue('text')      // ✅ Supported
chalk.magenta('text')   // ✅ Supported
chalk.cyan('text')      // ✅ Supported
chalk.white('text')     // ✅ Supported
chalk.gray('text')      // ✅ Supported
chalk.grey('text')      // ✅ Supported (alias for gray)
```

#### Text Modifiers
```typescript
chalk.bold('text')      // ✅ Supported
chalk.dim('text')       // ✅ Supported
chalk.underline('text') // ✅ Supported
```

#### Special Aliases
```typescript
chalk.blueBright('text') // ✅ Supported (maps to cyan)
```

#### Chaining
```typescript
chalk.red.bold('text')           // ✅ Supported
chalk.blue.underline('text')     // ✅ Supported
chalk.green.bold.dim('text')     // ✅ Supported
// Any combination of colors and modifiers
```

#### Function Usage
```typescript
chalk('text')           // ✅ Supported (returns text as-is)
chalk.red('text')       // ✅ Supported
```

#### Environment Variables
```typescript
// ✅ All supported
process.env.NO_COLOR    // Disables colors
process.env.FORCE_COLOR // Forces colors
process.env.MCP_MODE    // Disables colors (SimpleChalk specific)
```

### ❌ Unsupported Features

#### Background Colors
```typescript
chalk.bgRed('text')     // ❌ Not supported
chalk.bgBlue('text')    // ❌ Not supported
chalk.bgGreen('text')   // ❌ Not supported
// All bg* methods are not supported
```

#### Advanced Text Styles
```typescript
chalk.italic('text')        // ❌ Not supported
chalk.strikethrough('text') // ❌ Not supported
chalk.inverse('text')       // ❌ Not supported
chalk.hidden('text')        // ❌ Not supported
chalk.overline('text')      // ❌ Not supported
```

#### 256-Color and TrueColor Support
```typescript
chalk.ansi256(93)('text')           // ❌ Not supported
chalk.bgAnsi256(93)('text')         // ❌ Not supported
chalk.rgb(255, 136, 0)('text')      // ❌ Not supported
chalk.bgRgb(255, 136, 0)('text')    // ❌ Not supported
chalk.hex('#FF8800')('text')        // ❌ Not supported
chalk.bgHex('#FF8800')('text')      // ❌ Not supported
chalk.hsl(32, 100, 50)('text')      // ❌ Not supported
chalk.bgHsl(32, 100, 50)('text')    // ❌ Not supported
chalk.hsv(32, 100, 100)('text')     // ❌ Not supported
chalk.bgHsv(32, 100, 100)('text')   // ❌ Not supported
chalk.hwb(32, 0, 50)('text')        // ❌ Not supported
chalk.bgHwb(32, 0, 50)('text')      // ❌ Not supported
```

#### Template Literals
```typescript
chalk`{red Hello} {blue World}`     // ❌ Not supported
```

#### Color Level Detection
```typescript
chalk.level                         // ❌ Not supported
chalk.supportsColor                 // ❌ Not supported
```

#### Bright Colors (except blueBright)
```typescript
chalk.redBright('text')             // ❌ Not supported
chalk.greenBright('text')           // ❌ Not supported
chalk.yellowBright('text')          // ❌ Not supported
// Only blueBright is supported (as alias for cyan)
```

### 🎯 Migration Strategy

For **90%+ of use cases**, SimpleChalk is a perfect drop-in replacement:

```typescript
// These work identically in both Chalk and SimpleChalk
console.log(chalk.red('Error'));
console.log(chalk.green.bold('Success'));
console.log(chalk.yellow.underline('Warning'));
```

If you need unsupported features, you have options:

1. **Use conditional imports** for advanced features:
```typescript
const chalk = process.env.BUNDLED
  ? require('@alcyone-labs/simple-chalk')
  : require('chalk');
```

2. **Fallback to ANSI codes** for missing features:
```typescript
// Instead of chalk.bgRed('text')
console.log('\x1b[41m' + text + '\x1b[0m');
```

3. **Use full Chalk** in development, SimpleChalk in production builds

## Environment Variable Support

SimpleChalk respects standard color environment variables:

| Variable | Effect |
|----------|--------|
| `NO_COLOR` | Disables all colors |
| `FORCE_COLOR` | Forces colors even in non-TTY environments |
| `MCP_MODE` | Disables colors for MCP compliance |

```typescript
// Disable colors
process.env.NO_COLOR = '1';
console.log(chalk.red('Error')); // Outputs: "Error" (no colors)

// Force colors
process.env.FORCE_COLOR = '1';
console.log(chalk.red('Error')); // Outputs: "\x1b[31mError\x1b[0m" (with colors)
```

## Features

### 🎯 Three Optimized Versions

**Default**: Full Chalk compatibility with chaining
```typescript
chalk.red.bold.underline('Full compatibility')
```

**Fast**: Maximum performance with pre-created combinations
```typescript
chalk.redBold('23.8M operations/second')
```

**Browser**: CSS-based colors for perfect browser support
```typescript
console.log(...chalk.red('Perfect browser colors'))
```

### 🔧 Smart Features
- **Automatic environment detection** (Node.js vs Browser)
- **Respects color preferences** (NO_COLOR, FORCE_COLOR, MCP_MODE)
- **TypeScript support** with full type definitions
- **Universal compatibility** across all JavaScript environments

## Why SimpleChalk?

### Key Benefits

- **Incredibly Fast**: Fast package is very fast
- **Zero Dependencies**: No external packages, no bloat
- **Lightweight**: Minimal footprint, fast startup
- **Simple**: Clean, predictable API without complexity
- **Universal**: Works in Node.js, browsers, and bundled applications
- **Multiple Versions**: Choose between compatibility and performance
- **Reliable**: Consistent behavior across all environments

## Migration from Chalk

### Simple Migration

```typescript
// Before
import chalk from 'chalk';

// After
import chalk from '@alcyone-labs/simple-chalk';

// All your existing code works the same!
console.log(chalk.red.bold('Hello World'));
```

### Unsupported Features

SimpleChalk focuses on the most commonly used chalk features. The following are not supported:

- **RGB/Hex colors**: `chalk.rgb(255, 0, 0)`, `chalk.hex('#FF0000')`
- **Background colors**: `chalk.bgRed()`, `chalk.bgBlue()`
- **Advanced styles**: `chalk.strikethrough()`, `chalk.inverse()`
- **Template literals**: `chalk\`{red Hello} World\``

If you need these features, use the full chalk library in non-bundled environments.

## Performance

SimpleChalk offers **two versions** with different performance characteristics:

### Version Comparison

| Version | ops/sec | Use Case |
|---------|---------|----------|
| **Fast** | **23,809,524** | Maximum performance, pre-created combinations |
| **Default** | **171,380** | Full Chalk compatibility, dynamic chaining |

### Full Benchmark Results

```
┌─────────┬──────────────────────────┬──────────────┐
│ (index) │ library                  │ ops/sec      │
├─────────┼──────────────────────────┼──────────────┤
│ 0       │ 'simple-chalk-fast'      │ '23,809,524' │
│ 1       │ 'yoctocolors'            │ '8,000,000'  │
│ 2       │ 'colorette'              │ '8,000,000'  │
│ 3       │ 'picocolors'             │ '8,000,000'  │
│ 4       │ 'nanocolors'             │ '5,988,024'  │
│ 5       │ 'chalk'                  │ '4,784,689'  │
│ 6       │ 'kleur'                  │ '4,784,689'  │
│ 7       │ 'kleur/colors'           │ '4,807,692'  │
│ 8       │ 'ansi-colors'            │ '2,183,406'  │
│ 9       │ 'cli-color'              │ '615,385'    │
│ 10      │ 'simple-chalk (default)' │ '171,380'    │
└─────────┴──────────────────────────┴──────────────┘
```

### Performance Trade-offs

**Fast Version** is the very fast:
- **23.8 million ops/sec**
- **~0.04 microseconds per operation**
- But no dynamic chaining

**Default Version** prioritizes compatibility:
- **171,380 operations/second** - still fast for typical usage
- **~6 microseconds per operation** - imperceptible in real applications
- **Full Chalk API compatibility** - dynamic chaining works
- **Zero dependencies** - no bundling complexity

### Choosing the Right Version

**Use Fast Version** (`/fast`) when:
- Performance is critical (logging libraries, high-frequency output)
- You don't need complex chaining (`chalk.red.bold.dim`)
- You can use pre-created combinations (`redBold`, `greenUnderline`)
- You want the absolute fastest color library available

**Use Default Version** when:
- You need full Chalk API compatibility
- You use complex chaining like `chalk.red.bold.dim.underline`
- You're migrating from Chalk with minimal code changes
- API flexibility is more important than raw performance

**Both versions work in**:
- Node.js (all versions)
- Modern browsers (Chrome, Firefox, Safari)
- Bundled applications (Webpack, Vite, etc.)
- TypeScript projects

### Run Your Own Benchmarks

```bash
npm run benchmark     # Run performance comparison
```

## Development

### Building

```bash
npm run build          # Build all formats
npm run build:cjs      # Build CommonJS
npm run build:esm      # Build ES modules
npm run build:types    # Build TypeScript definitions
```

### Testing

```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once (74 tests)
npm run test:coverage # Run tests with coverage
```

**Comprehensive test coverage** includes:
- ✅ **26 tests** for default version (full Chalk compatibility)
- ✅ **34 tests** for fast version (performance optimized)
- ✅ **14 tests** for browser version (CSS-based colors)
- ✅ All color functions, modifiers, and combinations
- ✅ Environment variable handling (NO_COLOR, FORCE_COLOR, MCP_MODE)
- ✅ Both Node.js and browser environment detection

### Publishing

```bash
npm run validate      # Run linting and tests
npm run publish:dry-run  # Test publish without actually publishing
npm run publish:npm   # Publish to NPM
```

## Troubleshooting

### Common Issues

**Q: Colors not showing in terminal**
A: Check if `NO_COLOR` is set or if you're in a non-TTY environment.

**Q: Colors showing in MCP mode**
A: Ensure `process.env.MCP_MODE` is set before importing SimpleChalk.

**Q: Module not found errors**
A: Make sure you're importing from `@alcyone-labs/simple-chalk` and not a local path.

## Contributing

To contribute to SimpleChalk:

1. **File Issues**: Report bugs or feature requests on GitHub
2. **Submit PRs**: Add new features or improve performance
3. **Test Coverage**: Help test on different platforms and environments

### Development Setup

```bash
git clone https://github.com/Alcyone-Labs/simple-chalk
cd simple-chalk
pnpm install
pnpm test
```

## License

MIT License - see LICENSE file for details.
