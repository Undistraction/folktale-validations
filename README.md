# folktale-validations

[![NPM Version](https://img.shields.io/npm/v/folktale-validations.svg)](https://www.npmjs.com/package/folktale-validations)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/folktale-validations.svg)](https://codecov.io/gh/Undistraction/folktale-validations)
[![Build Status](https://img.shields.io/travis/Undistraction/folktale-validations.svg)](https://travis-ci.org/Undistraction/folktale-validations)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)

A library of validators using [folktale](http://folktale.origamitower.com/)'s `Validation` including utility functions for combining and composing validations, and constraint-based validation, allowing you to validate objects or object graphs. Includes easily customisable error message rendering, and is easily extended with your own validations.

Much of the basic validation relies on well tested predicates provided by [ramda-adjunct](https://github.com/char0n/ramda-adjunct).

The library is well tested (on Node 7, 8 and 9) and the validators themselves are easy to test.

## Structure

The project is broken into:

* validators: Validators that work on a single value or a collection of values.
* helpers: Functions helping you create, combine or change the behaviour of validators.
* constraints: A system for validating whole objects or object graphs, with validation and transformation of values.
* failures: Rendering of failed validations to human-readable error messages.

## Install

```bash
yarn add folktale-validations
```

or

```bash
npm install folktale-validations
```

## Validators

Many validators are included, but it is very easy to create your own. The following are all ready to use out of the box.

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

This information can be rendered into a human-readable message using a Failure Renderer. The library ships with a preconfigured renderer which knows how to render failures from all included validators, including complex nested failures. You can supply your own messages for some or all of these validators, as outlined below. Outputting payload objects from the validators makes them easy to test.

Many of the validators are simple predicate validators - supply them with a value and they will either succeed or fail:

**Example 1 - Predicate Validator**

```javaScript
const validValue = `a`
const successfulValidation = validateIsString(validValue)

expect(isSuccess(successfulValidation)).toBeTrue()
expect(successfulValidation.value).toEqual(validValue)

const invalidValue = 1
const failedValidation = validateIsString(invalidValue)
const message = failureRenderer(failedValidation.value)

expect(isFailure(failedValidation)).toBeTrue()
expect(failedValidation.value).toEqual({
  uid: `folktale-validations.validate.validateIsString`,
  value: invalidValue,
  args: [],
})
expect(message).toEqual(`Wasn't String`)
```

Other validators require configuring before use.

**Example 2 - Association Validator**

```javaScript
const configuredValidator = validateIsLengthGreaterThan(2)

const validValue = `abc`
const successfulValidation = configuredValidator(validValue)

expect(isSuccess(successfulValidation)).toBeTrue()
expect(successfulValidation.value).toEqual(validValue)

const invalidValue = `a`
const failedValidation = configuredValidator(invalidValue)
const message = failureRenderer(failedValidation.value)

expect(isFailure(failedValidation)).toBeTrue()
expect(failedValidation.value).toEqual({
  uid: `folktale-validations.validate.validateIsLengthGreaterThan`,
  value: invalidValue,
  args: [2],
})
expect(message).toEqual(`Length wasn't greater than '2'`)
```

Validators can also validate Objects - either keys or values. In the following example, the values of an object are validated, using a different validator for each key.

**Example 3 - Object Validator**

```javaScript
const configuredValidator = validateObjectValues({
    a: validateIsNumber,
    b: validateIsString,
    c: validateIsNotEmpty,
  })

  const validValue = {
    a: 1,
    b: `example`,
    c: [1, 2, 3],
  }
  const successfulValidation = configuredValidator(validValue)

  expect(isSuccess(successfulValidation)).toBeTrue()
  expect(successfulValidation.value).toEqual(validValue)

  const invalidValue = {
    a: `example`,
    b: true,
    c: [],
  }
  const failedValidation = configuredValidator(invalidValue)
  const message = failureRenderer(failedValidation.value)

  expect(isFailure(failedValidation)).toBeTrue()
  expect(failedValidation.value).toEqual({
    fields: {
      a: {
        uid: `folktale-validations.validate.validateIsNumber`,
        value: `example`,
        args: [],
      },
      b: {
        uid: `folktale-validations.validate.validateIsString`,
        value: true,
        args: [],
      },
      c: {
        uid: `folktale-validations.validate.validateIsNotEmpty`,
        value: [],
        args: [],
      },
    },
  })
  expect(message).toEqualWithCompressedWhitespace(
    `Object
      – included invalid value(s)
        – Key 'a': Wasn't Number
        – Key 'b': Wasn't String
        – Key 'c': Was Empty`
  )
```

An Array of values can also be validated, using a single validator for all the values in the array.

**Example 4 - Array Validator**

```javaScript
const configuredValidator = validateArrayElements(validateIsRegExp)

const validValue = [/a/, /b/, /c/]
const successfulValidation = configuredValidator(validValue)

expect(isSuccess(successfulValidation)).toBeTrue()
expect(successfulValidation.value).toEqual(validValue)

const invalidValue = [/a/, `/b/`, /c/]
const failedValidation = configuredValidator(invalidValue)
const message = failureRenderer(failedValidation.value)

expect(isFailure(failedValidation)).toBeTrue()
expect(failedValidation.value).toEqual({
  children: {
    '1': {
      uid: `folktale-validations.validate.validateIsRegExp`,
      value: `/b/`,
      args: [],
    },
  },
})
expect(message).toEqualWithCompressedWhitespace(
  `Array included invalid value(s)
    – [1] Wasn't RegExp`
      )
```

### Combining Validations

The library offers a number of helper functions for combining or composing validations. In the following example, `allOfValidator` is used to compose two validations into a single validation:

**Example 5 - Composed Validations**

```javascript
const configuredValidator = allOfValidator([
  validateIsString,
  validateIsLengthLessThan(5),
])

const validValue = `abcd`
const successfulValidation = configuredValidator(validValue)

expect(isSuccess(successfulValidation)).toBeTrue()
expect(successfulValidation.value).toEqual(validValue)

const invalidValue = 1
const failedValidation = configuredValidator(invalidValue)
const message = failureRenderer(failedValidation.value)

expect(isFailure(failedValidation)).toBeTrue()
expect(failedValidation.value).toEqual({
  and: [
    {
      uid: `folktale-validations.validate.validateIsString`,
      value: 1,
      args: [],
    },
    {
      uid: `folktale-validations.validate.validateIsLengthLessThan`,
      value: 1,
      args: [5],
    },
  ],
})
expect(message).toEqualWithCompressedWhitespace(
  `Wasn't String and Length wasn't less than '5'`
)
```

These validations can themselves be composed, for example:

**Example 6 - Nested Composed Validations**

```javascript
const configuredValidator = allOfValidator([
  orValidator(validateIsString, validateIsNumber),
  validateIsLengthLessThan(5),
])

const validValue = `abcd`
const successfulValidation = configuredValidator(validValue)

expect(isSuccess(successfulValidation)).toBeTrue()
expect(successfulValidation.value).toEqual(validValue)

const invalidValue = null
const failedValidation = configuredValidator(invalidValue)
const message = failureRenderer(failedValidation.value)

expect(isFailure(failedValidation)).toBeTrue()
expect(failedValidation.value).toEqual({
  and: [
    {
      or: [
        {
          uid: `folktale-validations.validate.validateIsString`,
          value: null,
          args: [],
        },
        {
          uid: `folktale-validations.validate.validateIsNumber`,
          value: null,
          args: [],
        },
      ],
    },
    {
      uid: `folktale-validations.validate.validateIsLengthLessThan`,
      value: null,
      args: [5],
    },
  ],
})
expect(message).toEqualWithCompressedWhitespace(
  `(Wasn't String or Wasn't Number) and Length wasn't less than '5'`
)
```

### Constraint-based validations

Using constraints allows you to describe what constitutes a valid object or nested object graph. It also allows you to tansform the received values and apply default values for missing props. This involves three steps:

1. Create a constraint object
2. Configure `validateObjectWithConstraints` a constraint object
3. Validate

Note: As part of the validation process, the constraints object itself is validated, and you will recieve a Failed Validation explaining where the problem is if it is invalid.

Note: Take a look at `src/constraints/constraints.js` to see the constraints object that is used to validate constraints objects supplied to `validateObjectWithConstraints()`.

**Example 7 - Constraints With Flat Object**

```javascript
it(`returns expected values`, () => {
  const constraints = {
    fields: [
      {
        name: `a`,
        validator: validateIsString,
      },
      {
        name: `b`,
        validator: validateIsArrayOf(validateIsNumber),
      },
      {
        name: `c`,
        validator: validateIsDate,
      },
    ],
  }

  const confguredValidator = validateObjectWithConstraints(constraints)

  const validValue = {
    a: `abc`,
    b: [1, 2, 3],
    c: new Date(`01-01-2001`),
  }

  const successfulValidation = confguredValidator(validValue)

  expect(isSuccess(successfulValidation)).toBeTrue()
  expect(successfulValidation.value).toEqual(validValue)

  const invalidValue = {
    a: 123,
    b: null,
    c: `01-01-2001`,
  }

  const failedValidation = confguredValidator(invalidValue)
  const message = failureRenderer(failedValidation.value)

  expect(isFailure(failedValidation)).toBeTrue()
  expect(failedValidation.value).toEqual({
    fields: {
      a: {
        uid: `folktale-validations.validate.validateIsString`,
        value: 123,
        args: [],
      },
      b: {
        uid: `folktale-validations.validate.validateIsArray`,
        value: null,
        args: [],
      },
      c: {
        uid: `folktale-validations.validate.validateIsDate`,
        value: `01-01-2001`,
        args: [],
      },
    },
  })
  expect(message).toEqualWithCompressedWhitespace(
    `Object
      – included invalid value(s)
      – Key 'a': Wasn't String
      – Key 'b': Wasn't Array
      – Key 'c': Wasn't Date`
  )
})
```

There are a number of other valid attributes for the constraints object.

#### Validating the keys of the object

All object's are validated by two field validators - one that checks there are no keys present that aren't described by the constraitns, and one that checks that any required keys (see below) are present. You can use the `fieldsValidator` attribute to supply an additional validator for the object's keys themselves. For example you might want to check that only one of a set of keys should appear per object.

#### Object values

##### isRequired

If a key must be present, you can add an `isRequired` attribute to the constraints object for that field. This will cause validation to fail if the key does not appear on the object. Note: your constraints will be invalid if you use `isRequired` and `defaultValue` on the same field.

##### defaultValue

If you want to supply a defualt value for a key if it isn't present you can add a `defaultValue` attribute. This add a key with the default value to the object when it is validated. Note: Nothing is mutated - the value returned will be a copy of the object with the key/value pair added.

##### transformer

If you want to transform a supplied value that has passed validation, you can supply a transformer function as a field's `transformer` attribute. Note: the transformer will be applied after any `defaultValue`. The transformer function should be unary and return the transformed value.

**Example 8 - Using isRequired, defaultValue and transformer**

```javascript
const constraints = {
  fields: [
    {
      name: `a`,
      isRequired: true,
      validator: validateIsString,
      transformer: toUpper,
    },
    {
      name: `b`,
      validator: validateIsBoolean,
      defaultValue: true,
    },
  ],
}

const confguredValidator = validateObjectWithConstraints(constraints)

const validValue = {
  a: `abc`,
}

const expectedValue = {
  a: `ABC`,
  b: true,
}

const successfulValidation = confguredValidator(validValue)

expect(isSuccess(successfulValidation)).toBeTrue()
expect(successfulValidation.value).toEqual(expectedValue)

const invalidValue = {
  b: false,
}

const failedValidation = confguredValidator(invalidValue)
const message = failureRenderer(failedValidation.value)

expect(isFailure(failedValidation)).toBeTrue()
expect(failedValidation.value).toEqual({
  fieldsFailureMessage: {
    uid: `folktale-validations.validate.validateRequiredKeys`,
    value: { b: false },
    args: [[`a`], [`a`]],
  },
})
expect(message).toEqualWithCompressedWhitespace(
  `Object – missing required key(s): ['a']`
)
```

#### Validating Object Graphs

You aren't limitted to flat objects. You can use full object graphs comprising of objects and arrays. To describe these graphs you use two additional attributes of the constraints object: `children` and `value`. In the following example a complex object graph is validated. Note: your constraints will be invalid if you use `children` and `value` on the same field.

**Example 9 - Constraints With Object Graph**

```javascript
const constraints = {
  fields: [
    {
      name: `a`,
      isRequired: true,
      validator: validateIsObject,
      value: {
        fields: [
          {
            name: `a-a`,
            isRequired: true,
            validator: validateIsBoolean,
          },
          {
            name: `a-b`,
            isRequired: true,
            validator: validateIsNonEmptyArray,
            children: {
              fields: [
                {
                  name: `a-b-a`,
                  isRequired: true,
                  validator: validateIsString,
                },
              ],
            },
          },
        ],
      },
    },
  ],
}

const confguredValidator = validateObjectWithConstraints(constraints)

const validValue = {
  a: {
    [`a-a`]: true,
    [`a-b`]: [
      {
        [`a-b-a`]: `abc`,
      },
      {
        [`a-b-a`]: `def`,
      },
    ],
  },
}

const successfulValidation = confguredValidator(validValue)

expect(isSuccess(successfulValidation)).toBeTrue()
expect(successfulValidation.value).toEqual(validValue)

const invalidValue = {
  a: {
    [`a-a`]: true,
    [`a-b`]: [
      {
        [`a-b-a`]: `abc`,
      },
      {
        [`a-b-a`]: 123,
      },
    ],
  },
}

const failedValidation = confguredValidator(invalidValue)
const message = failureRenderer(failedValidation.value)

expect(isFailure(failedValidation)).toBeTrue()
expect(failedValidation.value).toEqual({
  fields: {
    a: {
      fields: {
        'a-b': {
          children: {
            '1': {
              fields: {
                'a-b-a': {
                  uid: `folktale-validations.validate.validateIsString`,
                  value: 123,
                  args: [],
                },
              },
            },
          },
        },
      },
    },
  },
})
expect(message).toEqualWithCompressedWhitespace(
  `Object
  – included invalid value(s)
    – Key 'a': Object
      – included invalid value(s)
        – Key 'a-b': Array included invalid value(s)
          – [1] Object
            – included invalid value(s)
              – Key 'a-b-a': Wasn't String`
)
})
```

### Customising Existing Validators

#### Replacing Existing Messages

The messages ouput during rendering can be configured by passing a map of functions via a configuration object to `configureValidators()`. Here you can override the validator messages by using one of the existing keys and you can add your own key/function pairs rendering failures from your own validators. The default validator messages can be found here: `src/config/customise/validatorMessagesDefaults.js`.

Each key should map to a function that returns a formatted message for that validator. The `uid` of the payload returned from a validator will be used to locate the appropriate function, which will then have the values in the payload's `args` applied to it. It is recommended you use some kind of namespaced uid. This library uses uids like this: `folktale-validations.validateIsArray`.

**Example 10 - Customising Validation Failure Messages**

```javascript
it(`returns expected values`, () => {
  const newMessage = `Boolean it isn't`
  const { failureRenderer: configuredFailureRenderer } = configureRenderers({
    validatorMessages: {
      [validatorUids.IS_BOOLEAN]: always(newMessage),
    },
  })

  const failedValidation = validateIsBoolean(`yoda`)
  const message = configuredFailureRenderer(failedValidation.value)
  expect(message).toEqualWithCompressedWhitespace(newMessage)
})
```

#### Creating Validator Based On Existing Validator

The simplest way to customise an existing valiadator is simply to configure it as we have done in previous examples. You can then export the configured validator for use throughout your application. However if you want to add your own message that is specific to the configured validator you can decorate the validator, supplying it with a new uid.

**Example 11 - Creating Validator Based On Existing Validator**

```javascript
const newUID = `example.validateIsValidTitle`
const newMessageFunction = whitelist => `Wasn't a title: ${whitelist}`
const titles = [`mr`, `mrs`, `miss`, `ms`, `dr`, `mx`]

const { failureRenderer: configuredFailureRenderer } = configureRenderers({
  validatorMessages: {
    [newUID]: newMessageFunction,
  },
})

const validateIsValidTitle = compose(
  decorateValidator(newUID),
  validateIsWhitelistedValue
)(titles)

const failedValidation = validateIsValidTitle(`emperor`)
const message = configuredFailureRenderer(failedValidation.value)
expect(message).toEqualWithCompressedWhitespace(
  `Wasn't a title: mr,mrs,miss,ms,dr,mx`
)
```

#### Customising Constraint Validation

You can also customise the rendering of constraint-based validation failures. In this instance things are more complicated as there is significant formatting as well as text rendering. Again, you can pass in an object via the configuration object of `configureValdidators()`. The default helpers can be found here: `src/config/customise/failureRendererHelpersDefaults.js`.

Example 12 - Customising Constraint-based Validation Formatting

_Coming Soon_

### Adding Your Own Validators

#### Using existing helpers

There are a couple of helpers offered to use as a basis for your own validators - `predicateValidator` and `regExpValidator`. In the following example we'll create a validator that checks that a string doesn't have any whitespace.

**Example 13 - Creating a Validator Using Helpers**

```javascript
const UID = `example.validateHasNoWhitespace`
const newMessageFunction = always(`Should not contain whitespace`)
const regExp = /^\S+$/

const { failureRenderer: configuredFailureRenderer } = configureRenderers({
  validatorMessages: {
    [UID]: newMessageFunction,
  },
})

const validateHasNoWhitespace = regExpValidator(UID, regExp)

const successfulValidation = validateHasNoWhitespace(`ab`)
expect(isSuccess(successfulValidation)).toBeTrue()

const failedValidation = validateHasNoWhitespace(`a b`)
const message = configuredFailureRenderer(failedValidation.value)
expect(message).toEqualWithCompressedWhitespace(`Should not contain whitespace`)
```

#### From scratch

The validator interface is very simple. They should:

* Accept any configuration values first
* Accept the data to validate last
* Should be curried
* If the validation is succeeds they should return a `Success` with its `value` set to the validated data.
* If the validation fails they shoudl return a `Failure` with its `value` set to a payload.

##### Payloads

A payload is created using `toPayload()` which takes three arguments:

1. A UID for that validator
2. The value that was validated
3. (optional) an array of values to be supplied to the function that will render the message for this validator.

**Example 14 - Creating a Validator From Scratch**

```javascript
const UID = `example.validateContainsChars`
const newMessageFunction = chars => `Didn't contain chars: [${chars}]`

const { failureRenderer: configuredFailureRenderer } = configureRenderers({
  validatorMessages: {
    [UID]: newMessageFunction,
  },
})

const containsChars = (chars, s) =>
  compose(isEmpty, reject(flip(contains)(s)))(chars)

const { Success, Failure } = Validation

const validateContainsChars = curry(
  (chars, value) =>
    containsChars(chars, value)
      ? Success(value)
      : compose(Failure, toPayload)(UID, value, [chars])
)

const configuredValidator = validateContainsChars([`a`, `b`, `c`])

const successfulValidation = configuredValidator(`cab`)
expect(isSuccess(successfulValidation)).toBeTrue()

const failedValidation = configuredValidator(`cat`)
const message = configuredFailureRenderer(failedValidation.value)
expect(message).toEqualWithCompressedWhitespace(`Didn't contain chars: [a,b,c]`)
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
