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

export const NumberControlComponent = (props: NumberControlProps) => {
  const [value, setValue] = useState<number>()
  return <NumberControl {...{ value }} {...props} onChange={v => setValue(v)} label="How old are you?" />
}
