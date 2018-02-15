# folktale-validations

[![NPM Version](https://img.shields.io/npm/v/folktale-validations.svg)](https://www.npmjs.com/package/folktale-validations)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/folktale-validations.svg)](https://codecov.io/gh/Undistraction/folktale-validations)
[![Build Status](https://img.shields.io/travis/Undistraction/folktale-validations.svg)](https://travis-ci.org/Undistraction/folktale-validations)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)

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
yarn install folktale-validations
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

Tests are written with Jest.

#### Run Jest in watch mode

```bash
yarn test
```

#### Run Jest once

```bash
yarn test:noWatch
```

#### View HTML Coverage report

```bash
yarn test:cov
```

### Build

```bash
yarn run build
```

### Publish to NPM

```bash
yarn run publish:patch
```

Or

```bash
yarn run publish:minor
```

Or

```bash
yarn run publish:major
```

### Developing

#### Adding Predicates

Simple predicates and their tests are generated from a series of consts and data files.

1. Add the predicate name to `src/const/predicateNames.js`
2. Add predicate and negation to `src/const/validatorUids.js`
3. Add predicate and negation to `src/validators/predicate/predicates.js`
4. Add predicate and negation export to `src/validators/predicate/generatedPredicateValidators.js`
5. Add predicate and negation data to `src/__tests__/testHelpers/data/predicateValidators.js`
6. Add default message to `src/config/defaults/validatorMessagesDefaults.js`
