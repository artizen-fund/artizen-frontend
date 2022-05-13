import { useState } from 'react'
import { StringControl, StringControlProps } from './'

export default {
  title: 'forms/StringControl',
  component: StringControl,
  argTypes: {},
}

export const StringControlComponent = (props: StringControlProps) => {
  const [value, setValue] = useState('')
  return <StringControl {...{ value }} {...props} onChange={v => setValue(v)} label="What is your name?" />
}
