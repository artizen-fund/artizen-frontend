import { v4 as uuidv4 } from 'uuid'


interface PayDetailsDetails {
    id: string,
    status: string,
    last4: string,
    billingDetails: {
      name: string,
      line1: string,
      city: string,
      postalCode: string,
      district: string,
      country: string,
    },
    expMonth: number
    expYear: number
    network: string,
    bin: string,
    issuerCountry: string,
    fundingType: string,
    fingerprint: string,
    verification: { cvv: string, avs: string },
    createDate: string,
    metadata: { phoneNumber: string, email: string },
    updateDate: string

}

// Encrypted result
interface EncryptedValue {
    encryptedData: string,
    keyId: string
   }

/*
idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
  keyId: 'key1',
  metadata: {
    email: 'satoshi@circle.com',
    phoneNumber: '+14155555555',
    sessionId: 'DE6FA86F60BB47B379307F851E238617',
    ipAddress: '244.28.239.130'
  },
  amount: {amount: '3.14', currency: 'USD'},
  autoCapture: true,
  verification: 'none',
  verificationSuccessUrl: 'https://www.example.com/3ds/verificationsuccessful',
  verificationFailureUrl: 'https://www.example.com/3ds/verificationfailure',
  source: {id: 'b8627ae8-732b-4d25-b947-1df8f4007a29', type: 'card'},
  description: 'Payment',
  encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
  channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
*/   


const makePayment = async (dataForPayment: PayDetailsDetails): Promise<any> => {

   /*
    const finalData = {
    idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
keyId: 'key1',
metadata: {
email: 'satoshi@circle.com',
phoneNumber: '+14155555555',
sessionId: 'DE6FA86F60BB47B379307F851E238617',
ipAddress: '244.28.239.130',
},
amount: {amount: '3.14', currency: 'USD'},
autoCapture: true,
verification: 'none',
verificationSuccessUrl: 'https://www.example.com/3ds/verificationsuccessful',
verificationFailureUrl: 'https://www.example.com/3ds/verificationfailure',
source: {id: 'b8627ae8-732b-4d25-b947-1df8f4007a29', type: 'card'},
description: 'Payment',
encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
}
   */

    const finalData = {
        idempotencyKey: uuidv4(),
        keyId: 'key1',
        metadata: {
            sessionId: 'xxx',
            ipAddress: '244.28.239.130',
            ...dataForPayment.metadata,
        },
        amount: {amount: '3.14', currency: 'USD'},
        autoCapture: true,
        verification: 'none',
        verificationSuccessUrl: 'https://www.example.com/3ds/verificationsuccessful',
        verificationFailureUrl: 'https://www.example.com/3ds/verificationfailure',
        source: {id: dataForPayment.id, type: 'card'},
        description: 'Payment',
        encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
        channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
        
    }

    
    

    const makePaymentDataRaw = await fetch('api/makepayment', 
    {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(finalData),
    },
    )
  
    if(makePaymentDataRaw.status !== 200) {
     // eslint-disable-next-line
      console.log('error makePaymentDataRaw')
    }
    const makePaymentData = await makePaymentDataRaw.json()

    // eslint-disable-next-line
    console.log('dataForPayment   ', makePaymentData)
    // const final

    return makePaymentData
}


export default makePayment

