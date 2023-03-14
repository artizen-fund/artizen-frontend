import { useEffect } from 'react'
import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

interface ICounter {
  value: number
  onChange: (n: number) => void
  step?: number
  min?: number
  max?: number
}

const numberWithinRange = (value: number, min?: number, max?: number) => {
  return min && value < min ? min : max && value > max ? max : value
}

const Counter = ({ value, onChange, step = 1, min = 1, max }: ICounter) => {
  const increment = (val: number) => onChange(numberWithinRange(value + val, min, max))
  return (
    <Wrapper>
      <Button onClick={() => increment(-1)}>
        <Glyph glyph="mathMinus" color="night" darkColor="white" level={2} />
      </Button>
      <Input
        type="number"
        {...{ step, min, max, value }}
        pattern="\d+"
        onChange={e => onChange(parseInt(e.target.value))}
      />
      <Button onClick={() => increment(1)}>
        <Glyph glyph="mathPlus" color="night" darkColor="white" level={2} />
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid ${rgba(palette.stone)};
  @media (prefers-color-scheme: dark) {
    border: 1px solid ${rgba(palette.barracuda)};
  }
`

const Input = styled.input`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${typography.label.l0}
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`

const Button = styled.button`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
  transition: opacity 0.15s ease-in-out;
  cursor: pointer;
`

export default Counter
