/*
  This helper accepts a palette key or array of numbers, and an optional alpha value, and outputs a CSS rgba string.
  
  usage:
	rgba('coral') // rgba(255, 192, 161, 1)
	rgba('coral', 0.25) // rgba(255, 192, 161, 0.25)
	rgba([255, 0, 255]) // rgba(255, 0, 255, 1)
*/
import { palette, Palette } from '@theme'

export const rgba = (color: keyof Palette | Array<number> | 'transparent', alpha?: number) => {
  let rgb = ''
  switch (true) {
    case color === 'transparent':
      return `rgba(0, 0, 0, 0)`
    case typeof color === 'object' && color.length === 3:
      rgb = (color as Array<number>).join(',')
      break
    case Object.keys(palette).includes(color as string):
      rgb = palette[color as string].join(',')
      break
    default:
      throw `RGBA helper: invalid color “${color}”`
  }
  return `rgba(${rgb},${alpha ?? 1})`
}
