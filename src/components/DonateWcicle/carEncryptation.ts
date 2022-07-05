import { v4 as uuidv4 } from 'uuid'
import {getPCIPublicKey, createCard} from '../../lib/cardsApi'
import openPGP from '../../lib/openpgp'
import {FormState} from './form'
// import createCard from '../../lib/cardsApi'

// Object to be encrypted
interface CreateCardPayload {
  idempotencyKey: string,
  expMonth: number,
  expYear: number,
  keyId: string,
  encryptedData: string,
  billingDetails: {
    name: string,
    country: string,
    district: string,
    line1: string, 
    line2: string,
    city: string,
    postalCode: string,
  },
  metadata: {
    email:'customer-0001@circle.com',
    phoneNumber: '+12025550180',
    sessionId: 'DE6FA86F60BB47B379307F851E238617',
    ipAddress: '244.28.239.130',
  },
}

// Encrypted result
// interface EncryptedValue {
//  encryptedData: string,
//  keyId: string
// }
 
const encryptData = async (dataToEncrypt: FormState): Promise<any> => {
    
    const { 
      creditCardNumber, 
      cvv, 
      expMonth, 
      expYear, 
    } = dataToEncrypt
    

    // eslint-disable-next-line
    console.log('creditCardNumber  ', typeof creditCardNumber)
    

   

    /*
     const cardDetails = {
      number: '4007400000000007',
      cvv: '123',
    }

    expMonth: 01,
    expYear: 2025,

    billingDetails: {
        name: 'Customer 0001',
        country: 'US',
        district: 'MA',
        line1: 'Test',
        line2: '',
        city: 'Test City',
        postalCode: '11111',
      },

    */

    const cardDetails = {
      number: creditCardNumber.trim().replace(/\D/g, ''),
      cvv,
    }

    // eslint-disable-next-line
    console.log('cardDetails       ', cardDetails)
    
    

    const payload: CreateCardPayload = {
      idempotencyKey: uuidv4(),
      expMonth: parseInt(expMonth),
      expYear: parseInt(expYear),
      keyId: '',
      encryptedData: '',
      billingDetails: {
        name: 'Customer 0001',
        country: 'US',
        district: 'MA',
        line1: 'Test',
        line2: '',
        city: 'Test City',
        postalCode: '11111',
      },
      metadata: {
        email:'customer-0001@circle.com',
        phoneNumber: '+12025550180',
        sessionId: 'DE6FA86F60BB47B379307F851E238617',
        ipAddress: '244.28.239.130',
      },
    }

    const publicKeyR =  await getPCIPublicKey()

    if(publicKeyR.error) {
      throw new Error(publicKeyR.error)
      
    }

    const encryptedData = await openPGP.encrypt(cardDetails, publicKeyR)

    const { encryptedMessage, keyId } = encryptedData

    payload.keyId = keyId
    payload.encryptedData = encryptedMessage
    
    const card = await createCard(payload)

    // eslint-disable-next-line
    console.log('card      ', card)

    return card
   
  }
 



   export default encryptData
