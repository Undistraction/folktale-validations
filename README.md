# folktale-validations

A library of validators using [folktale](http://folktale.origamitower.com/)'s `Validation` including utility functions for creating validators with less boilerplate and specialised validators.

Note: For validators relying on predicates from well tested external libraries, tests will only ensure validator succeeds and fails.

## Structure

The project is broken into:

* validators: Validators that work on a single value or a collection of values.
* helpers: Functions helping you create, combine or change the behaviour of validators.
* utils: Simple utilities to make working with validations easier.

## Install

```
yarn add folktale-validations
```

or

```
npm install folktale-validations
```

## NPM

The NPM module includes:

* `lib` directory with imports transpiled for use in bundlers.
* `dist` directory with a UMD build.

## Maintainance

### Tests

```
npm test
```

### Build

```
npm run build
```

### Publish to NPM

```
npm run publish:patch
npm run publish:minor
npm run publish:major
```
