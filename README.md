# es-babel-jest
Directly forked from https://github.com/ambar/es-jest (thanks!), es-babel-jest is a
ESM/React/TypeScript preprocessor for Jest, powered by [esbuild](https://github.com/evanw/esbuild).
It will transform any ES modules into valid CJS (CommonJS) modules, to make your tests written in ES modules works out of the box with jest. It also pipe  [babel-jest](https://github.com/facebook/jest/tree/main/packages/babel-jest) transforms once preprocessed with esbuild, to allow jest helpers "hoisting" and all babel-jest default behavior.

[![npm version](https://badgen.net/npm/v/es-babel-jest)](https://www.npmjs.com/package/es-babel-jest)

## Install

```bash
npm install es-babel-jest --save-dev
```

## Usage

Add preset to Jest config:

```json
{
  "jest": {
    "preset": "es-babel-jest"
  }
}

// alternatively, specifying the files to transform:
{
  "jest": {
    "transform": {
      "\\.[jt]sx?$": "es-babel-jest"
    },
  }
}
```

Writes your test with ES modules:

```js
import path from 'path'

test('parses extname', () => {
  expect(path.extname('foo.md')).toBe('.md')
})
```

Happy testing!

## Related

- [es-jest](https://github.com/ambar/es-jest)
- [rollup-jest](https://github.com/ambar/rollup-jest)
- [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
