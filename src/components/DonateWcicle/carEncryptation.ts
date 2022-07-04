import { createMessage, encrypt, readKey, readMessage } from 'openpgp'
import { v4 as uuidv4 } from 'uuid'
import {getPCIPublicKey, createCard} from '../../lib/cardsApi'
// import createCard from '../../lib/cardsApi'

// Object to be encrypted
interface CardDetails {
creditCardNumber: string,    // required when storing card details
 cvv?: number        // required when cardVerification is set to cvv
 expiry?: string
 phoneNumber?: string,
}

// Encrypted result
interface EncryptedValue {
 encryptedData: string,
 keyId: string
}
 
const encryptData = async (dataToEncrypt: CardDetails): Promise<EncryptedValue> => {
    
    const { email, phoneNumber, creditCardNumber, CVV, ...data } = dataToEncrypt
    console.log('creditCardNumber  ', typeof creditCardNumber)
    

    const cardDetails = {
      number: '4007400000000007',
      CVV: '222',
    }
    // const { expiry } = data

    const payload: CreateCardPayload = {
      idempotencyKey: uuidv4(),
      expMonth: parseInt('01'),
      expYear: parseInt('2028'),
      keyId: '',
      encryptedData: '',
      billingDetails: {
        name: 'Satoshi Nakamoto',
        city: 'Boston',
        country: 'US',
        line1: '100 Money Street',
        line2: 'Suite 1',
        district: 'MA',
        postalCode: '01234',
      },
      metadata: {
        email:'rubelux@gmail.com',
        phoneNumber: '+14155555555',
        sessionId: 'DE6FA86F60BB47B379307F851E238617',
        ipAddress: '244.28.239.130',
      },
    }

    const publicKeyR =  await getPCIPublicKey()

    if(publicKeyR.error) {
      throw new Error(publicKeyR.error)
      
    }

    const {publicKey, keyId} = publicKeyR

    console.log('publicKey  :: ', atob('LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tCgptUUVOQkY0YzhWZ0JDQUM4QnN6WElCTytiZDZ4VnhLMUdlc3hLK2sybnlpamZ0NDdWa2xnbU80VmpTSmMzQS8yCkljeDNyWFR3S0ZIV282ckJBVUduSVhoK2ZYKzIwZGYwbld6WlNvN3ZNK0ZpMTMzVlpuTG0zalk4cVozdnR5WEMKenhqZnJ5UnlDSncrMlh6cnRGVklYT0RLSEd0RjhUSXZFNUdjdVMxclNmMGlsVUtzOWxUdXlOTEx1bXZJQ2RTeQpCMWQ3MUVCM3VDMUJpekRtaWplMHNFbjB0QXBGS3V0ZnB5aWtsbTZwWm9zWnVnYVUzL1Z3NWNkQTU5VlhHWnFpCjNTWGdzeHU1RE4zc21TU3ZVVkthMUtQd3hackZRZHQ2a3lOVUFuR0lRS3d4b3BjejAyY255R3JvZEdGU3c5TC8KbzlmeHo3Q3FpcnJvL3F6VjJzQmxFMkRvZWVLY09ZVTlzVHRCQUJFQkFBRzBCa05wY21Oc1pZa0JWQVFUQVFnQQpQaFloQlBTc3RXN3o4TkgrWVQ1MGE3S1dkbkdNTUlYQUJRSmVIUEZZQWhzREJRazRaQWtBQlFzSkNBY0NCaFVLCkNRZ0xBZ1FXQWdNQkFoNEJBaGVBQUFvSkVMS1dkbkdNTUlYQXhSQUgvM2xVL1hJbEkrZG5PR2pGRHJCTHMzcUYKN1grV0xsSU5YRmlaNWFuRC9ySnRUbGptb2R2dkhSSmlJTm1GcTRrNi90MURqcTJsdWpXTTFIUmJIaUtxTE56dQovWVJNNG5aL1lGUUd2YktqY3dNWHJDZ1Y1UFNESjZJdTE3MW4vdFFrYXFmRzd0M2ZXQzQzek10VFM4YnV6ZEtGCkQ1ai9yd0VkUjhhOXlsc0luWDdPZXlqekpUeENjQm1udmE1LzhZRFF4NFd4bk1WQWJ4ZnRRSjJzUXNJa0pNQ2MKV1d0TVZwZWlSSExlbWg1cnNhWnBnSkZ5cW1QODJXaDd0aGRkWHd3eVFGcHVUc2x6b1VKMmJaakZyMUxDSjBxRQp3MVJBOFVHaWhPUFB2SVprc2RvdFVDVDhoeXJPYU9GbUtDVUhhV0FQYzRDT3NzdVJpMU5VSGpJUVA0bVUyU0M1CkFRMEVYaHp4V0FFSUFMZFhXTUJaODlQZHFrSVRPWWZlL1pZZko4c2Nudk1PdlovQW1Vb3JpakM4M1VMdjVLbWsKSGpjVXJTR0pFYkpOdDl2NWVpc2RGOFRDNzVwZmhBLzZiOHZCUTVoMU0yT0FoUklYZGlJY1hLaTJyTXhINU9jWQo2YWFkWlVIRFIrYUZWRmtWdm53UnkxVFRDOFNleWs5UDRtd2lrTzl2RGlpMmU1SFl0R1pQcUVEWXVRN05pQnM2CktMRWpHclMwWFpieHg4WVk5enRRTUZKc2ZjdXRJd2lvTy9HcU1ZMFRKdkI0QnVJWTh2TjhPTnVubHZjb2JBYS8KcVRpYVFUcE93T3g2eElPbHB0TkFST1pncUNPZEk2R2NqMjRZRmcycEV4d0h0SjBXOFJpRDBpNEJJU0tEYkZEVAovWmlkMkptZW9vdG0vZXpaNUlDSUZNNk1wOEhDTjB6eWFSMEFFUUVBQVlrQlBBUVlBUWdBSmhZaEJQU3N0Vzd6CjhOSCtZVDUwYTdLV2RuR01NSVhBQlFKZUhQRllBaHNNQlFrNFpBa0FBQW9KRUxLV2RuR01NSVhBdmVJSC9BM1IKOTdlSENUOHdlOUFDUXkxcDJmNk41UFd6QWRaTUtQNm9QTXhpNFlCVUoyK1orNDVibnB2a0ZSdllMVjNwVFRIRApEY0N5cWh4Z0cxdEVGaVUyclZINlFzRStnWldYZkJPZU1lWHhqRkt0U0lzNktQUWViVlMrUHJhOHljK3RPakxOCkZsNlFCRjNGcGJ3YmE5L1pPbk1rbW9yTE1IV241RnJOVy9aZnVLdzhTMHFGQ29nUVNxUUVpbjZnQ0ZEd0gzK0QKQ2JzcDVKMm4xN1pncjBpcGRRYjk4MDJ1bXdDVG9aVGtwL0pwb2t4YzJTZlczaG0xUEc4M1NPUGdMUll0a3JuTApRbURYSmtDdEN6amN3eGQwdnJpVzM4Y29zQko1aVN4WHU5MEZHRWZaaGQ1Y0o4cFpKSkd2VGMrMyt6eE1sWU1HCnZmUjNvUFFoWmtwT2NyRUhlajA9Cj1BT0QzCi0tLS0tRU5EIFBHUCBQVUJMSUMgS0VZIEJMT0NLLS0tLS0K'))

    const decodedPublicKey = await readKey({ armoredKey: atob('LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tCgptUUVOQkY0YzhWZ0JDQUM4QnN6WElCTytiZDZ4VnhLMUdlc3hLK2sybnlpamZ0NDdWa2xnbU80VmpTSmMzQS8yCkljeDNyWFR3S0ZIV282ckJBVUduSVhoK2ZYKzIwZGYwbld6WlNvN3ZNK0ZpMTMzVlpuTG0zalk4cVozdnR5WEMKenhqZnJ5UnlDSncrMlh6cnRGVklYT0RLSEd0RjhUSXZFNUdjdVMxclNmMGlsVUtzOWxUdXlOTEx1bXZJQ2RTeQpCMWQ3MUVCM3VDMUJpekRtaWplMHNFbjB0QXBGS3V0ZnB5aWtsbTZwWm9zWnVnYVUzL1Z3NWNkQTU5VlhHWnFpCjNTWGdzeHU1RE4zc21TU3ZVVkthMUtQd3hackZRZHQ2a3lOVUFuR0lRS3d4b3BjejAyY255R3JvZEdGU3c5TC8KbzlmeHo3Q3FpcnJvL3F6VjJzQmxFMkRvZWVLY09ZVTlzVHRCQUJFQkFBRzBCa05wY21Oc1pZa0JWQVFUQVFnQQpQaFloQlBTc3RXN3o4TkgrWVQ1MGE3S1dkbkdNTUlYQUJRSmVIUEZZQWhzREJRazRaQWtBQlFzSkNBY0NCaFVLCkNRZ0xBZ1FXQWdNQkFoNEJBaGVBQUFvSkVMS1dkbkdNTUlYQXhSQUgvM2xVL1hJbEkrZG5PR2pGRHJCTHMzcUYKN1grV0xsSU5YRmlaNWFuRC9ySnRUbGptb2R2dkhSSmlJTm1GcTRrNi90MURqcTJsdWpXTTFIUmJIaUtxTE56dQovWVJNNG5aL1lGUUd2YktqY3dNWHJDZ1Y1UFNESjZJdTE3MW4vdFFrYXFmRzd0M2ZXQzQzek10VFM4YnV6ZEtGCkQ1ai9yd0VkUjhhOXlsc0luWDdPZXlqekpUeENjQm1udmE1LzhZRFF4NFd4bk1WQWJ4ZnRRSjJzUXNJa0pNQ2MKV1d0TVZwZWlSSExlbWg1cnNhWnBnSkZ5cW1QODJXaDd0aGRkWHd3eVFGcHVUc2x6b1VKMmJaakZyMUxDSjBxRQp3MVJBOFVHaWhPUFB2SVprc2RvdFVDVDhoeXJPYU9GbUtDVUhhV0FQYzRDT3NzdVJpMU5VSGpJUVA0bVUyU0M1CkFRMEVYaHp4V0FFSUFMZFhXTUJaODlQZHFrSVRPWWZlL1pZZko4c2Nudk1PdlovQW1Vb3JpakM4M1VMdjVLbWsKSGpjVXJTR0pFYkpOdDl2NWVpc2RGOFRDNzVwZmhBLzZiOHZCUTVoMU0yT0FoUklYZGlJY1hLaTJyTXhINU9jWQo2YWFkWlVIRFIrYUZWRmtWdm53UnkxVFRDOFNleWs5UDRtd2lrTzl2RGlpMmU1SFl0R1pQcUVEWXVRN05pQnM2CktMRWpHclMwWFpieHg4WVk5enRRTUZKc2ZjdXRJd2lvTy9HcU1ZMFRKdkI0QnVJWTh2TjhPTnVubHZjb2JBYS8KcVRpYVFUcE93T3g2eElPbHB0TkFST1pncUNPZEk2R2NqMjRZRmcycEV4d0h0SjBXOFJpRDBpNEJJU0tEYkZEVAovWmlkMkptZW9vdG0vZXpaNUlDSUZNNk1wOEhDTjB6eWFSMEFFUUVBQVlrQlBBUVlBUWdBSmhZaEJQU3N0Vzd6CjhOSCtZVDUwYTdLV2RuR01NSVhBQlFKZUhQRllBaHNNQlFrNFpBa0FBQW9KRUxLV2RuR01NSVhBdmVJSC9BM1IKOTdlSENUOHdlOUFDUXkxcDJmNk41UFd6QWRaTUtQNm9QTXhpNFlCVUoyK1orNDVibnB2a0ZSdllMVjNwVFRIRApEY0N5cWh4Z0cxdEVGaVUyclZINlFzRStnWldYZkJPZU1lWHhqRkt0U0lzNktQUWViVlMrUHJhOHljK3RPakxOCkZsNlFCRjNGcGJ3YmE5L1pPbk1rbW9yTE1IV241RnJOVy9aZnVLdzhTMHFGQ29nUVNxUUVpbjZnQ0ZEd0gzK0QKQ2JzcDVKMm4xN1pncjBpcGRRYjk4MDJ1bXdDVG9aVGtwL0pwb2t4YzJTZlczaG0xUEc4M1NPUGdMUll0a3JuTApRbURYSmtDdEN6amN3eGQwdnJpVzM4Y29zQko1aVN4WHU5MEZHRWZaaGQ1Y0o4cFpKSkd2VGMrMyt6eE1sWU1HCnZmUjNvUFFoWmtwT2NyRUhlajA9Cj1BT0QzCi0tLS0tRU5EIFBHUCBQVUJMSUMgS0VZIEJMT0NLLS0tLS0K') })
    
    console.log('decodedPublicKey  ', decodedPublicKey)

    const message = await createMessage({ text: JSON.stringify(cardDetails) })

    // const ciphertext = await encrypt({message, encryptionKeys: decodedPublicKey})

    const {encryptedMessage} = await encrypt(
      {
        message: await createMessage({ text: JSON.stringify( {
          number: '4007400000000007',
          CVV: '222',
        }) }), 
        encryptionKeys: decodedPublicKey}).then(ciphertext => {
        console.log('ciphertext inside  ', ciphertext)
        return {
          encryptedMessage: btoa(ciphertext),
          keyId,
        }
      },
    )

    console.log('publicKey 3333   ', encryptedMessage)

  

  // console.log('messageTestToRead  ', messageTestToRead)

    
    
    // const { encryptedMessage, keyId } = encryptedData

    payload.keyId = keyId
    payload.encryptedData = encryptedMessage
    // payload.encryptedData = 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo'

    


    const card = await createCard(payload)

    console.log('card      ', card)
    // if (card) {
    //   this.$store.dispatch('setCard', {
    //     id: card.id,
    //   })
    // }
    // this.$emit('success', card)
   
  }
 
/**
* Encrypt card data function
*/

// const encryptData = async (dataToEncrypt: CardDetails): Promise<EncryptedValue> => {
//     const pciEncryptionKey = await getPCIPublicKey()
//     console.log('gets here')
//     const decodedPublicKey = await readKey({ armoredKey: atob(pciEncryptionKey) })
//      const message = await createMessage({ text: JSON.stringify(dataToEncrypt) })
//      return encrypt({
//        message,
//        encryptionKeys: decodedPublicKey,
//      }).then((ciphertext, keyId) => {
//        return {
//          encryptedMessage: btoa(ciphertext),
//          keyId,
//        }
//      })
//    }

   export default encryptData

// return async function (dataToEncrypt: CardDetails): Promise<EncryptedValue> {
//  const decodedPublicKey = await readKey({ armoredKey: atob(publicKey) })
//   const message = await createMessage({ text: JSON.stringify(dataToEncrypt) })
//   return encrypt({
//     message,
//     encryptionKeys: decodedPublicKey,
//   }).then((ciphertext, keyId) => {
//     return {
//       encryptedMessage: btoa(ciphertext),
//       keyId,
//     }
//   })
// }