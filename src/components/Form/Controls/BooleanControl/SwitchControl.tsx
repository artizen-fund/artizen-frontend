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
  <Wrapper gridArea={path} {...props} id={uischema?.scope}>
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

  border: 1px solid ${props => (props.checked ? rgba(palette.uiSuccess) : rgba(palette.uiAlert))};

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

    background-color: ${props => (props.checked ? rgba(palette.uiSuccess) : rgba(palette.uiAlert))};
    border: 1px solid ${props => (props.checked ? rgba(palette.uiSuccess) : rgba(palette.uiAlert))};

    transform: translateX(${props => (props.checked ? 19 : 4)}px);
    transition: background-color 0.25s ease-in-out, transform 0.4s ease-in, border-color 0.25s ease-in-out;
    will-change: background-color, transform;
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
