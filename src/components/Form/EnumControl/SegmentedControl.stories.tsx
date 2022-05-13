import { useState } from 'react'
import SegmentedControl from './SegmentedControl'
import { EnumControlProps } from './'

export default {
  title: 'forms/SegmentedControl',
  component: SegmentedControl,
  argTypes: {},
}

export const SegmentedControlComponent = (props: EnumControlProps) => {
  const [value, setValue] = useState('')
  const schema = {
    enum: ['Chocolate', 'Strawberry', 'Vanilla', 'Neapolitan'],
  }
  return <SegmentedControl {...{ value, schema }} {...props} onChange={v => setValue(v)} label="Pick one…" />
}
