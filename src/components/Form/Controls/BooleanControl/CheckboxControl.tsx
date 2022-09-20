import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'
import { BooleanControlProps } from './'

const Checkbox = ({
  required,
  label,
  inverted,
  data,
  handleChange,
  path,
  enabled = true,
  uischema,
  ...props
}: BooleanControlProps) => (
  <Wrapper gridArea={path} {...{ inverted, enabled }} {...props} id={uischema?.scope}>
    <Box>
      <Input
        type="checkbox"
        required={!!required}
        onChange={_ => handleChange(path, !data)}
        checked={data}
        disabled={!enabled}
      />
      <Checkmark {...{ inverted }} />
    </Box>
    <Label {...{ inverted, enabled }}>{typeof label === 'object' ? label[0] : label}</Label>
  </Wrapper>
)

const Box = styled.div`
  flex: 0 0 auto;
  position: relative;
  width: 24px;
  height: 24px;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 32px;
    height: 32px;
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

const Checkmark = styled.span<Pick<BooleanControlProps, 'inverted'>>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border-radius: 9999px;
  appearance: none;
  transition: background-color 0.25s ease-in-out, box-shadow 0.15s ease-in-out;

  background-color: ${props => rgba(props.inverted ? palette.night : palette.white)};
  border: 2px solid ${props => rgba(props.inverted ? palette.white : palette.slate)};
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
    border-color ${rgba(palette.moon)};
  }
  /* see [Wrapper -> & input ~ span] for state style changes */
  
  &:after {
    position: absolute;
    border-style: solid;
    border-color: ${props => rgba(props.inverted ? palette.night : palette.white)};
    @media (prefers-color-scheme: dark) {
      border-color ${rgba(palette.night)};
    }
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

const Label = styled.span<Pick<BooleanControlProps, 'enabled' | 'inverted'>>`
  display: block;
  ${typography.label.l2}
  color: ${props => rgba(!props.enabled ? palette.barracuda : props.inverted ? palette.white : palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${props => rgba(!props.enabled ? palette.barracuda : palette.white)};
  }
`

const Wrapper = styled.label<Pick<BooleanControlProps, 'enabled' | 'inverted'> & { gridArea?: string }>`
  position: relative;
  ${props => props.gridArea && `grid-area: ${props.gridArea};`}
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  gap: 8px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 10px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 12px;
  }

  user-select: none;

  cursor: ${props => (!props.enabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${props => (!props.enabled ? 'none' : 'all')};

  & input:checked ~ span {
    background-color: ${props => rgba(props.inverted ? palette.white : palette.slate)};
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.moon)};
    }

    &:after {
      transform: rotate(45deg) scale3d(1, 1, 1);
      opacity: 1;
    }
  }

  & input:checked:disabled ~ span,
  & input:disabled ~ span {
    background-color: ${props => (props.inverted ? rgba(palette.barracuda, 0.4) : rgba(palette.stone))};
    border: 1px solid ${props => (props.inverted ? rgba(palette.barracuda, 0.4) : rgba(palette.stone))};
    &::after {
      border-color: ${rgba(palette.barracuda)};
      transform: rotate(45deg) scale3d(1, 1, 1);
      opacity: 1;
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.barracuda, 0.4)};
      border: 1px solid ${rgba(palette.barracuda, 0.4)};
      &::after {
        border-color: ${rgba(palette.barracuda)};
        transform: rotate(45deg) scale3d(1, 1, 1);
        opacity: 1;
      }
    }
  }

  &:hover ${Checkmark} {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  }
`

export default Checkbox
