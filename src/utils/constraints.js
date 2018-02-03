import { prop, has, pluck, propEq } from 'ramda';
import { CONSTRAINT_FIELD_NAMES } from '../const';

// -----------------------------------------------------------------------------
// Properties
// -----------------------------------------------------------------------------

export const propName = prop(CONSTRAINT_FIELD_NAMES.NAME);
export const propFields = prop(CONSTRAINT_FIELD_NAMES.FIELDS);
export const propChildren = prop(CONSTRAINT_FIELD_NAMES.CHILDREN);

export const hasPropChildren = has(CONSTRAINT_FIELD_NAMES.CHILDREN);
export const hasPropIsRequired = has(CONSTRAINT_FIELD_NAMES.IS_REQUIRED);

export const propEqName = propEq(CONSTRAINT_FIELD_NAMES.NAME);

export const pluckName = pluck(CONSTRAINT_FIELD_NAMES.NAME);
