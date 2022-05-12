import React from 'react'
import styled from 'styled-components'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema } from '@jsonforms/core'
import { Icon, Spinner } from '@components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export interface SelectProps {
  icon?: string
  invalid?: boolean
  schema: JsonSchema
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

const Select = React.forwardRef((props: SelectProps) => {
  const {
    icon,
    label,
    options = [],
    outline = true,
    emptyFirstOption = false,
    onChange,
    value,
    disabled = false,
    processing = false,
    required = false,
    inputRef,
    autoComplete,
    schema,
  } = props
  const hasIcon = !!icon
  const [valid, setValid] = React.useState(true)

  React.useEffect(() => {
    setValid(value !== '' && value !== undefined)
  }, [value])

  return (
    <Wrapper>
      {icon && <StyledIcon>{icon}</StyledIcon>}

      <Spinner hidden={!processing} />

      <InputWrapper {...{ disabled, outline, hasIcon }}>
        <DropdownWrapper className="dropdownWrapper">
          <Dropdown {...{ onChange, disabled, outline, required, value }}>
            {emptyFirstOption && !required && <option value="" />}
            {emptyFirstOption && required && <option disabled value="" />}
            {Array.isArray(schema.enum) &&
              schema.enum.map((option: string) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
          </Dropdown>
        </DropdownWrapper>

        <Label className={valid ? 'valid' : ''}>
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

const Label = styled.label`
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

  .PhoneInput:focus-within ~ &,
  input:focus ~ &,
  input:not(:placeholder-shown) ~ &,
  input:required:valid ~ &,
  textarea:focus ~ &,
  textarea:not(:placeholder-shown) ~ &,
  textarea:required:valid ~ &,
  .dropdownWrapper:focus-within ~ &,
  &.valid {
    transform: translate3d(0, -12px, 0) scale3d(0.8, 0.8, 1);
    color: ${rgba(palette.night, 0.8)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon, 0.8)};
    }
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
  select {
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

  select.custom:focus {
    background-color: ${rgba(palette.white)};
    ${props => (props.outline ? 'border-color:' + rgba(palette.night, 0.64) + ';' : '')}
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.black)};
      ${props => (props.outline ? 'border-color:' + rgba(palette.moon, 0.64) + ';' : '')}
    }
  }
`

// Selects

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  &:focus-within::after {
    transform: rotate3d(0, 0, 1, 180deg);
  }

  &::after {
    position: absolute;
    top: 50%;
    bottom: 50%;
    right: 16px;
    background: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.moon)};
    }
    width: 10px;
    height: 6px;
    margin: auto 0;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    content: '';
    transform: rotate3d(0, 0, 1, 0deg);
    transition: transform 0.25s ease-in-out;
    will-change: transform;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    &::after {
      right: 24px;
      width: 12px;
      height: 8px;
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    &::after {
      right: 32px;
    }
  }
`

const Dropdown = styled.select`
  display: flex;
  align-items: center;
  background-color: ${rgba(palette.night)};
  width: 100%;
  height: 56px;
  margin: 0;
  border-radius: 0;
  outline: none;
  appearance: none;
  cursor: pointer;

  &::-moz-focus-inner {
    outline: none !important;
  }
  &:-moz-focusring {
    color: inherit;
  }

  &::-ms-expand {
    display: none;
  }

  &:hover,
  &:focus {
    outline: none;
  }

  & option {
    font-weight: normal;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 64px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 72px;
  }
`

export const InputRow = styled.div<{ split?: boolean | 'tablet' | 'laptop' | 'desktop' }>`
  margin-bottom: 16px;
  > * {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ${props =>
    props.split &&
    `
  @media only screen and (min-width: ${breakpoint[props.split === true ? 'phone' : props.split]}px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0;

    > * {
      width: calc(50% - 8px);
    }
  }
`}
`

export default withJsonFormsControlProps(Select)
