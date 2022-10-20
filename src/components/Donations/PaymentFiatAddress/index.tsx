import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { Button, DonationHelpLink, Form, CheckboxControl, DonationSummary } from '@components'
import { UserContext, hasRequiredProperties, DonationContext, nationIsSupportedByWyre, stateIsSupported } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/paymentFiatAddress'
import { UPDATE_USER } from '@gql'

const PaymentFiatAddress = () => {
  const { setDonationStage } = useContext(DonationContext)
  const { loggedInUser } = useContext(UserContext)

  const [data, setData] = useState<FormState>(initialState)

  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  // todo: we're storing no matter what below…
  // unsure how best to just keep local if not storing it another responsiveVar?

  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])
  useEffect(() => {
    const errors: Array<ErrorObject> = []
    if (!!data.country && !nationIsSupportedByWyre(data.country)) {
      errors.push({
        instancePath: '/country',
        message: 'Nation is not supported by Wyre',
        schemaPath: '#/properties/country',
        keyword: '',
        params: {},
      })
    }
    if (data.country === 'US' && (!data.state || !stateIsSupported(data.state))) {
      errors.push({
        instancePath: '/state',
        message: 'State is not supported',
        schemaPath: '#/properties/state',
        keyword: '',
        params: {},
      })
    }
    setAdditionalErrors(errors)
  }, [data])

  const [updateUser] = useMutation(UPDATE_USER)
  const [processing, setProcessing] = useState(false)
  const saveAndProceed = async () => {
    const requiredProperties = ['street1', 'city', 'country', 'zip']
    if (data.country === 'US' && !data.state) requiredProperties.push('state')
    try {
      if (!loggedInUser) {
        throw new Error('User session missing.')
      }
      if (!hasRequiredProperties(requiredProperties, data)) {
        throw new Error('missing parameters')
      }
      await updateUser({ variables: { ...loggedInUser, ...data } })
      setDonationStage?.('paymentFiat')
    } catch {
      setProcessing(false)
    }
  }

  return (
    <Wrapper className={processing ? 'processing' : ''}>
      <Information>
        <div>
          <Title>Enter your billing address</Title>
          <DonationHelpLink />
        </div>

        <DonationSummary />

        <CheckboxControl
          data={savePaymentInfo}
          handleChange={() => setSavePaymentInfo(!savePaymentInfo)}
          label="Save payment information for next time."
          path="derp"
        />
      </Information>
      <Form
        {...{ schema, uischema, initialState, additionalErrors }}
        readonly={processing}
        data={data}
        setData={setData}
      >
        <SubmitButton stretch onClick={saveAndProceed}>
          Payment
        </SubmitButton>
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
  margin-top: 20px;
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy copy'
    'street1 street1'
    'city state'
    'zip country'
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
      'copy copy city city'
      'copy copy state zip'
      'copy copy country country'
      'copy copy submit submit';
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
`

export default PaymentFiatAddress
