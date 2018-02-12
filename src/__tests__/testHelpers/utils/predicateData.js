import { prop, compose, reverse } from 'ramda'
import PREDICATE_DATA_FIELD_NAMES from '../../../const/predicateDataFieldNames'

import { mapObjIndexedWithIndex } from '../../../utils/iteration'

export const propValue = prop(PREDICATE_DATA_FIELD_NAMES.VALUE)
export const propValues = prop(PREDICATE_DATA_FIELD_NAMES.VALUES)
export const propValidators = prop(PREDICATE_DATA_FIELD_NAMES.VALIDATORS)
export const propUIDs = prop(PREDICATE_DATA_FIELD_NAMES.UIDS)

export const prepareTestData = validatorPair =>
  mapObjIndexedWithIndex((validator, name, o, i) => {
    const testValues =
      i === 0
        ? propValues(validatorPair)
        : compose(reverse, propValues)(validatorPair)
    return [propUIDs(validatorPair)[i], name, validator, ...testValues]
  }, propValidators(validatorPair))
