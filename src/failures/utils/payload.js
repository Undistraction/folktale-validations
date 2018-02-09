import { prop, has, allPass } from 'ramda'
import { isPlainObj } from 'ramda-adjunct'
import { PAYLOAD_FIELD_NAMES } from '../../const'

const { UID, VALUE, ARGS } = PAYLOAD_FIELD_NAMES

export const propUid = prop(UID)
export const propValue = prop(VALUE)
export const propArgs = prop(ARGS)

export const hasUID = has(UID)
export const hasValue = has(VALUE)
export const hasArgs = has(ARGS)

export const isPayload = allPass([isPlainObj, hasUID, hasValue, hasArgs])
