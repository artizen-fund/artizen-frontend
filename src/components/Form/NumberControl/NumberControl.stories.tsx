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

export const IntegerControlComponent = (props: NumberControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, s: string) => setData(s)
  const schema = {
    type: 'integer',
  }
  const uischema = {}
  return <NumberControl {...{ data, handleChange, schema, uischema }} {...props} label="How old are you?" />
}

export const FloatControlComponent = (props: NumberControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, s: string) => setData(s)
  const schema = {
    type: 'number',
  }
  const uischema = {
    options: {
      precision: 0.01,
    },
  }
  return <NumberControl {...{ data, handleChange, schema, uischema }} {...props} label="How old are you?" />
}
