import { useState } from 'react'
import SelectControl from './SelectControl'
import { EnumControlProps } from './'
import { glyphKey } from '@theme'

const story = {
  title: 'forms/SelectControl',
  component: SelectControl,
  argTypes: {
    icon: {
      options: glyphKey,
      control: { type: 'select' },
    },
  },
}
export default story

export const SelectControlComponent = (props: EnumControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, str: string) => setData(str)
  const schema = { enum: ['', 'Chocolate', 'Strawberry', 'Vanilla', 'Neapolitan'] }
  return <SelectControl {...{ data, handleChange, schema }} {...props} label="Pick one…" />
}
