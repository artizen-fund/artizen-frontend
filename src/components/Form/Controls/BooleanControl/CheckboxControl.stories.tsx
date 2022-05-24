import { useState } from 'react'
import CheckboxControl from './CheckboxControl'
import { BooleanControlProps } from './'

export default {
  title: 'forms/CheckboxControl',
  component: CheckboxControl,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export const CheckboxControlComponent = (props: BooleanControlProps) => {
  const [value, setValue] = useState<boolean>()
  return (
    <CheckboxControl
      {...{ value }}
      {...props}
      handleChange={(_, v: boolean) => setValue(v)}
      label="Are you on, or off?"
    />
  )
}
