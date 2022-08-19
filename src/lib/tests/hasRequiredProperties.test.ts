import { hasRequiredProperties } from '@lib'

describe('hasRequiredProperties', () => {
  interface TestObject {
    requiredField?: string
    nonRequiredField?: string
  }

  it('denies an unfilled object', () => {
    const testObject: TestObject = {
      requiredField: undefined,
      nonRequiredField: 'herpderp',
    }
    const passes = hasRequiredProperties(['requiredField'], testObject)
    expect(passes).toBeFalsy
  })

  it('passes an filled object', () => {
    const testObject: TestObject = {
      requiredField: 'herpderp',
      nonRequiredField: 'dorpdoop',
    }
    const passes = hasRequiredProperties(['requiredField'], testObject)
    expect(passes).toBeTruthy
  })
})
