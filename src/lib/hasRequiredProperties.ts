const hasRequiredProperties = <T>(properties: Array<keyof T>, obj: T) => {
  return properties.every(requiredVar => !!obj[requiredVar])
}

export { hasRequiredProperties }
