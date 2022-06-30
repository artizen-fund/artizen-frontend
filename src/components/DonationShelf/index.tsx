import { useState } from 'react'
import styled from 'styled-components'
import { Button, Icon, AmountWidget } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba, useSession, useSessionDispatch, checkoutMethods } from '@lib'
import CheckboxControl from '../Form/Controls/BooleanControl/CheckboxControl'

const DonationShelf = () => {
  const { checkoutMethod, amount, checkoutStage } = useSession()
  const dispatch = useSessionDispatch()

  const setCheckoutMethod = (newMethod: CheckoutMethodType) =>
    dispatch({
      type: 'SET_CHECKOUT_METHOD',
      payload: {
        checkoutMethod: newMethod,
      },
    })

  const setAmount = (newAmount: number) =>
    dispatch({
      type: 'SET_AMOUNT',
      payload: {
        amount: newAmount,
      },
    })

  const proceedToPayment = () =>
    dispatch({
      type: 'SET_CHECKOUT_STAGE',
      payload: {
        checkoutStage: 'COLLECTING_FIAT_PAYMENT',
      },
    })

  const [hideFromLeaderboard, setHideFromLeaderboard] = useState(false)

  return (
    <Wrapper>
      <Information>
        <div>
          <Title>Choose your donation amount and payment method</Title>
          <Title>DONATION STAGE: {checkoutStage}</Title>
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
          {(Object.keys(checkoutMethods) as Array<CheckoutMethodType>).map(method => (
            <Method key={method} active={method === checkoutMethod} onClick={() => setCheckoutMethod(method)}>
              <Icon outline level={2} glyph="info" />
              <div>{checkoutMethods[checkoutMethod].label}</div>
              <span>min ${checkoutMethods[checkoutMethod].minimum.toFixed(2)}</span>
            </Method>
          ))}
        </Methods>

        <Button onClick={() => proceedToPayment()} stretch level={1}>
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

const Method = styled.li<{ active: boolean }>`
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

  border: ${props => (props.active ? 2 : 0.5)}px solid ${rgba(palette.night)};
  border-radius: 16px;
  padding: 10px 0;
`

export default DonationShelf
