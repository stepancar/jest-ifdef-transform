<div align="center">
  <img width="200" height="200"
    src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-1/32/operation--if-512.png">
  <a href="https://jestjs.io/docs/next/code-transformation">
    <img width="200" height="200"
      src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/jest-512.png">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![size][size]][size-url]

# jest-ifdef-transform

[Jest](https://facebook.github.io/jest/) transformer mimicking [webpack-ifdef-loader](https://www.npmjs.com/package/ifdef-loader)'s functionality

## Install

```
$ npm install --save-dev jest-ifdef-transform
```

## Usage

Use [jest's `transform` configuration options](https://facebook.github.io/jest/docs/en/configuration.html#transform-object-string-string) to use this package in your unit tests.

For example, use the following to load different implementations of class for browser and node

```typescript
/// #if NODE
/// #code import {NodeModel as Model} from "./NodeModel";
/// #code export {Model};
/// #else
/// #code import {Model as Model} from "./Model";
/// #code export {Model};
/// #endif

import type {
    Model as ModelType,
} from './Model';

declare module './' {
    export const Model: typeof ModelType;
    export type Model = ModelType;
}
```

jest.config.ts

```typescript
transform: {
    'myClass/index.ts$': ['.jest/ifdf-transformer', {
        'NODE': true,
        'ifdef-verbose': true,
        'ifdef-triple-slash': true,
        'ifdef-fill-with-blanks': true,
        'ifdef-uncomment-prefix': '/// #code ',
    }],
},
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/jest-ifdef-transform.svg
[npm-url]: https://npmjs.com/package/jest-ifdef-transform
[node]: https://img.shields.io/node/v/jest-ifdef-transform.svg
[node-url]: https://nodejs.org
[size]: https://packagephobia.now.sh/badge?p=jest-ifdef-transform
[size-url]: https://packagephobia.now.sh/result?p=jest-ifdef-transform
