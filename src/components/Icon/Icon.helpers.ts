import { ResponsiveSize, Level } from '@theme'

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
