import { useState } from 'react'
import SegmentedControl from './'
import { EnumControlProps } from '../'

const story = {
  title: 'forms/SegmentedControl',
  component: SegmentedControl,
  argTypes: {},
}
export default story

export const SegmentedControlComponent = (props: EnumControlProps) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, str: string) => setData(str)
  const schema = { enum: ['Chocolate', 'Strawberry', 'Vanilla', 'Neapolitan'] }
  return <SegmentedControl {...{ data, handleChange, schema }} {...props} label="Pick one…" />
}
