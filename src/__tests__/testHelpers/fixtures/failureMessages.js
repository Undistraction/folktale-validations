import { FAILURE_FIELD_NAMES } from '../../../const'

const { FIELDS_FAILURE_MESSAGE, FIELDS, CHILDREN } = FAILURE_FIELD_NAMES

export const flatFailureMessage = {
  [FIELDS_FAILURE_MESSAGE]: `fieldsMessageForRoot`,
  [FIELDS]: {
    a: `errorMessageForA`,
    b: `errorMessageForB`,
    c: `errorMessageForC`,
  },
}

export const nestedFailureMessageWithObject = {
  [FIELDS]: {
    a: `errorMessageForA`,
    b: {
      [FIELDS_FAILURE_MESSAGE]: `fieldsMessageForB`,
      [FIELDS]: {
        ba: `errorMessageForBA`,
      },
    },
    c: [`errorMessageForC`],
  },
}

export const nestedFailureMessageWithArray = {
  [FIELDS]: {
    a: `errorMessageForA`,
    b: {
      [CHILDREN]: [
        {
          [FIELDS]: {
            b1a: `errorMessageForB1A`,
            b1b: `errorMessageForB1A`,
          },
        },
        {
          [FIELDS_FAILURE_MESSAGE]: `fieldsMessageForB2`,
          [FIELDS]: {
            b2a: `errorMessageForB2B`,
          },
        },
      ],
    },
    c: `errorMessageForC`,
  },
}
