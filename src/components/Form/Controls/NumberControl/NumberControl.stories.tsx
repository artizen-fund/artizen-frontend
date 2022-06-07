import { useState } from 'react'
import { NumberControl, NumberControlProps } from './'
import { glyphKey } from '@theme'

const story = {
  title: 'forms/NumberControl',
  component: NumberControl,
  argTypes: {
    icon: {
      options: glyphKey,
      control: { type: 'select' },
    },
  },
}
export default story

export const IntegerControlComponent = (props: NumberControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, newData: string) => setData(newData)
  const schema = { type: 'integer' }
  const uischema = {}
  return <NumberControl {...{ data, handleChange, schema, uischema }} {...props} label="How old are you?" />
}

export const FloatControlComponent = (props: NumberControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, newData: string) => setData(newData)
  const schema = { type: 'number' }
  const uischema = { options: { precision: 0.01 } }
  return <NumberControl {...{ data, handleChange, schema, uischema }} {...props} label="How old are you?" />
}
