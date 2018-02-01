import { curry, compose, juxt, of, concat } from 'ramda';
import { validation as Validation } from 'folktale';
import untilFailureValidator from '../../helpers/untilFailureValidator';
import validateObjectKeys from './validateObjectKeys';
import applyDefaultsWithConstraints from '../applyDefaultsWithConstraints';
import transformValuesWithConstraints from '../transformValuesWithConstraints';
import { buildValidatorsMap, pluckName, listRequiredKeys } from '../utils';
import validatorsWithMessages from '../../defaults/validatorsWithMessages';
import { compact } from '../../utils';
import validateFieldsWithValue from './validateFieldsWithValue';
import validateFieldsWithChildren from './validateFieldsWithChildren';
import { objectErrorMessageWrapper } from '../../messages';

const { Failure } = Validation;

const defaultFieldValidators = juxt([
  compose(validatorsWithMessages.validateWhitelistedKeys, pluckName),
  compose(validatorsWithMessages.validateRequiredKeys, listRequiredKeys),
]);

const fieldsValidators = (fields, fieldsValidator) =>
  compose(concat(defaultFieldValidators(fields)), compact, of)(fieldsValidator);

export default curry((fieldName, constraints, o) => {
  const { fields, fieldsValidator } = constraints;
  return untilFailureValidator([
    validatorsWithMessages.validateIsObject,
    validateObjectKeys(fieldsValidators(fields, fieldsValidator)),
    validatorsWithMessages.validateObjectValues(buildValidatorsMap(fields)),
    applyDefaultsWithConstraints(fields),
    transformValuesWithConstraints(fields),
    validateFieldsWithValue(fields),
    validateFieldsWithChildren(fields),
  ])(o).orElse(compose(objectErrorMessageWrapper(fieldName), Failure));
});
