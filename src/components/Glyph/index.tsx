import styled from 'styled-components'
import { rgba, assetPath } from '@lib'
import { breakpoint, palette, Palette, GlyphKey, Level } from '@theme'
import { responsiveGlyphSize, maskPath } from './Glyph.helpers'

/* note:
 *   "level" is when this glyph is part of an <Icon /> or <Button />, which has 0 — 2 classifications.
 *   The responsiveGlyphSize helper negotiates the actual responsive pixel sizes from levels.
 *
 *   "size" refers to size in pixels, used when a glyph is a decorator for a Button or some other component.
 */

export interface GlyphProps {
  glyph: keyof GlyphKey
  size?: number
  level?: keyof Level
  color?: keyof Palette
  darkColor?: keyof Palette
  outline?: boolean
}

export const Glyph = styled.div<GlyphProps>`
  position: relative;
  mask-repeat: no-repeat;
  mask-position: center;
  text-indent: -1000px;
  overflow: hidden;
  transition: background 0.35s ease-in-out;
  background-color: ${props => rgba(props.color || palette.night)};
  @media (prefers-color-scheme: dark) {
    background-color: ${props => rgba(props.darkColor || palette.moon)};
  }
  ${props =>
    props.size
      ? `
        mask-image: url(${assetPath(
          `/glyphs/${props.children}/${props.size}/${props.outline ? 'outline' : 'solid'}.svg`,
        )});
        mask-size: ${props.size}px ${props.size}px;
        width: ${props.size}px;
        height: ${props.size}px;
      `
      : `
        --iconSize: ${responsiveGlyphSize('mobile', props.level)}px;
        mask-image: url(${maskPath('mobile', props.glyph, props.level, props.outline)});
        
        @media only screen and (min-width: ${breakpoint.laptop}px) {
        --iconSize: ${responsiveGlyphSize('laptop', props.level)}px;
          mask-image: url(${maskPath('laptop', props.glyph, props.level, props.outline)});
        }
        
        @media only screen and (min-width: ${breakpoint.desktop}px) {
          --iconSize: ${responsiveGlyphSize('desktop', props.level)}px;
          mask-image: url(${maskPath('desktop', props.glyph, props.level, props.outline)});
        }
        mask-size: var(--iconSize);
        width: var(--iconSize);
        height: var(--iconSize);
      `}
`

export default Glyph
