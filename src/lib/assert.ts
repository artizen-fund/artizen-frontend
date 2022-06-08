const assert = (input?: string, message?: string): string => {
  if (input === undefined) {
    throw new Error(`Input not found\n${message}`)
  }
  return input
}

const assertFloat = (input?: string, message?: string): number => {
  const envStr = assert(input)
  const numberValue = parseFloat(envStr)
  if (Number.isNaN(numberValue)) {
    throw new Error(`Input is not a valid float\n${message}`)
  }
  return numberValue
}

const assertInt = (input?: string, message?: string): number => {
  const envStr = assert(input)
  const intValue = parseInt(envStr, 10)
  if (Number.isNaN(intValue)) {
    throw new Error(`Input is not a valid integer\n${message}`)
  }
  return intValue
}

const assertBool = (input?: string): boolean => {
  const envInt = assertInt(input)
  return Boolean(envInt)
}

export { assert, assertInt, assertFloat, assertBool }
