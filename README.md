# folktale-validations

A library of validators using [folktale](http://folktale.origamitower.com/)'s `Validation` including utility functions for creating validators with less boilerplate and specialised validators.

Note: For validators relying on predicates from well tested external libraries, tests will only ensure validator succeeds and fails.

## Structure

The project is broken into:

* validators: Validators that work on a single value or a collection of values.
* helpers: Functions helping you create, combine or change the behaviour of validators.
* constraints: A system for validating whole objects or object graphs, with validation and transformation of values.
* utils: Simple utilities to make working with validations easier.

## Install

```bash
yarn add folktale-validations
```

or

```bash
npm install folktale-validations
```

## Usage

### Individual validator

```javascript
import { validateIsString } from 'folktale-validations'

const configuredValidator = validateIsString(`Wasn't a string`)

const successfulValidation = configuredValidator(`a`) // folktale:Validation.Success({ value: "a" })

const failedValidation = configuredValidator(1) // Folktale:Validation.Failure({ value: ["Wasn't a string"] })
```

### Constraints

```javascript
```

## NPM

The NPM module includes:

* `lib` directory with imports transpiled for use in bundlers.
* `dist` directory with a UMD build.

## Maintainance

### Tests

```bash
npm test
```

### Build

```bash
npm run build
```

### Publish to NPM

```bash
npm run publish:patch
npm run publish:minor
npm run publish:major
```
