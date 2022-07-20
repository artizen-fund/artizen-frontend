/* eslint-disable camelcase */
import { useState } from 'react'
import styled from 'styled-components'
import { Button, Icon, AmountWidget } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba, userMetadataVar } from '@lib'
import CheckboxControl from '../Form/Controls/BooleanControl/CheckboxControl'
import { useQuery, useReactiveVar } from '@apollo/client'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

type DonationMethod = 'usd' | 'polygon' | 'ethereum'

const getConfirmDonationURL = () => {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }/crowdfunding/confirmDonation`
}

const DonationShelf = () => {
  const [hideFromLeaderboard, setHideFromLeaderboard] = useState(false)
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float
  const metadata = useReactiveVar(userMetadataVar)
  const {
    data: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      User: [user],
    },
  } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
  })

  const handleCreditCardDonation = async () => {
    const reservationResponse = await fetch('/api/onramp/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        walletAddress: metadata?.publicAddress,
      }),
    })

    const reservation = await reservationResponse.json()

    // eslint-disable-next-line no-console
    console.log(reservation)

    const card = {
      payment_method: {
        credit_card: {
          first_name: 'Rodrigo',
          last_name: 'Pavezi',
          number: '4111111111111111',
          verification_value: '555',
          month: '10',
          year: '2023',
          email: 'rodrigo@artizen.fund',
        },
        data: {
          my_payment_method_identifier: 'test_card',
          extra_stuff: {
            some_other_things: 'Can be anything really',
          },
        },
      },
    }

    const paymentMethodResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SPREEDLY_BASE_URL}/payment_methods.json?environment_key=${process.env.NEXT_PUBLIC_SPREEDLY_ENVIRONMENT_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      },
    )

    const paymentMethod = await paymentMethodResponse.json()

    // eslint-disable-next-line no-console
    console.log(paymentMethod)

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transaction: {
        payment_method: { token },
      },
    } = paymentMethod

    const orderResponse = await fetch('/api/onramp/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        walletAddress: metadata?.publicAddress,
        address: {
          street1: 'Jhon street',
          city: 'San Diego',
          state: 'CA',
          postalCode: '98327',
          country: 'US',
        },
        reservationId: reservation.reservation,
        givenName: 'Rodrigo',
        familyName: 'Pavezi',
        email: 'rodrigo@artizen.fund',
        phone: 14199745456,
        referenceId: `${getConfirmDonationURL()}|${user?.id}`,
        ipAddress: '1.1.1.1',
        paymentMethodToken: token,
      }),
    })

    const order = await orderResponse.json()
    // eslint-disable-next-line no-console
    console.log(order)

    const authorizationResponse = await fetch(`/api/onramp/authorization?orderId=${order.id}`)

    const authorization = await authorizationResponse.json()

    // eslint-disable-next-line no-console
    console.log(authorization)
  }

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

        <Button onClick={handleCreditCardDonation} stretch level={1}>
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
