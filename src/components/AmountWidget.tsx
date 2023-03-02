import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon, Button } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

interface IAmountWidget {
  amount?: number
  setAmount?: (n: number) => void
}

const AmountWidget = ({ amount, setAmount }: IAmountWidget) => {
  // todo: sort out integer or float
  // todo: will we have text/typing input?

  const add = (n: number) => setAmount?.((amount as number) + n)

  useEffect(() => {
    if (!amount || isNaN(amount) || amount < 0) setAmount?.(0)
  }, [amount])

  return (
    <Wrapper>
      <Denomination>
        <Icon outline level={1} glyph="dollar" />
        <div>USD</div>
      </Denomination>
      <AmountBox>
        <Amount value={amount} onChange={e => setAmount?.(parseInt(e.target.value))} />
        <label>donation total</label>
      </AmountBox>
      <Buttons>
        <Button level={2} outline glyphOnly glyph="mathPlus" onClick={() => add(10)}>
          increase
        </Button>
        <Button
          level={2}
          outline
          glyphOnly
          glyph="mathMinus"
          onClick={() => add(-10)}
          disabled={(amount as number) < 10}
        >
          decrease
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: amountWidget;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 2px solid ${rgba(palette.night)};
  border-radius: 16px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
`

const Denomination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  div {
    ${typography.label.l0}
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
