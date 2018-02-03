import { prop, has } from 'ramda';

export const propName = prop(`name`);
export const propValue = prop(`value`);
export const propFields = prop(`fields`);
export const propChildren = prop(`children`);
export const propFieldsFailiureMessage = prop(`fieldsFailureMessage`);

export const hasPropChildren = has(`children`);
