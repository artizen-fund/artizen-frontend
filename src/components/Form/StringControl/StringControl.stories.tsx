import { useState } from 'react'
import { StringControl, StringControlProps } from './'

export default {
  title: 'forms/StringControl',
  component: StringControl,
  argTypes: {
    label: {
      defaultValue: 'Enter a string',
      control: { type: 'text' },
    },
    placeholder: {
      defaultValue: 'string go here',
      control: { type: 'text' },
    },
    format: {
      defaultValue: 'text',
      options: ['text', 'email', 'url', 'password', 'phone'],
      control: { type: 'select' },
    },
    errors: { control: { type: 'text' } },
  },
}

interface StringControlPropsWithPlaceholder extends StringControlProps {
  placeholder?: string
  format: 'text' | 'email' | 'url' | 'password'
}

export const StringControlComponent = (props: StringControlPropsWithPlaceholder) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, s: string) => setData(s)
  const uischema = {
    options: {
      placeholder: props.placeholder,
      format: props.format,
    },
    type: 'Control',
  }
  return <StringControl {...{ data, handleChange, uischema }} {...props} />
}
