import { useEffect } from 'react'
import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

interface IAmountWidget {
  amount: number
  setAmount: (n: number) => void
  minClamp?: number
}

const AmountWidget = ({ amount, setAmount, minClamp }: IAmountWidget) => {
  // todo: sort out integer or float
  // todo: will we have text/typing input?

  useEffect(() => {
    if (minClamp && amount < minClamp) setAmount(minClamp)
  }, [minClamp, amount])

  return (
    <Wrapper>
      <Denomination>
        <span>USD</span>
      </Denomination>
      <AmountBox>
        <Amount value={amount} onChange={e => setAmount(parseInt(e.target.value))} type="number" />
        <label>donation total</label>
      </AmountBox>
      <Buttons></Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid ${rgba(palette.night)};
  border-radius: 16px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
`

const Denomination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 0.5em;
    ${typography.label.l1}
  }
`

const Amount = styled.input`
  width: 100%;
  font-family: 'roc-grotesk';
  font-style: normal;
  font-weight: 750;
  font-size: 64px;
  line-height: 125%;
  text-align: right;
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

const AmountBox = styled.div`
  flex: 1;
  text-align: right;
  label {
    ${typography.label.l1}
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`

export default AmountWidget
