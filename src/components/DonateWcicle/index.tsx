import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from './form'
import encryptData from './carEncryptation'
import makePayment from './makePayment'

const DonateWcicle = () => {
  const LOCALSTORAGE_KEY = 'donatewcicle'

  /* set up initialState of form, including previously recorded
   * responses from browser localStorage */
  const [data, setData] = useState<FormState>(initialState)
  
  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [])

  // component state data
  const [formSubmitted, setFormSubmitted] = useState('')
  // eslint-disable-next-line
  const [readonly, setReadonly] = useState(false)

  

  const submit = async () => {
    // eslint-disable-next-line
    console.log('start create card    ', data)
    
    const cardCreation = await encryptData(data)
    // eslint-disable-next-line
    console.log('cardCreation finished ', cardCreation)

    if(!cardCreation.id) {
      return new Error('data creation error')
    }
    // eslint-disable-next-line
    console.log('cardCreation result   ', cardCreation)
    

    // make payment
    const makePaymentF = await makePayment(cardCreation)
    // eslint-disable-next-line
    console.log('makePaymentF  ', makePaymentF)

    if(!makePaymentF.data.id) {
      return new Error('data creation error')
    }

    setFormSubmitted(makePaymentF.data.id)
    
    // const response = await someService.submit(data)
  }

  return (
    <Wrapper>
     
      {formSubmitted &&
      <div>
        {'Payment received'}
      </div>
      }
      {!formSubmitted && 
      <>
         <div style={{height: '60px'}}>
      <p>
        {`
        name: 'Customer 0001'                ,
        country: 'US'    ,
        district:    'MA'   ,
        Adress:    'Test'   ,
        city: 'Test City'    ,
        postalCode: '11111'
      `}
      </p>
      </div>
      
        <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
        <Button onClick={() => submit()}>Submit</Button>
      </Form>
      </>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default DonateWcicle
