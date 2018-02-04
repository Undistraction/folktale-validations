import { FAILURE_FIELD_NAMES } from '../../const'

const { FIELDS_FAILURE_MESSAGE, FIELDS, CHILDREN } = FAILURE_FIELD_NAMES

export const func = () => {}

export const flatErrorMessage = {
  [FIELDS_FAILURE_MESSAGE]: `fieldsMessageForRoot`,
  [FIELDS]: {
    a: `errorMessageForA`,
    b: `errorMessageForB`,
    c: `errorMessageForC`,
  },
}

export const nestedObjectErrorMessage = {
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

export const nestedArrayErrorMessage = {
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

// export const deeplyNestedErrorMessage = {
//   [FIELDS]: {
//     a: `errorMessageForA`,
//     b: [
//       {
//         [FIELDS]: {
//           b1a: `errorMessageForBA`,
//           b1b: {
//             [FIELDS]: {
//               b1ba: `errorMessageForB1BA`,
//             },
//           },
//         },
//       },
//       {
//         [FIELDS]: {
//           b2a: `errorMessageForB2a`,
//           b2b: [
//             {
//               b2b1a: `errorMessageForB2B1A`,
//               b2b1b: `errorMessageForB2B1B`,
//             },
//           ],
//         },
//       },
//     ],
//     c: `errorMessageForC`,
//   },
// };
