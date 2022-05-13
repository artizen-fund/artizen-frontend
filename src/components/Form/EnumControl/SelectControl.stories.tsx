import { useState } from 'react'
import SelectControl from './SelectControl'
import { EnumControlProps } from './'
import { iconKey } from '../../Icon/Icon.enums'

export default {
  title: 'forms/SelectControl',
  component: SelectControl,
  argTypes: {
    icon: {
      options: iconKey,
      control: { type: 'select' },
    },
  },
}

export const SelectControlComponent = (props: EnumControlProps) => {
  const [value, setValue] = useState('')
  const schema = {
    enum: ['', 'Chocolate', 'Strawberry', 'Vanilla', 'Neapolitan'],
  }
  return <SelectControl {...{ value, schema }} {...props} onChange={v => setValue(v)} label="Pick one…" />
}
