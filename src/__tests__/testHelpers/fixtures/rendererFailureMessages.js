import FAILURE_FIELD_NAMES from '../../../const/failureFieldNames'
import {
  payload1,
  payload2,
  payload3,
  payload4,
  payload5,
  payload6,
} from './generic'

const { FIELDS_FAILURE_MESSAGE, FIELDS, CHILDREN } = FAILURE_FIELD_NAMES

export const flatFailureMessage = {
  [FIELDS_FAILURE_MESSAGE]: payload1,
  [FIELDS]: {
    a: payload2,
    b: payload3,
    c: payload4,
  },
}

export const nestedFailureMessageWithObject = {
  [FIELDS]: {
    a: payload1,
    b: {
      [FIELDS_FAILURE_MESSAGE]: payload2,
      [FIELDS]: {
        ba: payload3,
      },
    },
    c: payload4,
  },
}

export const nestedFailureMessageWithArray = {
  [FIELDS]: {
    a: payload1,
    b: {
      [CHILDREN]: {
        '1': {
          [FIELDS]: {
            b1a: payload2,
            b1b: payload3,
          },
        },
        '3': {
          [FIELDS_FAILURE_MESSAGE]: payload4,
          [FIELDS]: {
            b2a: payload5,
          },
        },
      },
    },
    c: payload6,
  },
}

export const nestedAndsContainingOrs = {
  [FIELDS]: {
    a: {
      and: [
        payload1,
        payload2,
        {
          or: [
            payload3,
            payload4,
            {
              and: [payload5, payload6],
            },
          ],
        },
      ],
    },
  },
}

export const nestedOrsContainingAnds = {
  [FIELDS]: {
    a: {
      or: [
        payload1,
        payload2,
        {
          and: [
            payload3,
            payload4,
            {
              or: [payload5, payload6],
            },
          ],
        },
      ],
    },
  },
}

export const nestedFailureMessageWithObjectAndNestedAnds = {
  [FIELDS]: {
    a: payload1,
    b: {
      and: [payload2, payload3],
    },
  },
}
