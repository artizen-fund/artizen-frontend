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
  rotation?: number
  outline?: boolean
  animating?: boolean
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
    props.rotation &&
    `
    transform: rotateZ(${props.rotation}deg);
  `}
  ${props =>
    props.size
      ? `
        mask-image: url(${assetPath(
          `/assets/glyphs/${props.glyph}/${props.size}/${props.outline ? 'outline' : 'solid'}.svg`,
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
        mask-size: var(--iconSize) var(--iconSize);
        width: var(--iconSize);
        height: var(--iconSize);
      `}
  
  @keyframes spin {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  @keyframes throb {
    0% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1.1);
    }
  }

  @keyframes wiggle {
    0% {
      transform: rotateZ(15deg);
    }
    50% {
      transform: rotateZ(-10deg);
    }
    100% {
      transform: rotateZ(15deg);
    }
  }

  @keyframes roll {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(360deg);
    }
  }

  ${props =>
    props.animating &&
    ['refresh'].includes(props.glyph) &&
    `
    animation: 3s infinite spin;
  `}
  ${props =>
    props.animating &&
    ['tick', 'intersect'].includes(props.glyph) &&
    `
    animation: 1s infinite throb;
  `}
  ${props =>
    props.animating &&
    ['party'].includes(props.glyph) &&
    `
    animation: 1s infinite wiggle;
  `}
  ${props =>
    props.animating &&
    ['swap'].includes(props.glyph) &&
    `
    animation: 1s infinite roll;
  `}
`

export default Glyph
