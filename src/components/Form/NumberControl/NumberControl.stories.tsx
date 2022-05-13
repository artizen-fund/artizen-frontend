import { useState } from 'react'
import { NumberControl, NumberControlProps } from './'

export default {
  title: 'forms/NumberControl',
  component: NumberControl,
  argTypes: {},
}

export const NumberControlComponent = (props: NumberControlProps) => {
  const [value, setValue] = useState<number>()
  return <NumberControl {...{ value }} {...props} onChange={v => setValue(v)} label="How old are you?" />
}
