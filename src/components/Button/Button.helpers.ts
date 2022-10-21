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
    inverted?: boolean | undefined
    transparent?: boolean | undefined
    disabled?: boolean | undefined
  },
) => {
  return buttonPalette[
    options.transparent && scheme === 'light'
      ? 'transparentLight'
      : options.transparent
      ? 'transparentDark'
      : options.inverted
      ? 'inverted'
      : scheme === 'dark'
      ? 'dark'
      : 'light'
  ][options.transparent ? 'fill' : options.outline ? 'outline' : 'fill'][options.disabled ? 'disabled' : 'enabled'][key]
}

const buttonPalette = {
  transparentLight: {
    fill: {
      enabled: {
        foreground: rgba('night'),
        background: 'transparent',
        border: 'transparent',
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: 'transparent',
        border: 'transparent',
      },
    },
    outline: {
      enabled: {
        foreground: rgba('night'),
        background: 'transparent',
        border: 'transparent',
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: 'transparent',
        border: 'transparent',
      },
    },
  },
  transparentDark: {
    fill: {
      enabled: {
        foreground: rgba('moon'),
        background: 'transparent',
        border: 'transparent',
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: 'transparent',
        border: 'transparent',
      },
    },
    outline: {
      enabled: {
        foreground: rgba('night'),
        background: 'transparent',
        border: 'transparent',
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: 'transparent',
        border: 'transparent',
      },
    },
  },
  light: {
    fill: {
      enabled: {
        foreground: rgba('white'),
        background: rgba('slate'),
        border: rgba('transparent'),
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: rgba('stone'),
        border: rgba('transparent'),
      },
    },
    outline: {
      enabled: {
        foreground: rgba('night'),
        background: 'transparent',
        border: rgba('slate'),
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: 'transparent',
        border: rgba('stone'),
      },
    },
  },
  inverted: {
    fill: {
      enabled: {
        foreground: rgba('night'),
        background: rgba('white'),
        border: rgba('transparent'),
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: rgba('barracuda', 0.4),
        border: rgba('transparent'),
      },
    },
    outline: {
      enabled: {
        foreground: rgba('white'),
        background: 'transparent',
        border: rgba('white'),
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: rgba('night'),
        border: rgba('barracuda'),
      },
    },
  },
  dark: {
    fill: {
      enabled: {
        foreground: rgba('night'),
        background: rgba('moon'),
        border: rgba('transparent'),
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: rgba('barracuda', 0.4),
        border: rgba('transparent'),
      },
    },
    outline: {
      enabled: {
        foreground: rgba('white'),
        background: 'transparent',
        border: rgba('moon'),
      },
      disabled: {
        foreground: rgba('barracuda'),
        background: rgba('slate'),
        border: rgba('barracuda'),
      },
    },
  },
}
