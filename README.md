# jest-ifdef-transform

[Jest](https://facebook.github.io/jest/) transformer mimicking [webpack-contrib/raw-loader](https://www.npmjs.com/package/ifdef-loader)'s functionality

## Install

```
$ npm install --save-dev jest-ifdef-transform
```

## Usage

Use [jest's `transform` configuration options](https://facebook.github.io/jest/docs/en/configuration.html#transform-object-string-string) to use this package in your unit tests.

For example, use the following to load different implementations of class for browser and node

```
/// #if NODE
/// #code import {NodeModel as Model} from "./NodeModel";
/// #code export {Model};
/// #else
/// #code import {Model as Model} from "./Model";
/// #code export {Model};
/// #endif

// use the types from the browser version of LottieAsset
import type {
    Model as ModelType,
} from './Model';

declare module './' {
    export const Model: typeof ModelType;
    export type Model = ModelType;
}
```

jest.config.ts

```
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
