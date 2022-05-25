import styled from 'styled-components'
import { breakpoint, palette, Palette } from '@theme'
import { rgba } from '@lib'
import { BooleanControlProps } from './'

export const SwitchControl = ({
  data,
  label,
  uischema,
  handleChange,
  path,
  required,
  ...props
}: BooleanControlProps) => (
  <Wrapper gridArea={path} {...props}>
    <Label color={uischema?.options?.labelColor}>{typeof label === 'object' ? label[0] : label}</Label>
    <Input type="checkbox" required={!!required} onChange={_ => handleChange(path, !data)} checked={data} />
    <Switch checked={data} />
  </Wrapper>
)

// todo: investigate whether this component should use _Common/InputWrapper
//        _Common/InputLabel will not be suitable as this input is not animated.
const Wrapper = styled.label<{ gridArea?: string }>`
  position: relative;
  ${props => props.gridArea && `grid-area: ${props.gridArea};`}
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  cursor: pointer;
  padding: 16px 0;
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`

const Switch = styled.span<{ checked?: boolean }>`
  appearance: none;
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 12px;

  background-color: ${props => (props.checked ? palette.white : palette.moon)};
  border: 1px solid ${props => (props.checked ? rgba(palette.night, 0.64) : rgba(palette.night, 0.32))};

  transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out;
  will-change: background-color, border-color;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 3px;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 100%;

    background-color: ${props => (props.checked ? rgba(palette.uiSuccess, 0.8) : rgba(palette.night, 0.24))};
    border: 1px solid ${props => (props.checked ? rgba(palette.night, 0.32) : rgba(palette.night, 0.24))};

    transform: translateX(${props => (props.checked ? 19 : 4)}px);
    transition: background-color 0.25s ease-in-out, transform 0.4s ease-in;
    will-change: background-color, transform;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    ${Wrapper}:hover & {
      border-color: ${rgba(palette.night, 0.64)};
      &:after {
        background-color: ${props => (props.checked ? rgba(palette.uiSuccess, 1) : rgba(palette.night, 0.4))};
      }
    }
  }
`

const Label = styled.span<{ color?: keyof Palette }>`
  display: block;
  max-width: 280px;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 300px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    max-width: 320px;
  }

  color: ${props => rgba(props.color ? palette[props.color] : palette.barracuda)};
`

export default SwitchControl
