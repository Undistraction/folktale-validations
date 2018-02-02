export const func = () => {};

export const flatErrorMessage = {
  fieldsError: `fieldsMessageForRoot`,
  fields: {
    a: `errorMessageForA`,
    b: `errorMessageForB`,
    c: `errorMessageForC`,
  },
};

export const nestedObjectErrorMessage = {
  fields: {
    a: `errorMessageForA`,
    b: {
      fieldsError: `fieldsMessageForB`,
      fields: {
        ba: `errorMessageForBA`,
      },
    },
    c: [`errorMessageForC`],
  },
};

export const nestedArrayErrorMessage = {
  fields: {
    a: `errorMessageForA`,
    b: {
      children: [
        {
          fields: {
            b1a: `errorMessageForB1A`,
            b1b: `errorMessageForB1A`,
          },
        },
        {
          fieldsError: `fieldsMessageForB2`,
          fields: {
            b2a: `errorMessageForB2B`,
          },
        },
      ],
    },
    c: `errorMessageForC`,
  },
};

export const deeplyNestedErrorMessage = {
  fields: {
    a: `errorMessageForA`,
    b: [
      {
        fields: {
          b1a: `errorMessageForBA`,
          b1b: {
            fields: {
              b1ba: `errorMessageForB1BA`,
            },
          },
        },
      },
      {
        fields: {
          b2a: `errorMessageForB2a`,
          b2b: [
            {
              b2b1a: `errorMessageForB2B1A`,
              b2b1b: `errorMessageForB2B1B`,
            },
          ],
        },
      },
    ],
    c: `errorMessageForC`,
  },
};
