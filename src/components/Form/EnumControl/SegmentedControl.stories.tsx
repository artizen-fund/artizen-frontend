import { useState } from 'react'
import SegmentedControl from './SegmentedControl'
import { EnumControlProps } from './'

export default {
  title: 'forms/SegmentedControl',
  component: SegmentedControl,
  argTypes: {},
}

export const SegmentedControlComponent = (props: EnumControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, s: string) => setData(s)
  const schema = {
    enum: ['Chocolate', 'Strawberry', 'Vanilla', 'Neapolitan'],
  }
  return <SegmentedControl {...{ data, handleChange, schema }} {...props} label="Pick one…" />
}
