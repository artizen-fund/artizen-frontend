import styled, { css } from 'styled-components'
import Link from 'next/link'
import { breakpoint } from '@theme'
import { buttonColor } from './Button.helpers'
import { Icon } from '@components'
import { IconKey, typography } from '@theme'

export interface ButtonProps {
  outline?: boolean
  inverted?: boolean
  size?: 'l0' | 'l1' | 'l2'
  stretch?: boolean

  /* actions for Button */
  onClick?: () => void

  /* actions for Link */
  href?: string
  alt?: string
  target?: string

  /* optional icon */
  icon?: keyof IconKey
  iconOnRight?: boolean
  iconOnly?: boolean

  /* label and misc */
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

const Button = ({
  children,
  href,
  icon,
  iconOnRight,
  iconOnly,
  size,
  outline,
  stretch,
  className,
  ...props
}: ButtonProps) => {
  const iClassName = `${className} ${props.disabled ? ' disabled' : ''}`
  if (!!href) {
    return (
      <Link {...{ href }}>
        <ButtonLink className={iClassName} {...{ size, outline, iconOnly, stretch }} {...props}>
          {icon && !iconOnRight && <StyledIcon color="white">{icon}</StyledIcon>}
          <span>{children}</span>
          {icon && !!iconOnRight && <StyledIcon color="white">{icon}</StyledIcon>}
        </ButtonLink>
      </Link>
    )
  }
  if (!!props.onClick) {
    return (
      <StyledButton className={iClassName} {...{ size, outline, iconOnly, stretch }} {...props}>
        {icon && !iconOnRight && <StyledIcon color="white">{icon}</StyledIcon>}
        <span>{children}</span>
        {icon && !!iconOnRight && <StyledIcon color="white">{icon}</StyledIcon>}
      </StyledButton>
    )
  }
  throw 'Error: requires link or button action.'
}

const StyledIcon = styled(props => <Icon {...props} />)<Pick<ButtonProps, 'iconOnRight'>>`
  height: 100% !important;
`

const ButtonStyle = css<Partial<ButtonProps>>`
  appearance: none;
  border: 0;
  outline: 0;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: ${props => (props.size === 'l0' ? 56 : props.size === 'l1' ? 40 : 24)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: ${props => (props.size === 'l0' ? 64 : props.size === 'l1' ? 48 : 31)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: ${props => (props.size === 'l0' ? 72 : props.size === 'l1' ? 56 : 40)}px;
  }

  ${props => props.stretch && `width: 100%;`}

  ${props =>
    props.iconOnly
      ? `
      width: ${props.size === 'l0' ? 56 : props.size === 'l1' ? 40 : 24}px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        width: ${props.size === 'l0' ? 64 : props.size === 'l1' ? 48 : 31}px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        width: ${props.size === 'l0' ? 72 : props.size === 'l1' ? 56 : 40}px;
      }
      span {
        display: none;
      }
      `
      : `
      padding: 0 ${props.size === 'l0' ? 40 : props.size === 'l1' ? 20 : 16}px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        padding: 0 ${props.size === 'l0' ? 48 : props.size === 'l1' ? 24 : 20}px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        padding: 0 ${props.size === 'l0' ? 56 : props.size === 'l1' ? 32 : 24}px;
      }
  `}

  border-radius: 9999px;
  border: ${props => (props.size === 'l2' ? 0.5 : 2)}px solid transparent;

  cursor: pointer;
  &:disabled,
  &.disabled {
    cursor: not-allowed;
  }

  transition: box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out, color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
`

const ButtonPalette = css<Partial<ButtonProps>>`
  color: ${props => buttonColor('light', 'foreground', { ...props })};
  background-color: ${props => buttonColor('light', 'background', { ...props })};
  border-color: ${props => buttonColor('light', 'border', { ...props })};
  ${StyledIcon} {
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
    ${StyledIcon} {
      background-color: ${props => buttonColor('dark', 'foreground', { ...props })};
    }
    &:disabled,
    &.disabled {
      color: ${props => buttonColor('dark', 'foreground', { ...props })};
      background-color: ${props => buttonColor('dark', 'background', { ...props })};
      border-color: ${props => buttonColor('dark', 'border', { ...props })};
    }
  }

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  }
  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
    &:hover {
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.48);
    }
  }
`

const ButtonTypography = css<Partial<ButtonProps>>`
  font-style: normal;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.5px;

  ${props => typography.label[props.size!]};
`

const ButtonLink = styled.a`
  ${() => ButtonStyle}
  ${() => ButtonPalette}
  ${() => ButtonTypography}
`

const StyledButton = styled.button`
  ${() => ButtonStyle}
  ${() => ButtonPalette}
  ${() => ButtonTypography}
`

export default Button
