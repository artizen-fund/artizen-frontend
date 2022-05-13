import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import { Wrapper, Label, InputWrapper, InputIcon } from '../_Common'

export interface NumberControlProps {
  name?: string
  type?: 'textarea' | 'select' | 'text' | 'email' | 'password'
  icon?: string
  invalid?: boolean
  label: string | Labels
  disabled?: boolean
  onChange?: (e: any) => void
  value?: number
  required?: boolean
  options?: Array<string> | Record<string, string>
  outline?: boolean
  emptyFirstOption?: boolean
  autoComplete?: string
  capitalize?: boolean
}

export const NumberControl = (props: NumberControlProps) => {
  const { icon, label, outline = true, onChange, value, disabled = false, required = false, autoComplete } = props
  const hasIcon = !!icon
  const valid = false

  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input {...{ onChange, disabled, required, value, autoComplete }} placeholder=" " type="number" />
        <Label {...{ hasIcon }} className={valid ? 'valid' : ''}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
    </Wrapper>
  )
}

export const numberControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'number' || schema.type === 'integer'),
)

export default withJsonFormsControlProps(NumberControl)
