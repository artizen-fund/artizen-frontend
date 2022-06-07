export const isClient = () => typeof window !== 'undefined'

export const isServer = () => typeof window === 'undefined'

export function envString(key: keyof NodeJS.ProcessEnv): string {
  const value = process.env[key]
  if (value === undefined) {
    throw new Error(`The environment variable "${key}" cannot be undefined.`)
  }
  return value
}

export function envNumber(key: keyof NodeJS.ProcessEnv): number {
  const stringValue = envString(key)
  const numberValue = parseFloat(stringValue)
  if (Number.isNaN(numberValue)) {
    throw new Error(`The environment variable "${key}" has to hold a stringified number value - not ${stringValue}`)
  }
  return numberValue
}

export function envInt(key: keyof NodeJS.ProcessEnv): number {
  const stringValue = envString(key)
  const numberValue = parseInt(stringValue, 10)
  if (Number.isNaN(numberValue)) {
    throw new Error(`The environment variable "${key}" has to hold a stringified integer value - not ${stringValue}`)
  }
  return numberValue
}

export function envBool(key: keyof NodeJS.ProcessEnv): boolean {
  const value = envInt(key)
  return Boolean(value)
}
