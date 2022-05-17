import { useState } from 'react'
import { StringControl, StringControlProps } from './'
import { iconKey } from '../../Icon/Icon.enums'

export default {
  title: 'forms/StringControl',
  component: StringControl,
  argTypes: {
    icon: {
      options: iconKey,
      control: { type: 'select' },
    },
  },
}

export const StringControlComponent = (props: StringControlProps) => {
  const [value, setValue] = useState('')
  return <StringControl {...{ value }} {...props} onChange={v => setValue(v)} label="What is your name?" />
}
