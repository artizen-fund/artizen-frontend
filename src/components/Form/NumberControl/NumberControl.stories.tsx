import { useState } from 'react'
import { NumberControl, NumberControlProps } from './'
import { iconKey } from '../../Icon/Icon.enums'

export default {
  title: 'forms/NumberControl',
  component: NumberControl,
  argTypes: {
    icon: {
      options: iconKey,
      control: { type: 'select' },
    },
  },
}

export const NumberControlComponent = (props: NumberControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, s: string) => setData(s)
  return <NumberControl {...{ data, handleChange }} {...props} label="How old are you?" />
}
