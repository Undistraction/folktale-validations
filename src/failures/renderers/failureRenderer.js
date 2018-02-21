import { inc, append, compose, cond, T, ifElse, when } from 'ramda'
import { isPlainObj, isNotUndefined, appendFlipped } from 'ramda-adjunct'
import { reduceObjIndexed } from '../../utils/iteration'
import {
  propFields,
  propChildren,
  propFieldsFailureMessage,
  hasPropChildren,
  propName,
  isAndOrOrObj,
  propScope,
} from '../../utils/failures'
import { throwInvalidFailureStructureMessage } from '../../errors'
import { isPayload } from '../../utils/payload'

export default rendererHelpers => failureObj => {
  const {
    renderObject,
    renderArray,
    renderArrayValue,
    renderAndOrMessages,
    renderPayload,
    renderObjectFieldsError,
    renderFieldNamePrefix,
  } = rendererHelpers

  // ---------------------------------------------------------------------------
  // Value
  // ---------------------------------------------------------------------------

  const processValue = (level, fieldValue, fieldName, scope) =>
    compose(
      renderFieldNamePrefix(level, fieldName, scope),
      cond([
        [isAndOrOrObj, renderAndOrMessages],
        [isPayload, renderPayload],
        // eslint-disable-next-line no-use-before-define
        [isPlainObj, processObjectOrArray(level)],
        [T, throwInvalidFailureStructureMessage],
      ])
    )(fieldValue)

  // ---------------------------------------------------------------------------
  // Array
  // ---------------------------------------------------------------------------

  const processArrayValues = level =>
    reduceObjIndexed((acc, [key, value]) => {
      const result = renderArrayValue(
        level,
        key,
        processValue(inc(level), value)
      )
      return append(result, acc)
    }, [])

  const processArray = level =>
    compose(renderArray, processArrayValues(inc(level)), propChildren)

  // ---------------------------------------------------------------------------
  // Object
  // ---------------------------------------------------------------------------

  const processObjectFields = (level, o) =>
    compose(
      reduceObjIndexed((acc, [fieldName, fieldValue]) => {
        const result = processValue(level, fieldValue, fieldName, propName(o))
        return appendFlipped(acc, result)
      }, []),
      propFields
    )(o)

  const processObjectFieldsErrorMessage = (level, o) =>
    compose(
      when(isNotUndefined, renderObjectFieldsError(level)),
      propFieldsFailureMessage
    )(o)

  const processObject = level => o =>
    renderObject(
      level,
      propScope(o),
      processObjectFields(level, o),
      processObjectFieldsErrorMessage(level, o)
    )

  // ---------------------------------------------------------------------------
  // Object or Array
  // ---------------------------------------------------------------------------

  const processObjectOrArray = level =>
    ifElse(hasPropChildren, processArray(level), processObject(level))

  return processValue(0, failureObj)
}
