import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Button, Icon, AmountWidget, CheckboxControl, DonationHelpLink, Leaderboard, SelectedCheck } from '@components'
import { breakpoint, palette, typography, GlyphKey } from '@theme'
import { rgba, DonationContext } from '@lib'

interface IDonationAmount {
  amount: number
  setAmount: (n: number) => void
  donationMethod: DonationMethod
  setDonationMethod: (d: DonationMethod) => void
}

type MethodSet = {
  key: DonationMethod
  label: string
  min: number
  glyph: keyof GlyphKey
}

const methods: Array<MethodSet> = [
  {
    key: 'usd',
    label: 'Credit Card',
    min: 10,
    glyph: 'creditCard',
  },
  {
    key: 'polygon',
    label: 'Polygon',
    min: 10,
    glyph: 'polygon',
  },
  {
    key: 'ethereum',
    label: 'Ethereum',
    min: 100,
    glyph: 'ethereum',
  },
]

const DonationAmount = ({ amount, setAmount, donationMethod, setDonationMethod }: IDonationAmount) => {
  const { setDonationStage } = useContext(DonationContext)
  const [hideFromLeaderboard, setHideFromLeaderboard] = useState(false)
  // todo: how is this managed?

  const [minClamp, setMinClamp] = useState(10)
  useEffect(
    () => setMinClamp(methods.find(thisMethod => thisMethod.key === donationMethod)?.min || minClamp),
    [donationMethod],
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

      <AmountWidget {...{ amount, setAmount, minClamp }} />

      <Form>
        <SuggestedDonations>
          <span>Average donation:</span>
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
            <Method
              key={thisMethod.key}
              onClick={() => setDonationMethod(thisMethod.key)}
              selected={donationMethod === thisMethod.key}
            >
              <Icon
                outline={donationMethod !== thisMethod.key}
                level={2}
                glyph={thisMethod.glyph}
                color={donationMethod === thisMethod.key ? 'moon' : 'night'}
                darkColor={donationMethod === thisMethod.key ? 'night' : 'moon'}
              />
              <div>{thisMethod.label}</div>
              <SelectedCheck selected={donationMethod === thisMethod.key} />
            </Method>
          ))}
        </Methods>
      </Form>

      <HideCheckbox
        data={hideFromLeaderboard}
        handleChange={() => setHideFromLeaderboard(!hideFromLeaderboard)}
        label="Hide my personal details from the leaderboard."
        path="derp"
      />

      <SubmitButton onClick={() => setDonationStage?.('login')} stretch level={1}>
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

const Form = styled.div`
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

const Methods = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`

const Method = styled.li<{ selected: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
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
  cursor: pointer;
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
