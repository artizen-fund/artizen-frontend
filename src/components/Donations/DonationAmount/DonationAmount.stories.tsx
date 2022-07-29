import { useState } from 'react'
import DonationAmount from './'

export default {
  title: 'components/DonationAmount',
  component: DonationAmount,
  argTypes: {},
}

export const DonationAmountComponent = (props: any) => {
  const [amount, setAmount] = useState(10) // note: sort out integer or float
  return <DonationAmount {...props} {...{ amount, setAmount }} />
}
