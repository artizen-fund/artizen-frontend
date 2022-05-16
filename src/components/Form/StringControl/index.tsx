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
  required?: boolean
  outline?: boolean
  autoComplete?: string

  schema?: JsonSchema
  uischema?: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
}

export const StringControl = (props: StringControlProps) => {
  const {
    icon,
    label,
    outline = true,
    disabled = false,
    required = false,
    autoComplete,
    uischema,
    data,
    handleChange,
    path,
  } = props
  const hasIcon = !!icon
  const valid = false
  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input
          {...{ disabled, required, autoComplete }}
          defaultValue={data}
          placeholder=" "
          type={uischema?.options?.format || 'text'}
          onChange={e => handleChange(path, e.target.value)}
        />
        <Label {...{ hasIcon }} className={valid ? 'valid' : ''}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
    </Wrapper>
  )
}

export const stringControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'string' && !schema.enum),
)

export default withJsonFormsControlProps(StringControl)
