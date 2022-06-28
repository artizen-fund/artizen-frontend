import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Icon, AmountWidget } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'
import CheckboxControl from '../Form/Controls/BooleanControl/CheckboxControl'

type DonationMethod = 'usd' | 'polygon' | 'ethereum'

const DonationShelf = () => {
  const [hideFromLeaderboard, setHideFromLeaderboard] = useState(false)
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float
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
        <AmountWidget {...{ amount, setAmount }} />

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
          <Method>
            <Icon outline level={2} glyph="info" />
            <div>Credit Card</div>
            <span>min $10.00</span>
          </Method>
          <Method>
            <Icon outline level={2} glyph="info" />
            <div>Polygon</div>
            <span>min $10.00</span>
          </Method>
          <Method>
            <Icon outline level={2} glyph="info" />
            <div>Ethereum</div>
            <span>min $100.00</span>
          </Method>
        </Methods>

        <Button onClick={() => console.log('derp')} stretch level={1}>
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

const Method = styled.li`
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

  border: 0.5px solid ${rgba(palette.night)};
  border-radius: 16px;
  padding: 10px 0;
`

export default DonationShelf
