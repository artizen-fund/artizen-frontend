const assert = (input?: string, message?: string): string => {
  if (input === undefined) {
    throw new Error(`Input not found\n${message}`)
  }
  return input
}

const assertFloat = (input?: string, message?: string): number => {
  const envStr = assert(input, message)
  const numberValue = parseFloat(envStr)
  if (Number.isNaN(numberValue)) {
    throw new Error(`Input is not a valid float\n${message}`)
  }
  return numberValue
}

const assertInt = (input?: string, message?: string): number => {
  const envStr = assert(input, message)
  const intValue = parseInt(envStr, 10)
  if (Number.isNaN(intValue)) {
    throw new Error(`Input is not a valid integer\n${message}`)
  }
  return intValue
}

const assertBool = (input?: string, message?: string): boolean => {
  if (input === undefined) {
    console.warn(`Input is undefined\n${message}`)
    return false
  }

  // input might be 1, 0, 'true', or 'false'
  // test for string first…
  const envStr = assert(input, message)

  // if 'true', convert to 1
  // if 'false', assertInt('false') -> parseInt('false') -> undefined -> Boolean(undefined) -> false
  // and if number, cool, no problem
  const envInt = envStr === 'true' ? 1 : envStr === 'false' ? 0 : assertInt(envStr, message)
  return Boolean(envInt)
}

export { assert, assertInt, assertFloat, assertBool }
