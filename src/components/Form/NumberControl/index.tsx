import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
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
  required?: boolean
  outline?: boolean

  schema?: JsonSchema
  uischema?: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
}

export const NumberControl = (props: NumberControlProps) => {
  const { icon, label, outline = true, disabled = false, required = false, data, handleChange, path } = props
  const hasIcon = !!icon
  const valid = false

  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input
          type="number"
          {...{ disabled, required }}
          defaultValue={data}
          placeholder=" "
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

export const numberControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'number' || schema.type === 'integer'),
)

export default withJsonFormsControlProps(NumberControl)
