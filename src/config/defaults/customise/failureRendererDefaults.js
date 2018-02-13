import { always } from 'ramda'

module.exports = {
  KEY: always(`Key`),
  ARGUMENTS: always(`Arguments`),
  OBJECT: always(`Object`),
  ARRAY: always(`Array`),
  AND: always(`and`),
  OR: always(`or`),
  INVALID_VALUES_MESSAGE: always(`included invalid value(s)`),
}
