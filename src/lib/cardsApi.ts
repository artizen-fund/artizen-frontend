// import { getAPIHostname } from './apiTarget'

interface MetaData {
  email?: string
  phoneNumber?: string
  sessionId: string
  ipAddress: string
}

export interface UpdateCardPayload {
  keyId: string
  encryptedData: string
  expMonth: number
  expYear: number
}

export interface CreateCardPayload {
  idempotencyKey: string
  keyId: string
  encryptedData: string
  billingDetails: {
    name: string
    city: string
    country: string
    line1: string
    line2: string
    district: string
    postalCode: string
  }
  expMonth: number
  expYear: number
  metadata: MetaData
}






/**
 * Returns a public key used to encrypt card details
 *
 * @returns Promise<PublicKey> {"keyId": "key1", "publicKey": "LS0tLS1CRUdJTiBQR1A..." }
 */
 export async function getPCIPublicKey() {
  // const url = '/v1/encryption/public'

  const cicleApiRaw = await fetch('/api/get_cicle_api', {method: 'GET'})

  // eslint-disable-next-line
  console.log('cicleApiRaw  ', cicleApiRaw)
  const cicleApi = await cicleApiRaw.json()

  if(cicleApiRaw.status !== 200) {
    return {error: cicleApi}
  }

  return cicleApi.data
}





/**
 * Create Card
 * @param {*} payload (contains form data and encrypted card details)
 */
 
  export async function createCard(payload: CreateCardPayload) {
  // const url = '/v1/cards'
  // if (payload.metadata) {
  //   payload.metadata.phoneNumber = nullIfEmpty(payload.metadata.phoneNumber)
  // }
  // return instance.post(url, payload)

  

  const createCardDataRaw = await fetch('/api/createcard', 
  {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  },
  )

  if(createCardDataRaw.status !== 200) {
    return  new Error('Error creating card   ')
  }
  const createCardData = await createCardDataRaw.json()

  return createCardData.data

}



export default {
  createCard,
}
