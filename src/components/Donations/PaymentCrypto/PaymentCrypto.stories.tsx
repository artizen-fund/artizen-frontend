import PaymentCrypto from './'

export default {
  title: 'donations/PaymentCrypto',
  component: PaymentCrypto,
  argTypes: {},
}

export const PaymentCryptoComponent = (props: any) => {
  const amount = 1000
  return <PaymentCrypto {...props} {...{ amount }} />
}
