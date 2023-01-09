import styled from 'styled-components'
import { Glyph, Shimmer } from '@components'
import { breakpoint, palette, Palette, GlyphKey, Level, typography } from '@theme'
import { rgba, gapForLevel, sizeForLevel } from '@lib'

export interface IconProps {
  glyph: keyof GlyphKey
  glyphOutline?: boolean
  level?: keyof Level
  outline?: boolean
  inverted?: boolean
  label?: string
  color?: string
  darkColor?: string
  animating?: boolean
  error?: boolean
  loading?: boolean
}

const Icon = ({
  glyph,
  glyphOutline,
  level,
  outline,
  inverted,
  color,
  darkColor,
  label,
  animating,
  error,
  loading,
  ...props
}: IconProps) => {
  const calculatedColor =
    !outline && error ? 'uiAlert' : color ? color : (!outline && !inverted) || (outline && inverted) ? 'white' : 'night'
  const calculatedDarkColor =
    !outline && error ? 'uiAlert' : darkColor ? darkColor : color ? color : outline ? 'moon' : 'night'
  return (
    <Wrapper {...{ level }} {...props}>
      {loading ? (
        <IconShimmer {...{ level }} />
      ) : (
        <Circle {...{ outline, level, inverted }} color={calculatedColor} darkColor={calculatedDarkColor}>
          <Glyph
            {...{ glyph, level, animating }}
            outline={glyphOutline}
            color={calculatedColor}
            darkColor={calculatedDarkColor}
          />
        </Circle>
      )}
      {!!label && loading ? (
        <Shimmer />
      ) : !!label ? (
        <Label
          color={!outline && error ? 'uiAlert' : inverted ? 'white' : 'night'}
          darkColor={!outline && error ? 'uiAlert' : 'moon'}
        >
          {label}
        </Label>
      ) : (
        <></>
      )}
    </Wrapper>
  )
}

type CircleProps = Pick<IconProps, 'level' | 'outline' | 'inverted'> & {
  color: keyof Palette
  darkColor: keyof Palette
}

const Circle = styled.div<CircleProps>`
  display: flex;
  flex-basis: 1;
  justify-content: center;
  align-items: center;
  width: ${props => sizeForLevel('mobile', props.level || 0)}px;
  height: 100%;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: ${props => sizeForLevel('laptop', props.level || 0)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: ${props => sizeForLevel('desktop', props.level || 0)}px;
  }
  border-radius: 9999px;

  border: 2px solid;

  border-color: ${props => rgba(props.outline ? palette[props.color] : 'transparent')};

  background: ${props =>
    !props.inverted && !props.outline ? rgba(palette.night) : props.outline ? 'transparent' : rgba(palette.white)};

  @media (prefers-color-scheme: dark) {
    border-color: ${props => rgba(props.outline ? palette[props.darkColor] : 'transparent')};
    background: ${props => (!props.outline ? rgba(palette.moon) : 'transparent')};
  }
`

const Label = styled.div<{ color: keyof Palette; darkColor: keyof Palette }>`
  flex: 1;
  ${typography.label.l2}
  color: ${props => rgba(palette[props.color])};
  @media (prefers-color-scheme: dark) {
    color: ${props => rgba(palette[props.darkColor])};
  }
`

const Wrapper = styled.div<Pick<IconProps, 'level'>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: ${props => sizeForLevel('mobile', props.level || 0)}px;
  gap: ${props => gapForLevel('mobile', props.level)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: ${props => sizeForLevel('laptop', props.level || 0)}px;
    gap: ${props => gapForLevel('laptop', props.level)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: ${props => sizeForLevel('desktop', props.level || 0)}px;
    gap: ${props => gapForLevel('desktop', props.level)}px;
  }
`

const IconShimmer = styled(props => <Shimmer {...props} />)`
  height: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${props => sizeForLevel('mobile', props.level || 0)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    flex-basis: ${props => sizeForLevel('laptop', props.level || 0)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    flex-basis: ${props => sizeForLevel('desktop', props.level || 0)}px;
  }
  border-radius: 9999px;
`

export default Icon
