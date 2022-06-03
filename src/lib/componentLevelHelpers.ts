/* Icons and Buttons have levels — 0, 1, 2 — to denote size classes.
 * Each level has different responsive window sizes.
 * This tool translates levels into the correct responsive pixel dimensions.
 *
 * Similar issue with gaps between glyphs and labels in Icons and Buttons.
 */

import { ResponsiveSize, Level } from '@theme'

export const sizeForLevel = (responsiveSize: ResponsiveSize, level?: keyof Level) => {
  const sizeSet: Record<ResponsiveSize, Record<keyof Level, number>> = {
    desktop: {
      0: 72,
      1: 56,
      2: 40,
    },
    laptop: {
      0: 64,
      1: 48,
      2: 32,
    },
    tablet: {
      0: 56,
      1: 40,
      2: 24,
    },
    mobile: {
      0: 56,
      1: 40,
      2: 24,
    },
  }
  return sizeSet[responsiveSize][level || 0]
}

export const gapForLevel = (responsiveSize: ResponsiveSize, level?: keyof Level) => {
  const sizeSet: Record<ResponsiveSize, Record<keyof Level, number>> = {
    desktop: {
      0: 16,
      1: 12,
      2: 12,
    },
    laptop: {
      0: 14,
      1: 10,
      2: 10,
    },
    tablet: {
      0: 22,
      1: 14,
      2: 14,
    },
    mobile: {
      0: 12,
      1: 8,
      2: 8,
    },
  }
  return sizeSet[responsiveSize][level || 0]
}
