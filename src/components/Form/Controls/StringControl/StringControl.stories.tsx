import { useState } from 'react'
import { StringControl, StringControlProps } from './'
import { ControlElement } from '@jsonforms/core'

const story = {
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
    disabled: { control: { type: 'boolean' } },
    errors: { control: { type: 'text' } },
  },
}
export default story

interface StringControlPropsWithPlaceholder extends StringControlProps {
  placeholder?: string
  format: 'text' | 'email' | 'url' | 'password'
}

export const StringControlComponent = (props: StringControlPropsWithPlaceholder) => {
  const [data, setData] = useState('')
  const handleChange = (_: string, newData: string) => setData(newData)
  const uischema = {
    options: {
      placeholder: props.placeholder,
      format: props.format,
    },
    type: 'Control',
    scope: 'whatever',
  } as ControlElement
  return <StringControl {...{ data, handleChange, uischema }} {...props} />
}
