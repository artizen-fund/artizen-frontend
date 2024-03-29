import styled, { css } from 'styled-components'
import Link from 'next/link'
import { buttonColor } from './Button.helpers'
import { Glyph } from '@components'
import { breakpoint, GlyphKey, typography, Level } from '@theme'
import { gapForLevel, sizeForLevel } from '@lib'

export interface ButtonProps {
  outline?: boolean
  inverted?: boolean
  transparent?: boolean
  disabled?: boolean
  level?: keyof Level
  stretch?: boolean

  /* actions for Button */
  onClick?: () => void

  /* actions for Label button */
  htmlFor?: string

  /* actions for Link */
  href?: string
  alt?: string
  target?: string

  /* optional glyph */
  glyph?: keyof GlyphKey
  glyphOnRight?: boolean
  glyphOnly?: boolean
  glyphRotation?: number

  className?: string
  children: React.ReactNode
}

const Button = ({
  children,
  href,
  glyph,
  glyphOnRight,
  glyphOnly,
  glyphRotation,
  level,
  outline,
  stretch,
  className,
  ...props
}: ButtonProps) => {
  const iClassName = `${className} ${props.disabled ? ' disabled' : ''}`
  if (!!href) {
    return (
      <Link
        {...{ href }}
        passHref
        target={props.target ? props.target : href.substring(0, 4) === 'http' ? '_blank' : '_top'}
      >
        <ButtonLink className={iClassName} {...{ level, outline, glyphOnly, glyphOnRight, stretch }} {...props}>
          {glyph && (
            <StyledGlyph
              {...{ glyph }}
              rotation={glyphRotation}
              color={outline ? 'night' : 'moon'}
              darkColor={outline ? 'moon' : 'night'}
              level={2}
            />
          )}
          <span>{children}</span>
        </ButtonLink>
      </Link>
    )
  }
  if (!!props.onClick) {
    return (
      <StyledButton className={iClassName} {...{ level, outline, glyphOnly, glyphOnRight, stretch }} {...props}>
        {glyph && (
          <StyledGlyph
            {...{ glyph }}
            rotation={glyphRotation}
            color={outline ? 'night' : 'moon'}
            darkColor={outline ? 'moon' : 'night'}
            level={2}
          />
        )}
        <span>{children}</span>
      </StyledButton>
    )
  }
  if (!!props.htmlFor) {
    return (
      <StyledLabel className={iClassName} {...{ level, outline, glyphOnly, glyphOnRight, stretch }} {...props}>
        {glyph && (
          <StyledGlyph
            {...{ glyph }}
            rotation={glyphRotation}
            color={outline ? 'night' : 'moon'}
            darkColor={outline ? 'moon' : 'night'}
            level={2}
          />
        )}
        <span>{children}</span>
      </StyledLabel>
    )
  }
  throw 'Error: requires link or button action.'
}

const StyledGlyph = styled(props => <Glyph {...props} />)<Pick<ButtonProps, 'glyphOnRight'>>``

export const ButtonStyle = css<Partial<ButtonProps>>`
  appearance: none;
  border: 0;
  outline: 0;
  position: relative;

  display: flex;
  flex-direction: ${props => (props.glyphOnRight ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: center;

  min-height: ${props => sizeForLevel('mobile', props.level || 0)}px;
  gap: ${props => gapForLevel('mobile', props.level)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    min-height: ${props => sizeForLevel('laptop', props.level || 0)}px;
    gap: ${props => gapForLevel('laptop', props.level)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    min-height: ${props => sizeForLevel('desktop', props.level || 0)}px;
    gap: ${props => gapForLevel('desktop', props.level)}px;
  }

  ${props => props.stretch && 'width: 100%;'}

  span {
    padding-top: 2px;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      padding-top: 2.5px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      padding-top: 3.5px;
    }
  }

  ${props =>
    props.glyphOnly
      ? `
      width: ${sizeForLevel('mobile', props.level || 0)}px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        width: ${sizeForLevel('laptop', props.level || 0)}px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        width: ${sizeForLevel('desktop', props.level || 0)}px;
      }
      span {
        display: none;
      }
    `
      : `
      padding: 0 ${props.level === 0 ? 40 : props.level === 1 ? 20 : 16}px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        padding: 0 ${props.level === 0 ? 48 : props.level === 1 ? 24 : 20}px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        padding: 0 ${props.level === 0 ? 56 : props.level === 1 ? 32 : 24}px;
      }
    `}

  border-radius: 9999px;
  border: ${props => (props.level === 2 ? 1 : 2)}px solid transparent;
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 144dpi) {
    border-width: ${props => (props.level === 2 ? 0.5 : 2)}px;
  }

  cursor: pointer;
  &:disabled,
  &.disabled {
    cursor: not-allowed;
  }

  transition: box-shadow 0.25s ease-in-out, background-color 0.25s ease-in-out, color 0.25s ease-in-out,
    border-color 0.25s ease-in-out, transform 0.4s cubic-bezier(0.42, 0.97, 0.52, 1.49);
`

const ButtonPalette = css<Partial<ButtonProps>>`
  color: ${props => buttonColor('light', 'foreground', { ...props })};
  background-color: ${props => buttonColor('light', 'background', { ...props })};
  border-color: ${props => buttonColor('light', 'border', { ...props })};
  ${StyledGlyph} {
    background-color: ${props => buttonColor('light', 'foreground', { ...props })};
  }
  &:disabled,
  &.disabled {
    color: ${props => buttonColor('light', 'foreground', { ...props })};
    background-color: ${props => buttonColor('light', 'background', { ...props })};
    border-color: ${props => buttonColor('light', 'border', { ...props })};
  }

  @media (prefers-color-scheme: dark) {
    color: ${props => buttonColor('dark', 'foreground', { ...props })};
    background-color: ${props => buttonColor('dark', 'background', { ...props })};
    border-color: ${props => buttonColor('dark', 'border', { ...props })};
    ${StyledGlyph} {
      background-color: ${props => buttonColor('dark', 'foreground', { ...props })};
    }
    &:disabled,
    &.disabled {
      color: ${props => buttonColor('dark', 'foreground', { ...props })};
      background-color: ${props => buttonColor('dark', 'background', { ...props })};
      border-color: ${props => buttonColor('dark', 'border', { ...props })};
    }
  }

  box-shadow: 0px 2px 8px rgba(0, 0, 0, ${props => (props.outline || props.transparent ? 0 : 0.12)});

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, ${props => (props.outline || props.transparent ? 0 : 0.16)});
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      ${props => !props.outline && !props.transparent && 'transform: translate3d(0, -4px, 0) scale3d(1.08, 1.04, 1);'}
    }
  }

  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, ${props => (props.transparent ? 0 : 0.4)});
    &:hover {
      box-shadow: 0px 4px 16px rgba(0, 0, 0, ${props => (props.transparent ? 0 : 0.48)});
    }
  }
`

export const ButtonTypography = css<Partial<ButtonProps>>`
  font-style: normal;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.5px;

  ${props => typography.label[props.level === 0 ? 'l0' : props.level === 1 ? 'l1' : 'l2']}
`

const ButtonLink = styled.div`
  ${() => ButtonStyle}
  ${() => ButtonPalette}
  ${() => ButtonTypography}
`

const StyledButton = styled.button`
  ${() => ButtonStyle}
  ${() => ButtonPalette}
  ${() => ButtonTypography}
`

const StyledLabel = styled.label`
  ${() => ButtonStyle}
  ${() => ButtonPalette}
  ${() => ButtonTypography}
`

export default Button
