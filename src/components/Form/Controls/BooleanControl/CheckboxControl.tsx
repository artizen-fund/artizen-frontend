import styled from 'styled-components'
import { breakpoint, palette, Palette } from '@theme'
import { rgba } from '@lib'
import { BooleanControlProps } from './'

const Checkbox = ({
  required,
  label,
  data,
  handleChange,
  path,
  disabled = false,
  uischema,
  ...props
}: BooleanControlProps) => {
  return (
    <Wrapper {...{ disabled }} {...props}>
      <Box>
        <Input
          type="checkbox"
          required={!!required}
          onChange={_ => handleChange(path, !data)}
          checked={data}
          {...{ disabled }}
        />
        <Checkmark />
      </Box>
      <Label {...{ disabled }} color={uischema?.options?.labelColor}>
        {typeof label === 'object' ? label[0] : label}
      </Label>
    </Wrapper>
  )
}

const Box = styled.div`
  flex: 0 0 auto;
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 16px;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 32px;
    height: 32px;
    margin-right: 24px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 40px;
    height: 40px;
  }
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba(palette.moon)};
  border: 1px solid ${rgba(palette.slate)};
  border-radius: 9999px;
  appearance: none;
  transition: background-color 0.25s ease-in-out, box-shadow 0.15s ease-in-out;

  &:after {
    position: absolute;
    border-style: solid;
    border-color: ${rgba(palette.moon)};
    left: calc(50% - 1px);
    top: calc(50% - 4px);
    width: 3px;
    height: 7px;
    border-width: 0 1.5px 1px 0;
    display: block;
    transform: rotate(45deg) scale3d(0, 0, 1);
    opacity: 0;
    content: '';
    transition: opacity 0.25s ease-in-out, transform 0.6s cubic-bezier(0.44, 1.86, 0.74, 1);
  }
`

const Label = styled.span<{ color?: keyof Palette }>`
  display: block;
  color: ${props => rgba(props.color ? palette[props.color] : palette.barracuda)};

  & a {
    position: relative;
    display: inline-flex;
    margin: 0 1px;
    overflow: hidden;

    &::after {
      z-index: 2;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${rgba(palette.coral, 0.64)};
      width: 100%;
      height: 1px;
      transform: translate3d(-100%, 0, 0);
      transition: color 0.25s ease-in-out, transform 0.35s ease-in-out;
      content: '';
      pointer-events: none;
    }

    &:hover {
      &::after {
        transform: translate3d(0, 0, 0);
      }
    }
  }
`

const Wrapper = styled.label<{ disabled: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 0;
  user-select: none;
  color: ${props => (props.disabled ? rgba(palette.stone) : rgba(palette.night))};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};

  & input:disabled ~ span {
    background-color: ${rgba(palette.stone)};
    border: 1px solid ${rgba(palette.stone)};
  }

  & input:checked ~ span {
    background-color: ${rgba(palette.slate)};

    &:after {
      transform: rotate(45deg) scale3d(1, 1, 1);
      opacity: 1;
    }
  }

  &:hover ${Checkmark} {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  }
`

export default Checkbox
