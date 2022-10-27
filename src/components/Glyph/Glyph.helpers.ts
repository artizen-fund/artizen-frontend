import { ResponsiveSize, GlyphKey, Level } from '@theme'
import { assetPath } from '@lib'

export const responsiveGlyphSize = (responsiveSize: ResponsiveSize, level?: keyof Level) => {
  const sizeSet: Record<ResponsiveSize, Record<keyof Level, number>> = {
    desktop: {
      0: 24,
      1: 20,
      2: 16,
    },
    laptopXL: {
      0: 20,
      1: 16,
      2: 16,
    },
    laptop: {
      0: 20,
      1: 16,
      2: 16,
    },
    tablet: {
      0: 16,
      1: 12,
      2: 12,
    },
    phablet: {
      0: 16,
      1: 12,
      2: 12,
    },
    mobile: {
      0: 16,
      1: 12,
      2: 12,
    },
  }
  return sizeSet[responsiveSize][level || 0]
}

export const maskPath = (
  responsiveSize: ResponsiveSize,
  glyph: keyof GlyphKey,
  level?: keyof Level,
  outline?: boolean,
) =>
  assetPath(
    `/assets/glyphs/${glyph}/${responsiveGlyphSize(responsiveSize, level)}/${outline ? 'outline' : 'solid'}.svg`,
  )
