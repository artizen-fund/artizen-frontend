import React from 'react'
import styled from 'styled-components'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema } from '@jsonforms/core'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { Wrapper, Label, InputWrapper, InputIcon } from '../_Common'
import { rankWith, schemaMatches } from '@jsonforms/core'

export interface SelectControlProps {
  icon?: string
  invalid?: boolean
  schema: JsonSchema
  label: string | Labels
  disabled?: boolean
  onChange?: (e: any) => void
  required?: boolean
  outline?: boolean

  data: any
  handleChange(path: string, value: any): void
  path: string
}

export const SelectControl = (props: SelectControlProps) => {
  const {
    icon,
    label,
    outline = true,
    disabled = false,
    required = false,

    data,
    handleChange,
    path,
    schema,
  } = props
  const hasIcon = !!icon
  const [filled, setFilled] = React.useState(true)

  React.useEffect(() => setFilled(data !== '' && data !== undefined), [data])

  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ disabled, outline, hasIcon }}>
        <DownwardArrowPlacer>
          <Select
            {...{ disabled, outline, required }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(path, e.target.value)}
          >
            {schema?.enum?.map((option: string) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </Select>
        </DownwardArrowPlacer>
        <Label className={filled ? 'filled' : ''}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
    </Wrapper>
  )
}

const DownwardArrowPlacer = styled.div`
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

const Select = styled.select`
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

export const selectControlTester = rankWith(
  3, //increase rank as needed
  schemaMatches(schema => schema.type === 'string' && !!schema.enum),
)

export default withJsonFormsControlProps(SelectControl)
