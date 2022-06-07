import { useState } from 'react'
import CheckboxControl from './CheckboxControl'
import { BooleanControlProps } from './'

const story = {
  title: 'forms/CheckboxControl',
  component: CheckboxControl,
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    inverted: { control: { type: 'boolean' } },
  },
}
export default story

export const CheckboxControlComponent = (props: BooleanControlProps) => {
  const [value, setValue] = useState<boolean>()
  return (
    <CheckboxControl
      {...{ value }}
      {...props}
      handleChange={(_, newValue: boolean) => setValue(newValue)}
      label="Are you on, or off?"
    />
  )
}
