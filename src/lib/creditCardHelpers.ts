// mc, starts with - 51 to 55
// v, starts with - 4
// dsc, starts with 6011, 622126-622925, 644-649, 65
// amex, starts with 34 or 37

type CreditCardType = 'Visa' | 'Master Card' | 'Discover' | 'American Express'

export const ccnFormat = (inputString: string): string => {
  if (!inputString) return ''
  const ccn = inputString.replace(/[^0-9]/g, '')
  const cardType = ccType(ccn)
  if (!cardType) {
    return inputString
  }
  const cardArray = ['Visa', 'Master Card', 'Discover'].includes(cardType) ? formatNonAmex(ccn) : formatAmex(ccn)
  return cardArray.join(' ')
}

const ccType = (creditCardNumber?: string): CreditCardType | undefined => {
  if (!creditCardNumber) return undefined
  const typeCheck = parseInt(creditCardNumber.substring(0, 2))
  if (typeCheck >= 40 && typeCheck <= 49) {
    return 'Visa'
  } else if (typeCheck >= 51 && typeCheck <= 55) {
    return 'Master Card'
  } else if ((typeCheck >= 60 && typeCheck <= 62) || typeCheck === 64 || typeCheck === 65) {
    return 'Discover'
  } else if (typeCheck === 34 || typeCheck === 37) {
    return 'American Express'
  }
  return undefined
}

const formatNonAmex = (creditCardNumber: string): Array<string> => {
  const numberAsArray: Array<string> = []
  numberAsArray.push(creditCardNumber.substring(0, 4))
  numberAsArray.push(creditCardNumber.substring(4, 8))
  numberAsArray.push(creditCardNumber.substring(8, 12))
  numberAsArray.push(creditCardNumber.substring(12, 16))
  return numberAsArray
}

const formatAmex = (creditCardNumber: string): Array<string> => {
  const numberAsArray: Array<string> = []
  numberAsArray.push(creditCardNumber.substring(0, 4))
  numberAsArray.push(creditCardNumber.substring(4, 10))
  numberAsArray.push(creditCardNumber.substring(10, 15))
  return numberAsArray
}
