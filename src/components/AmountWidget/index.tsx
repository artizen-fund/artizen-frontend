import styled from 'styled-components'
import { Icon, Button } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

interface IAmountWidget {
  amount: number
  setAmount: (n: number) => void
}

const AmountWidget = ({ amount, setAmount }: IAmountWidget) => {
  // todo: sort out integer or float
  // todo: clamp amount (I think makes more sense to do here than DonationAmount)
  // todo: will we have text/typing input?
  return (
    <Wrapper>
      <Denomination>
        <Icon glyph="info" outline level={1} />
        <span>USD</span>
      </Denomination>
      <AmountBox>
        <Amount value={amount} onChange={e => setAmount(parseInt(e.target.value))} type="number" />
        <label>donation total</label>
      </AmountBox>
      <Buttons>
        <Button outline level={2} onClick={() => setAmount(amount + 1)} glyphOnly glyph="face">
          add
        </Button>
        <Button outline level={2} onClick={() => setAmount(amount - 1)} glyphOnly glyph="donate">
          subtract
        </Button>
      </Buttons>
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
