import { rgba } from '@lib'

describe('rgbaUtility', () => {
  it('interprets a palette key', () => {
    const parsedColor = rgba('black')
    expect(parsedColor).toEqual('rgba(0,0,0,1)')
  })
  it('interprets a palette key and alpha', () => {
    const parsedColor = rgba('black', 0.5)
    expect(parsedColor).toEqual('rgba(0,0,0,0.5)')
  })
  it('interprets an array of numbers', () => {
    const parsedColor = rgba([0, 0, 0])
    expect(parsedColor).toEqual('rgba(0,0,0,1)')
  })
  it('interprets an array of numbers and alpha', () => {
    const parsedColor = rgba([0, 0, 0], 0.5)
    expect(parsedColor).toEqual('rgba(0,0,0,0.5)')
  })
  it('throws on an invalid key', () => {
    expect(() => rgba('derp')).toThrow('RGBA helper: invalid color “derp”')
  })
})
