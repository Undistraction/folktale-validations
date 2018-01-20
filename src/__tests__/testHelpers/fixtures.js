export const allValues = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notBooleanValues = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
];

export const notArrayValues = [
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notObjectValues = [
  [],
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notStringValues = [
  [],
  {},
  function() {},
  /x/,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notFunctionValues = [
  [],
  {},
  ``,
  /x/,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const func = () => {};
