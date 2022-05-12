/*
  This helper accepts a description of a button, and returns the correct palette.
  
  usage: 
    buttonColor( 'light', 'foreground' ) // rgba( 255, 255, 255, 1 )
    buttonColor( 'light', 'foreground', { disabled  ) // rgba( 109, 120, 136, 1 )
    buttonColor( 'dark', 'background', { outline, disabled  ) // rgba( 255, 255, 255, 1 )
*/

import { rgba } from '@lib'

export const buttonColor = (
  scheme: 'light' | 'dark',
  key: 'foreground' | 'background' | 'border',
  options: {
    outline?: boolean | undefined
    disabled?: boolean | undefined
  },
) => rgba(buttonPalette[scheme][options.outline ? 'outline' : 'fill'][options.disabled ? 'disabled' : 'enabled'][key])

const buttonPalette = {
  light: {
    fill: {
      enabled: {
        foreground: 'white',
        background: 'slate',
        border: 'transparent',
      },
      disabled: {
        foreground: 'barracuda',
        background: 'stone',
        border: 'transparent',
      },
    },
    outline: {
      enabled: {
        foreground: 'night',
        background: 'white',
        border: 'slate',
      },
      disabled: {
        foreground: 'barracuda',
        background: 'white',
        border: 'stone',
      },
    },
  },
  dark: {
    fill: {
      enabled: {
        foreground: 'night',
        background: 'moon',
        border: 'transparent',
      },
      disabled: {
        foreground: 'barracuda',
        background: 'slate',
        border: 'transparent',
      },
    },
    outline: {
      enabled: {
        foreground: 'white',
        background: 'slate',
        border: 'moon',
      },
      disabled: {
        foreground: 'barracuda',
        background: 'white',
        border: 'barracuda',
      },
    },
  },
}
