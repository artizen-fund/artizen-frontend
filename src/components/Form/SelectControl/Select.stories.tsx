import { useState } from 'react'
import { SelectControl, SelectControlProps } from './'

export default {
  title: 'forms/SelectControl',
  component: SelectControl,
  argTypes: {},
}

export const SelectControlComponent = (props: SelectControlProps) => {
  const [value, setValue] = useState('')
  const schema = {
    enum: ['', 'Chocolate', 'Strawberry', 'Vanilla', 'Neapolitan'],
  }
  return <SelectControl {...{ value, schema }} {...props} onChange={v => setValue(v)} label="Pick one…" />
}
