import sinon from 'sinon';
import { validation as Validation } from 'folktale';

const { Success, Failure } = Validation;

export const stubReturnsSuccess = _ => sinon.spy(arg => Success(arg));
export const stubReturnsFailure = message => sinon.spy(_ => Failure([message]));
export const { spy, stub } = sinon;
