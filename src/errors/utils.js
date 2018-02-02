import { fromPairs, compose, mergeAll, objOf, assoc } from 'ramda';
import { constraintsObjPrefix } from '../messages';
import { FAILURE_FIELD_NAMES } from '../const';

const { FIELDS_FAILURE_MESSAGE, FIELDS } = FAILURE_FIELD_NAMES;

export const toObjectError = compose(objOf(FIELDS), mergeAll, fromPairs);

export const toObjectFieldsError = objOf(FIELDS_FAILURE_MESSAGE);

export const addObjectName = assoc(`name`);

export const toConstraintsError = objOf(constraintsObjPrefix());
