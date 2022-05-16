import { useState, useEffect } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import { Wrapper, Label, InputWrapper, InputIcon, Message } from '../_Common'

export interface StringControlProps {
  icon?: string
  invalid?: boolean
  label: string | Labels
  disabled?: boolean
  onChange?: (e: any) => void
  value?: string
  required?: boolean
  outline?: boolean
  autoComplete?: string
  message?: string
  schema?: JsonSchema
  uischema?: UISchemaElement
}

export const StringControl = (props: StringControlProps) => {
  const {
    icon,
    label,
    outline = true,
    onChange,
    value,
    disabled = false,
    required = false,
    autoComplete,
    message,
  } = props
  const hasIcon = !!icon
  const valid = false

  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input
          {...{ onChange, disabled, required, value, autoComplete }}
          placeholder=" "
          type={props.uischema?.options?.format || 'text'}
        />
        <Label {...{ hasIcon }} className={valid ? 'valid' : ''}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
      {message && <Message>{message}</Message>}
    </Wrapper>
  )
}

export const stringControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'string' && !schema.enum),
)

export default withJsonFormsControlProps(StringControl)
