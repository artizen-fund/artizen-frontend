import { useState } from 'react'
import SwitchControl from './SwitchControl'
import { BooleanControlProps } from './'

const story = {
  title: 'forms/SwitchControl',
  component: SwitchControl,
  argTypes: {},
}
export default story

export const SwitchControlComponent = (props: BooleanControlProps) => {
  const [value, setValue] = useState<boolean>()
  return (
    <SwitchControl
      {...{ value }}
      {...props}
      handleChange={(_, newValue: boolean) => setValue(newValue)}
      label="Are you on, or off?"
    />
  )
}
