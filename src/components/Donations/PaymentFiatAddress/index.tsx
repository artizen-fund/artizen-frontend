import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { Button, DonationHelpLink, Form, CheckboxControl } from '@components'
import { useLoggedInUser, useFormLocalStorage, hasRequiredProperties, DonationContext } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/paymentFiatAddress'
import { UPDATE_USER_ADDRESS } from '@gql'
import { countryAndRegionIsSupported } from './helpers'

interface IPaymentFiat {
  amount: number
}

const TRANSACTION_FEE = 42

const PaymentFiat = ({ amount }: IPaymentFiat) => {
  const { setDonationStage } = useContext(DonationContext)

  const apolloClient = useApolloClient()
  const [loggedInUser] = useLoggedInUser()

  const LOCALSTORAGE_KEY = 'fiatPaymentAddress'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)

  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  // note: we're storing no more what below…
  // unsure how best to just keep local if not storing it
  // another responsiveVar?

  const [processing, setProcessing] = useState(false)

  const saveAndProceed = async () => {
    try {
      if (!hasRequiredProperties(['street1', 'city', 'state', 'country', 'zip'], data)) {
        throw new Error('missing parameters')
      }
      await apolloClient.mutate({
        mutation: UPDATE_USER_ADDRESS,
        variables: { id: loggedInUser.id, ...data },
      })
      setDonationStage?.('payment')
    } catch {
      setProcessing(false)
    }
  }

  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    setDisabled(!data.street1 || !data.city || !data.zip || countryAndRegionIsSupported(data.country, data.state))
  }, [data])

  return (
    <Wrapper className={processing ? 'processing' : ''}>
      <Information>
        <div>
          <Title>We require your address because regulation stuff. TODO: rewrite this</Title>
          <DonationHelpLink />
        </div>

        <div>
          <p>Donation Summary</p>
          <ul>
            <li>Donation: ${amount}</li>
            <li>Transaction fee: ${TRANSACTION_FEE}</li>
            <li>Purchase total: ${amount + TRANSACTION_FEE}</li>
          </ul>
        </div>

        <CheckboxControl
          data={savePaymentInfo}
          handleChange={() => setSavePaymentInfo(!savePaymentInfo)}
          label="Save payment information for next time."
          path="derp"
        />
      </Information>
      <Form
        localStorageKey={LOCALSTORAGE_KEY}
        {...{ schema, uischema, initialState }}
        readonly={processing}
        data={data}
        setData={setData}
      >
        <SubmitButton stretch onClick={saveAndProceed} {...{ disabled }}>
          Payment
        </SubmitButton>
        <ProcessingMessage>hum de dooo</ProcessingMessage>
      </Form>
    </Wrapper>
  )
}

const Information = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: copy;
`

const Title = styled.h1``

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

const ProcessingMessage = styled.div`
  display: none;
  grid-area: processing;
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy copy'
    'street1 street1'
    'city state'
    'zip countruy'
    'submit submit';
  &.submitted {
    grid-template-areas:
      'copy'
      'confirmation';
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-areas:
      'copy copy street1 street1'
      'copy copy city state'
      'copy copy zip country'
      'copy copy submit submit';
    &.submitted {
      grid-template-areas:
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing';
    }
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  *[id='#/properties/street1'] {
    grid-area: street1;
  }

  *[id='#/properties/city'] {
    grid-area: city;
  }

  *[id='#/properties/state'] {
    grid-area: state;
  }

  *[id='#/properties/country'] {
    grid-area: country;
  }

  *[id='#/properties/zip'] {
    grid-area: zip;
  }

  &.processing {
    *[id='#/properties/street1'],
    *[id='#/properties/city'],
    *[id='#/properties/state'],
    *[id='#/properties/country'],
    *[id='#/properties/zip'],
    ${SubmitButton} {
      display: none;
    }
    ${ProcessingMessage} {
      display: flex;
    }
  }
`

export default PaymentFiat
