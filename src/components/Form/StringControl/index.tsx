import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels } from '@jsonforms/core'
import { Wrapper, Label, InputWrapper, InputIcon } from '../_Common'
import { rankWith, schemaMatches } from '@jsonforms/core'

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
}

export const StringControl = (props: StringControlProps) => {
  const { icon, label, outline = true, onChange, value, disabled = false, required = false, autoComplete } = props
  const hasIcon = !!icon
  const valid = false

  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input {...{ onChange, disabled, required, value, autoComplete }} placeholder=" " />
        <Label {...{ hasIcon }} className={valid ? 'valid' : ''}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
    </Wrapper>
  )
}

export const stringControlTester = rankWith(
  3, //increase rank as needed
  schemaMatches(schema => schema.type === 'string' && !schema.enum),
)

export default withJsonFormsControlProps(StringControl)
