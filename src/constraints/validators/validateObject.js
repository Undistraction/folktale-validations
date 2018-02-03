import { curry, compose, juxt, of, concat } from 'ramda';
import untilFailureValidator from '../../helpers/untilFailureValidator';
import validateObjectKeys from './validateObjectKeys';
import applyDefaultsWithConstraints from '../applyDefaultsWithConstraints';
import transformValuesWithConstraints from '../transformValuesWithConstraints';
import { buildValidatorsMap, pluckName, listRequiredKeys } from '../utils';
import { compact } from '../../utils';
import validateFieldsWithValue from './validateFieldsWithValue';
import validateFieldsWithChildren from './validateFieldsWithChildren';

const defaultFieldValidators = validators =>
  juxt([
    compose(validators.validateWhitelistedKeys, pluckName),
    compose(validators.validateRequiredKeys, listRequiredKeys),
  ]);

const fieldsValidators = (validators, fields, fieldsValidator) =>
  compose(concat(defaultFieldValidators(validators)(fields)), compact, of)(
    fieldsValidator
  );

const validateObject = validators =>
  curry((fieldName, constraints, o) => {
    const { fields, fieldsValidator } = constraints;

    const r = untilFailureValidator([
      validators.validateIsObject,
      validateObjectKeys(fieldsValidators(validators, fields, fieldsValidator)),
      validators.validateObjectValues(buildValidatorsMap(fields)),
      applyDefaultsWithConstraints(fields),
      transformValuesWithConstraints(fields),
      validateFieldsWithValue(validateObject(validators), fields),
      validateFieldsWithChildren(validateObject(validators), fields),
    ])(o);

    return r;
  });
export default validateObject;

// 1. Not Object Error
// 2. keys Errors: [asda, asddadsa]
// 3. object Values error : { a: 1, b: 2}
