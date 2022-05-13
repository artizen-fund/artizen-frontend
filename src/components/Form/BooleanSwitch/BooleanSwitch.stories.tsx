import { useState } from 'react'
import { BooleanSwitch, BooleanSwitchProps } from './'

export default {
  title: 'forms/BooleanSwitch',
  component: BooleanSwitch,
  argTypes: {},
}

export const BooleanSwitchComponent = (props: BooleanSwitchProps) => {
  const [value, setValue] = useState<boolean>()
  return (
    <BooleanSwitch
      {...{ value }}
      {...props}
      handleChange={(_, v: boolean) => setValue(v)}
      label="Are you on, or off?"
    />
  )
}
