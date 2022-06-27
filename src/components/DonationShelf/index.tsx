import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Icon, AmountWidget } from '@components'
import { breakpoint } from '@theme'

const DonationShelf = () => {
  useEffect(() => console.log('init'), [])
  const [amount, setAmount] = useState(10) // note: sort out integer or float
  return (
    <Wrapper>
      <Information>
        <Title>Choose your donation amount and payment method</Title>
        <InfoLine>
          <Icon outline glyph="info" level={2} />
          <span>Need help? We’ve prepared a useful guide to donating.</span>
        </InfoLine>

        <p>insert Leaderboard here</p>

        <p>insert checkbox line here</p>
      </Information>
      <Form>
        <AmountWidget {...{ amount, setAmount }} />

        <SuggestedDonations>
          <span>Friends of Artizen typically donate:</span>
          <Button onClick={() => setAmount(200)} level={2} outline>
            $200
          </Button>
          <Button onClick={() => setAmount(500)} level={2} outline>
            $500
          </Button>
          <Button onClick={() => setAmount(1000)} level={2} outline>
            $1000
          </Button>
        </SuggestedDonations>

        <Methods>
          <li>credit card</li>
          <li>Polygon</li>
          <li>Ethereum</li>
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
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    flex-direction: row;
    gap: 80px;
  }
`

const Information = styled.div`
  flex: 1;
`

const Title = styled.h1``

const InfoLine = styled.div``

const Form = styled.div`
  flex: 1;
`

const SuggestedDonations = styled.div`
  display: flex;
  flex-direction: row;
`

const Methods = styled.ul`
  display: flex;
  flex-direction: row;
`

export default DonationShelf
