# folktale-validations

[![NPM Version](https://img.shields.io/npm/v/folktale-validations.svg)](https://www.npmjs.com/package/folktale-validations)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/folktale-validations.svg)](https://codecov.io/gh/Undistraction/folktale-validations)
[![Build Status](https://img.shields.io/travis/Undistraction/folktale-validations.svg)](https://travis-ci.org/Undistraction/folktale-validations)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)

A library of validators using [folktale](http://folktale.origamitower.com/)'s `Validation` including utility functions for combining and composing validations, and constraint-based validation, allowing you to validate objects or object graphs. Includes easily customisable error message rendering, and is easily extended with your own validations.

Much of the basic validation relies on well tested predicates provided by [ramda-adjunct](https://github.com/char0n/ramda-adjunct).

## Structure

The project is broken into:

* validators: Validators that work on a single value or a collection of values.
* helpers: Functions helping you create, combine or change the behaviour of validators.
* constraints: A system for validating whole objects or object graphs, with validation and transformation of values.
* failures: Rendering of failed validations to human-readable error messages.

## Validators

### Predicates

#### Basic Types

* validateIsArray
* validateIsNotArray
* validateIsObject
* validateIsNotObject
* validateIsBoolean
* validateIsNotBoolean
* validateIsString
* validateIsNotString
* validateIsFunction
* validateIsNotFunction
* validateIsNumber
* validateIsNotNumber
  #### Complex Objects
* validateIsDate
* validateIsNotDate
* validateIsRegExp
* validateIsNotRegExp
* validateIsPlainObject
* validateIsNotPlainObject
  #### Nil Values
* validateIsNaN
* validateIsNotNaN
* validateIsNil
* validateIsNull
* validateIsNotNull
* validateIsUndefined
* validateIsNotUndefined
  #### Emptyness
* validateIsEmpty
* validateIsNotEmpty
* validateIsEmptyArray
* validateIsNonEmptyArray
* validateIsEmptyString
* validateIsNonEmptyString
  #### Validity
* validateIsValidNumber
* validateIsNotValidNumber
* validateIsValidDate
* validateIsNotValidDate
  #### Numericality
* validateIsPositive
* validateIsNegative

### Association

* validateIsLengthGreaterThan
* validateIsLengthLessThan
* validateIsLengthBetween

### Array

* validateArrayElements - Validate all elements with supplied validator
* validateIsArrayOf - Validate is array and validate all elements with supplied validator

### Object

* validateObjectValues - Validate values using a map of key-validator pairs
* validateRequiredKeys - Required keys must be present
* validateWhitelistedKeys - Keys must appear on whitelist
* validateExclusiveKeys - Only one key must appear from the supplied list

### Other

* validateIsWhitelistedValue - Value must appear on whitelist
* validateIsNotBlacklistedValue - Value must not appear on blacklist
* validateIsNumberWithUnit - Value must be a number followed by supplied unit

### Constraints

* validateObjectWithConstraints - Validate an object or object graph using a constraint object that describes a valid object

### Helpers

* allOfValidator - All validations must pass (will always run all validations)
* andValidator - Both validations must pass (will always run both validations)
* anyOfValidtor - Any validations must pass (will always run all validations)
* orValidator - Either validation must pass (will always run both validations)
* untilFailureValidator - All validations must pass (short-circuits on failure)
* predicateValidator - Create a validator using a simple predicate
* regExpValidator - Create a validator that uses a RegExp for validation

## Install

```bash
yarn add folktale-validations
```

or

```bash
yarn install folktale-validations
```

## Usage

### Introduction

Note: All examples in this introduction can be viewed as working tests in `src/**tests**/docs/readme.js

Every validation you perform will return a [Validation](http://folktale.origamitower.com/api/v2.1.0/en/folktale.validation.html) object which will be either a `Failure` or a `Success`. There are `isFailure` and `isSuccess` functions exported from `index.js` to help you check, however you can also use `matchWith` and a variety of other methods to handle both cases which are outlined in the link above.

* If it is a `Success`, the object's `value` will contain the validated value.
* If it is a `Failure`, the object's `value` will contain a payload describing the failure.

A payload is a simple object describing the failure and has three fields:

* `uid` - the UID of the validator
* `value` - the value that failed validation
* `args` - an array of values relating to the failure, for example `validateIsWhiteListedValue` will include two arrays - one of all whitelisted values, and one of values discovered that weren't included in the whitelist.

This information can be rendered into a human-readable message using a Failure Renderer. The library ships with a preconfigured renderer which knows how to render failures from all included validators, including complex nested failures. You can supply your own messages for some or all of these validators, as outlined below.

Many of the validators are simple predicate validators - supply them with a value and they will either succeed or fail:

Example 1 - Predicate Validator

```javaScript

```

Other validators require configuring before use.

### Combining Validations

The library offers a number of helper functions for combining or composing validations. In the following example, `allOfValidator` is used to compose three validations into a single validation:

Example 2 - Composed Validations

```javascript
```

These validations can themselves be composed, for example:

Example 3 - Nested Composed Validations

```javascript
```

### Constraint-based validations

Using constraints allows you to describe what constitutes a valid object or nested object graph. It also allows you to tansform the received values and apply default values for missing props. This involves two steps:

1. Create a constraint object
2. Perform a validation using this constraint object.

Example 4 - Flat Object

```javascript
```

Example 5 - Object Graph

```javascript
```

### Customising Failure Messages

The messages ouput during rendering can be configured by passing a map of functions via a configuration object to `configureValidators()`. Here you can override the validator messages by using one of the existing keys and you can add your own key/function pairs rendering failures from your own validators. The default validator messages can be found here: `src/config/customise/validatorMessagesDefaults.js`.

Each key should map to a function that returns a formatted message for that validator. The `uid` of the payload returned from a validator will be used to locate the appropriate function, which will then have the values in the payload's `args` applied to it. It is recommended you use some kind of namespaced uid. This library uses uids like this: `folktale-validations.validateIsArray`.

Example 6 - Customising Validation Failure Messages

```javascript
```

You can also customise the rendering of constraint-based validation failures. In this instance things are more complicated as there is significant formatting as well as text rendering. Again, you can pass in an object via the configuration object of `configureValdidators()`. The default helpers can be found here: `src/config/customise/failureRendererHelpersDefaults.js`.

Example 7 - Customising Constraint-based Validation Failure Messages

```javascript
```

Example 8 - Customising Constraint-based Validation Formatting

```javascript
```

### Arguments Failure Renderer

If you want to output a message relating to arguments instead of an object, you can use the `argumentsFailureRenderer` which will render a more appropriate message. It is also available from the object returned by `defaultValidators()`.

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
