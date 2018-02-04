import { fromPairs, compose, mergeAll, objOf, assoc, of, map } from 'ramda';
import { FAILURE_FIELD_NAMES } from '../const';
import { propValue } from '../utils/failures';

const { FIELDS_FAILURE_MESSAGE, FIELDS, CHILDREN, NAME } = FAILURE_FIELD_NAMES;

export const toObjectError = compose(objOf(FIELDS), mergeAll, fromPairs);

export const toObjectFieldsError = objOf(FIELDS_FAILURE_MESSAGE);

export const addObjectName = assoc(NAME);

export const toConstraintsError = compose(assoc(`name`, `constraints`));

export const toArrayError = objOf(CHILDREN, of);

const failuresToChildren = map(compose(objOf(CHILDREN), map(propValue)));

export const toChildrenFieldsError = compose(objOf(FIELDS), failuresToChildren);
