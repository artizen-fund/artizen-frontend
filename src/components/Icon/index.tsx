import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba, sizeForLevel } from '@lib'
import { breakpoint, palette, Palette, GlyphKey, Level, typography } from '@theme'
import { gapForLevel } from './Icon.helpers'

export interface IconProps {
  glyph: keyof GlyphKey
  level?: keyof Level
  outline?: boolean
  inverted?: boolean
  label?: string
}

const Icon = ({ glyph, level, outline, inverted, label }: IconProps) => {
  const color = (!outline && !inverted) || (outline && inverted) ? 'white' : 'night'
  const darkColor = outline ? 'moon' : 'night'
  return (
    <Wrapper {...{ level }}>
      <Circle {...{ outline, level, inverted, color, darkColor }}>
        <Glyph {...{ glyph, level, color, darkColor }} />
      </Circle>
      {label && <Label color={inverted ? 'white' : 'night'}>{label}</Label>}
    </Wrapper>
  )
}

type CircleProps = Pick<IconProps, 'level' | 'outline' | 'inverted'> & {
  color: keyof Palette
  darkColor: keyof Palette
}

const Circle = styled.div<CircleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => sizeForLevel('mobile', props.level || 0)}px;
  height: ${props => sizeForLevel('mobile', props.level || 0)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: ${props => sizeForLevel('laptop', props.level || 0)}px;
    height: ${props => sizeForLevel('laptop', props.level || 0)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: ${props => sizeForLevel('desktop', props.level || 0)}px;
    height: ${props => sizeForLevel('desktop', props.level || 0)}px;
  }

  border: 2px solid;
  border-radius: 9999px;

  border-color: ${props => rgba(props.inverted ? palette.white : palette[props.color])};
  ${props =>
    !props.outline &&
    `
    background: ${props.inverted ? rgba(palette.white) : rgba(palette.night)};
  `}
  @media (prefers-color-scheme: dark) {
    border-color: ${props => rgba(palette[props.darkColor])};
    ${props =>
      !props.outline &&
      `
      background: ${rgba(palette.moon)};
    `}
  }
`

const Label = styled.div<{ color: keyof Palette }>`
  ${typography.label.l2}
  color: ${props => rgba(palette[props.color])};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

const Wrapper = styled.div<Pick<IconProps, 'level'>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${props => gapForLevel('mobile', props.level)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: ${props => gapForLevel('laptop', props.level)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: ${props => gapForLevel('desktop', props.level)}px;
  }
`

export default Icon
