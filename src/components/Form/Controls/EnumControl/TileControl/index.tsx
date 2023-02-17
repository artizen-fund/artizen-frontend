import { ReactNode } from 'react'
import styled from 'styled-components'
import { SelectedCheck, Icon } from '@components'
import { typography, palette } from '@theme'
import { rgba } from '@lib'
import { EnumControlProps } from '../'

export type TileOption = {
  const?: DonationMethod
  title: string
  subtitle?: string
  icon: string
}

const TileControl = ({
  disabled = false,
  required = false,
  data,
  handleChange,
  path,
  schema,
  uischema,
  ...props
}: EnumControlProps) => {
  return (
    <Wrapper {...props}>
      {schema?.oneOf?.map((option: any, i: number) => (
        <Option key={`${path}-${i}`} selected={option.const === data}>
          <input
            type="radio"
            value={option.const}
            checked={data === option}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(path, e.target.value)}
          />
          <Icon outline={option.const !== data} inverted level={1} glyph={option.icon} />
          <Title>{option.title}</Title>
          <SelectedCheck selected={option.const === data} />
        </Option>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ gridArea?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  flex: 1;
`

const Option = styled.label<{ selected: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  border: 0.5px solid ${props => rgba(props.selected ? palette.night : palette.stone)};
  @media (prefers-color-scheme: dark) {
    border: 0.5px solid ${props => rgba(props.selected ? palette.moon : palette.barracuda)};
  }
  transition: border 0.3s ease-in-out;
  border-radius: 16px;
  padding: 20px 0;
  cursor: pointer;

  & input {
    display: none;
  }
`

const Title = styled.div`
  ${typography.label.l1}
`

export default TileControl
