/*
  This helper accepts palette key colors, and outputs a media query string for light and dark schemes.
  
  usage:
    
    schemeColors('white', 'black')
      // color: rgba(255, 255, 255, 1);
      // @media (prefers-color-scheme: dark) {
      //   color: rgba(0, 0, 0, 1);
      // }
  
    schemeColors('white', 'black', { background: true })
      // background-color: rgba(255, 255, 255, 1);
      // @media (prefers-color-scheme: dark) {
      //   background-color: rgba(0, 0, 0, 1);
      // }
  
    schemeColors('white', 'black', { background: true, alpha: 0.5 })
      // background-color: rgba(255, 255, 255, 0.5);
      // @media (prefers-color-scheme: dark) {
      //   background-color: rgba(0, 0, 9, 0.5);
      // }
*/
import { rgba } from '@lib'
import { palette, Palette } from '@theme'

interface SchemeColorsOptions {
  background?: boolean
  alpha?: number
}

export const schemeColors = (
  lightSchemeColor?: keyof Palette,
  darkSchemeColor?: keyof Palette,
  options?: SchemeColorsOptions,
) => {
  console.log('!', lightSchemeColor, darkSchemeColor)
  const colorType = options?.background ? 'background-color' : 'color'
  const parsedLightColor = rgba(
    lightSchemeColor && lightSchemeColor in palette ? lightSchemeColor : [0, 0, 0],
    options?.alpha,
  )
  const parsedDarkColor = rgba(
    darkSchemeColor && darkSchemeColor in palette ? darkSchemeColor : [255, 255, 255],
    options?.alpha,
  )
  return `
    ${colorType}: ${parsedLightColor};
    @media (prefers-color-scheme: dark) {
      ${colorType}: ${parsedDarkColor};
    }
  `
}
