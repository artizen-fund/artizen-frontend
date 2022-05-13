import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { EnumControlProps } from './'

const SegmentedControl = (props: EnumControlProps) => {
  const { disabled = false, required = false, data, handleChange, path, schema } = props
  return (
    <Wrapper>
      {schema?.enum?.map((option: string) => (
        <Option key={option} selected={option === data}>
          <input
            type="radio"
            value={option}
            checked={data === option}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(path, e.target.value)}
          />
          <span>{option}</span>
        </Option>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 32px;
  border: 1px solid ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    border: 1px solid ${rgba(palette.moon, 0.32)};
  }
  overflow: hidden;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 40px;
  }
`

const Option = styled.label<{ selected: boolean }>`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale3d(1, 1, 1);
  background-color: ${props => (!props.selected ? rgba(palette.moon) : rgba(palette.night))};
  color: ${props => (props.selected ? rgba(palette.moon) : rgba(palette.night))};
  @media (prefers-color-scheme: dark) {
    background-color: ${props => (!props.selected ? rgba(palette.night) : rgba(palette.moon, 0.32))};
    color: ${rgba(palette.moon)};
  }
  text-align: center;
  cursor: pointer;
  transition: background-color 0.25s ease-in-out, transform 0.25s ease-in-out, color 0.25s ease-in-out;

  & input {
    display: none;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    &:hover {
      transform: scale3d(${props => (!props.selected ? '1.02,1.02,1' : '1,1,1')});
    }
  }
`

export default SegmentedControl
