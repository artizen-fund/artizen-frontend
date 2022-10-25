import { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { Button, AmountWidget, CheckboxControl, DonationHelpLink, Leaderboard, Form } from '@components'
import { breakpoint } from '@theme'
import { LayoutContext, useProcessDonation, UserContext } from '@lib'
import { UPDATE_USER } from '@gql'
import { schema, uischema, initialState, FormState } from '@forms/pickUsdOrCrypto'

const MIN_DONATION_AMOUNT = 10

const DonationAmount = () => {
  const [updateUser] = useMutation(UPDATE_USER)
  const { loggedInUser } = useContext(UserContext)
  const { setDonationStage } = useContext(LayoutContext)
  const { amount, setAmount, hideFromLeaderboard, setHideFromLeaderboard, donationMethod, setDonationMethod } =
    useProcessDonation()

  useEffect(() => {
    if (loggedInUser) {
      updateUser({ variables: { ...loggedInUser, hideFromLeaderboard } })
    }
  }, [hideFromLeaderboard])

  const disabled = useMemo(() => (amount as number) < MIN_DONATION_AMOUNT, [amount, donationMethod])

  const [data, setData] = useState<FormState>(initialState)

  useEffect(
    () => setDonationMethod?.(data.donationMethod === '' ? undefined : (data.donationMethod as DonationMethod)),
    [data],
  )

  return (
    <Wrapper>
      <Header>
        <div>
          <Title>Choose your donation amount and payment method</Title>
          <DonationHelpLink />
        </div>
      </Header>

      <StyledLeaderboard />

      <AmountWidget {...{ amount, setAmount }} />

      <TheForm>
        <SuggestedDonations>
          <span>Average donation:</span>
          <div>
            <Button onClick={() => setAmount?.(200)} level={2} outline>
              $200
            </Button>
            <Button onClick={() => setAmount?.(500)} level={2} outline>
              $500
            </Button>
            <Button onClick={() => setAmount?.(1000)} level={2} outline>
              $1000
            </Button>
          </div>
        </SuggestedDonations>

        <Form {...{ schema, uischema, initialState }} data={data} setData={setData} />
      </TheForm>

      <HideCheckbox
        data={hideFromLeaderboard}
        handleChange={() => setHideFromLeaderboard?.(!hideFromLeaderboard)}
        label="Hide my personal details from the leaderboard."
        path="derp"
      />

      <SubmitButton onClick={() => setDonationStage?.('login')} stretch level={1} {...{ disabled }}>
        Continue
      </SubmitButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'header' 'amountWidget' 'form' 'hideCheckbox' 'submitButton';
  grid-template-columns: 1;
  grid-template-rows: repeat(5, auto);
  gap: 20px;

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 30px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-areas: 'header amountWidget' 'leaderboard form' 'hideCheckbox submitButton';
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 40px;
  }
`

const Header = styled.div`
  grid-area: header;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;
`

const Title = styled.h1``

const TheForm = styled.div`
  grid-area: form;
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 24px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 32px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 40px;
  }
`

const SuggestedDonations = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`

const HideCheckbox = styled(props => <CheckboxControl {...props} />)`
  grid-area: hideCheckbox;
`

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submitButton;
`

const StyledLeaderboard = styled(props => <Leaderboard {...props} />)`
  display: none;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: block;
    grid-area: leaderboard;
  }
`

export default DonationAmount
