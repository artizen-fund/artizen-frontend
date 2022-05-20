import styled, { css } from 'styled-components'
import Link from 'next/link'
import { breakpoint } from '@theme'
import { buttonColor } from './Button.helpers'
import { Icon } from '@components'
import { IconKey, typeface } from '@theme'

export interface ButtonProps {
  outline?: boolean
  small?: boolean

  /* actions for Button */
  onClick?: () => void

  /* actions for Link */
  href?: string
  alt?: string
  target?: string

  /* optional icon */
  icon?: keyof IconKey
  iconOnRight?: boolean

  /* label and misc */
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

const Button = ({ children, href, icon, iconOnRight, ...props }: ButtonProps) => {
  if (!!href) {
    const className = `${props.className} ${props.disabled ? ' disabled' : ''}`
    return (
      <Link {...{ href }}>
        <ButtonLink {...props} {...{ className }}>
          {icon && (
            <StyledIcon {...{ iconOnRight }} size={props.small ? 'small' : undefined}>
              {icon}
            </StyledIcon>
          )}
          {children}
        </ButtonLink>
      </Link>
    )
  }
  if (!!props.onClick) {
    return (
      <StyledButton {...props}>
        {icon && (
          <StyledIcon {...{ iconOnRight }} size={props.small ? 'small' : undefined}>
            {icon}
          </StyledIcon>
        )}
        {children}
      </StyledButton>
    )
  }
  throw 'Error: requires link or button action.'
}

const StyledIcon = styled(props => <Icon {...props} />)<Pick<ButtonProps, 'iconOnRight'>>`
  position: absolute;
  height: 100% !important;
  top: 0;
  ${props => (props.iconOnRight ? 'right' : 'left')}: 17px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    ${props => (props.iconOnRight ? 'right' : 'left')}: 27px;
  }
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
  padding: 0px;

  width: ${props => (props.small ? 110 : 124)}px;
  height: ${props => (props.small ? 24 : 40)}px;
  font-size: 16px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: ${props => (props.small ? 124 : 168)}px;
    height: ${props => (props.small ? 31 : 48)}px;
    font-size: 17px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: ${props => (props.small ? 138 : 166)}px;
    height: ${props => (props.small ? 40 : 56)}px;
    font-size: 18px;
  }

  border-radius: 9999px;
  border: 2px solid transparent;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0);
  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  }

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
`

const ButtonTypography = css<Partial<ButtonProps>>`
  font-style: normal;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.5px;

  font-size: ${props => (props.small ? 12 : 13)}px;
  line-height: ${props => (props.small ? 17 : 19)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    font-size: ${props => (props.small ? 13 : 15)}px;
    line-height: ${props => (props.small ? 19 : 22)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    font-size: ${props => (props.small ? 14 : 16)}px;
    line-height: ${props => (props.small ? 20 : 23)}px;
  }
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
