/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Icon, AmountWidget, CheckboxControl } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'

interface IDonationAmount {
  setStage: (s: DonationStage) => void
  amount: number
  setAmount: (n: number) => void
}

type MethodSet = {
  key: DonationMethod
  label: string
  min: number
}

const methods: Array<MethodSet> = [
  {
    key: 'usd',
    label: 'Credit Card',
    min: 10,
  },
  {
    key: 'polygon',
    label: 'Polygon',
    min: 10,
  },
  {
    key: 'ethereum',
    label: 'Ethereum',
    min: 100,
  },
]

const DonationAmount = ({ setStage, amount, setAmount }: IDonationAmount) => {
  const [hideFromLeaderboard, setHideFromLeaderboard] = useState(false)
  // todo: how is this managed?

  const [minClamp, setMinClamp] = useState(10)
  const [method, setMethod] = useState<DonationMethod>('usd')
  useEffect(() => setMinClamp(methods.find(thisMethod => thisMethod.key === method)?.min || minClamp), [method])

  return (
    <Wrapper>
      <Information>
        <div>
          <Title>Choose your donation amount and payment method</Title>
          <InfoLine>
            <Icon outline glyph="info" level={2} />
            <span>Need help? We’ve prepared a useful guide to donating.</span>
          </InfoLine>
        </div>

        <p>todo: insert Leaderboard here</p>

        <CheckboxControl
          data={hideFromLeaderboard}
          handleChange={() => setHideFromLeaderboard(!hideFromLeaderboard)}
          label="Hide my personal details from the leaderboard."
          path="derp"
        />
      </Information>
      <Form>
        <AmountWidget {...{ amount, setAmount, minClamp }} />

        <SuggestedDonations>
          <span>Friends of Artizen typically donate:</span>
          <div>
            <Button onClick={() => setAmount(200)} level={2} outline>
              $200
            </Button>
            <Button onClick={() => setAmount(500)} level={2} outline>
              $500
            </Button>
            <Button onClick={() => setAmount(1000)} level={2} outline>
              $1000
            </Button>
          </div>
        </SuggestedDonations>

        <Methods>
          {methods.map(thisMethod => (
            <Method key={thisMethod.key} onClick={() => setMethod(thisMethod.key)} selected={method === thisMethod.key}>
              <Icon outline level={2} glyph="info" />
              <div>{thisMethod.label}</div>
              <span>min ${thisMethod.min}.00</span>
            </Method>
          ))}
        </Methods>

        <Button onClick={() => setStage('payment')} stretch level={1}>
          Continue
        </Button>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    flex-direction: row;
    gap: 80px;
  }
`

const Information = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h1``

const InfoLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`

const Form = styled.div`
  flex: 1;
`

const SuggestedDonations = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const Methods = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin: 1em 0;
`

const Method = styled.li<{ selected: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 0.5em;
    ${typography.label.l1}
  }

  span {
    ${typography.label.l2}
    color: ${rgba(palette.barracuda)};
  }

  border: 0.5px solid ${props => rgba(props.selected ? palette.night : palette.stone)};
  @media (prefers-color-scheme: dark) {
    border: 0.5px solid ${props => rgba(props.selected ? palette.moon : palette.barracuda)};
  }
  transition: border 0.3s ease-in-out;
  border-radius: 16px;
  padding: 10px 0;
`

export default DonationAmount
