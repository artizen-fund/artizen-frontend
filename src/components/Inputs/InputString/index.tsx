import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels } from '@jsonforms/core'
import { Wrapper, Label, InputWrapper, InputIcon } from '../_Common'

export interface InputStringProps {
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

const InputString = (props: InputStringProps) => {
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

export default withJsonFormsControlProps(InputString)
