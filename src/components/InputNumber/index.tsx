import React from 'react'
import styled from 'styled-components'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels } from '@jsonforms/core'
import { Icon, Spinner } from '@components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export interface InputNumberProps {
  name?: string
  type?: 'textarea' | 'select' | 'text' | 'email' | 'password'
  icon?: string
  invalid?: boolean
  label: string | Labels
  disabled?: boolean
  processing?: boolean
  onChange?: (e: any) => void
  value?: string
  required?: boolean
  options?: Array<string> | Record<string, string>
  outline?: boolean
  emptyFirstOption?: boolean
  inputRef?: any
  autoComplete?: string
  capitalize?: boolean
}

const InputNumber = React.forwardRef((props: InputNumberProps) => {
  const {
    icon,
    label,
    outline = true,
    onChange,
    value,
    disabled = false,
    processing = false,
    required = false,
    inputRef,
    autoComplete,
  } = props
  const hasIcon = !!icon
  const valid = false

  return (
    <Wrapper>
      {icon && <StyledIcon>{icon}</StyledIcon>}

      <Spinner hidden={!processing} />

      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input
          {...{ onChange, disabled, required, value, autoComplete }}
          placeholder=" "
          ref={inputRef}
          type="number"
        />
        <Label {...{ hasIcon }} className={valid ? 'valid' : ''}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
    </Wrapper>
  )
})

// Styling

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`

const StyledIcon = styled(props => <Icon {...props} />)`
  z-index: 2;
  position: absolute;
  top: 0;
  right: 16px;
  bottom: 0;
  margin: auto 0;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    right: 24px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    right: 32px;
  }
`

const Label = styled.label<Pick<InputNumberProps, 'type' | 'icon'>>`
  position: absolute;
  left: 16px;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  width: calc(100% - 32px);

  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }

  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  transform-origin: center left;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
  will-change: color, transform;
  pointer-events: none;

  input:focus ~ &,
  input:not(:placeholder-shown) ~ &,
  input:required:valid ~ &,
  &.valid {
    transform: translate3d(0, -12px, 0) scale3d(0.8, 0.8, 1);
    color: ${rgba(palette.night, 0.8)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon, 0.8)};
    }
  }

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    ${props =>
      props.type === 'textarea' &&
      `
      padding-top: 32px;
    `}
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    left: 24px;
    width: calc(100% - 48px);
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: 32px;
    width: calc(100% - 64px);
  }
`

const InputWrapper = styled.div<{
  hasIcon: boolean
  disabled: boolean
  outline: boolean
}>`
  position: relative;
  input,
  textarea,
  select.custom {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => (props.outline ? rgba(palette.moon, 0.8) : 'transparent')};
    @media (prefers-color-scheme: dark) {
      background-color: ${props => (props.outline ? rgba(palette.night, 0.8) : 'transparent')};
    }
    width: 100%;
    height: 56px;
    border: ${props => (props.outline ? 1 : 0)}px solid ${rgba(palette.night, 0.32)};
    @media (prefers-color-scheme: dark) {
      border: ${props => (props.outline ? 1 : 0)}px solid ${rgba(palette.moon, 0.32)};
    }
    border-radius: 0;
    outline: none;
    color: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon)};
    }
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    will-change: background, border;
    pointer-events: ${props => (props.disabled ? 'none' : 'inherit')};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    appearance: none;
    text-indent: 0;

    padding: 18px ${props => (props.hasIcon ? 48 : 16)}px 0 16px;
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      padding-right: ${props => (props.hasIcon ? 56 : 16)}px;
    }

    @media only screen and (min-width: ${breakpoint.laptop}px) {
      height: 64px;
      padding: 20px ${props => (props.hasIcon ? 72 : 24)}px 0 24px;
    }

    @media only screen and (min-width: ${breakpoint.desktop}px) {
      height: 72px;
      padding: 22px ${props => (props.hasIcon ? 88 : 32)}px 0 32px;
    }
  }

  input:focus {
    background-color: ${rgba(palette.white)};
    ${props => (props.outline ? 'border-color:' + rgba(palette.night, 0.64) + ';' : '')}
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.black)};
      ${props => (props.outline ? 'border-color:' + rgba(palette.moon, 0.64) + ';' : '')}
    }
  }
`

export const InputRow = styled.div`
  margin-bottom: 16px;
  > * {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default withJsonFormsControlProps(InputNumber)
