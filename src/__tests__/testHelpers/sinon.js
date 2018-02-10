import sinon from 'sinon'
import { validation as Validation } from 'folktale'

const { Success, Failure } = Validation

export const stubReturnsSuccess = _ => sinon.spy(arg => Success(arg))
export const stubReturnsFailure = payload => sinon.spy(_ => Failure(payload))
export const stubReturns = value => sinon.stub().returns(value)
export const { spy, stub } = sinon
