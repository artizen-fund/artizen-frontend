import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { Wrapper, Label, InputWrapper, InputIcon } from '../_Common'
import { EnumControlProps } from './'

const SelectControl = (props: EnumControlProps) => {
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

  const ref = useRef<HTMLSelectElement>(null)
  const [filled, setFilled] = useState(true)
  useEffect(() => setFilled(data !== '' && data !== undefined), [data])

  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(path, e.target.value)
    ref.current?.blur()
    // todo: make sure above doesn't malfunction in touch devices
  }

  return (
    <SelectWrapper {...{ filled }}>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ disabled, outline, hasIcon }}>
        <DownwardArrowPlacer>
          <select {...{ disabled, required, ref }} onChange={changeSelect} defaultValue={data}>
            {schema?.enum?.map((option: string) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </DownwardArrowPlacer>
        <Label>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
    </SelectWrapper>
  )
}

// todo: it would be nice if this could be done with a pseudo-selector in <Label />, similar to the way <Input /> works.
const SelectWrapper = styled(props => <Wrapper {...props} />)<{ filled: boolean }>`
  ${Label} {
    ${props =>
      props.filled &&
      `
    transform: translate3d(0, -12px, 0) scale3d(0.8, 0.8, 1);
    color: ${rgba(palette.night, 0.8)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon, 0.8)};
    }
    `}
  }
`

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

export default SelectControl
