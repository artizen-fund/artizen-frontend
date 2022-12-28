import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'
import { Glyph } from '@components'
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
}: BooleanControlProps) => {
  const checked = !!data
  return (
    <Wrapper gridArea={path} {...{ inverted, enabled }} {...props} id={uischema?.scope}>
      <Box>
        <Input
          type="checkbox"
          required={!!required}
          onChange={_ => handleChange(path, !data)}
          checked={checked}
          disabled={!enabled}
        />
        <Checkmark {...{ inverted, enabled, checked }}>
          <Glyph glyph="tick" level={2} />
        </Checkmark>
      </Box>
      <Label {...{ inverted, enabled }}>{typeof label === 'object' ? label[0] : label}</Label>
    </Wrapper>
  )
}

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

const Checkmark = styled.span<Partial<BooleanControlProps> & { checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 9999px;
  appearance: none;
  transition: background-color 0.25s ease-in-out, box-shadow 0.15s ease-in-out;

  background-color: ${props => rgba(props.inverted ? palette.night : palette.white)};
  border: 2px solid ${props => rgba(props.inverted ? palette.white : palette.slate)};

  /* see [Wrapper -> & input ~ span] for state style changes */

  ${Glyph} {
    position: absolute;
    background-color: ${props => rgba(props.enabled ? palette.slate : palette.barracuda)};
    transition: background-color 0.25s ease-in-out, transform 0.5s cubic-bezier(0.42, 0.97, 0.52, 1.49);
    transform: scale(${props => (props.checked ? 1 : 0)});
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
  /* TODO: this is overriding the shelf pointer-events:none check 
    pointer-events: ${props => (!props.enabled ? 'none' : 'all')};
  */

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
    border: 1px solid ${props => (props.inverted ? rgba(palette.barracuda, 0) : rgba(palette.stone))};
    &::after {
      border-color: ${rgba(palette.barracuda)};
      transform: rotate(45deg) scale3d(1, 1, 1);
      opacity: 1;
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.barracuda, 0.4)};
      border: 1px solid ${rgba(palette.barracuda, 0)};
    }
  }

  &:hover ${Checkmark} {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  }
`

export default Checkbox
