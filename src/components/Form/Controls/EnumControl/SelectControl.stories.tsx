import { useState } from 'react'
import SelectControl from './SelectControl'
import { EnumControlProps } from './'
import { iconKey } from '@theme'

export default {
  title: 'forms/SelectControl',
  component: SelectControl,
  argTypes: {
    icon: {
      options: iconKey,
      control: { type: 'select' },
    },
  },
}

export const SelectControlComponent = (props: EnumControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, s: string) => setData(s)
  const schema = {
    enum: ['', 'Chocolate', 'Strawberry', 'Vanilla', 'Neapolitan'],
  }
  return <SelectControl {...{ data, handleChange, schema }} {...props} label="Pick one…" />
}
