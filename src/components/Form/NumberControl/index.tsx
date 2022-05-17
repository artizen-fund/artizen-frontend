/*
todo: this doesn't parse floats
*/

import { useState, useEffect } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import { Wrapper, InputLabel, InputWrapper, InputIcon, Message } from '../_Common'

export interface NumberControlProps {
  icon?: string
  label: string | Labels
  outline?: boolean
  disabled?: boolean
  onChange?: (e: any) => void
  required?: boolean
  schema: JsonSchema
  uischema: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
  errors?: string
  description?: string
}

export const NumberControl = ({
  icon,
  label,
  outline = true,
  disabled,
  required,
  schema,
  uischema,
  data,
  handleChange,
  path,
  errors,
  description,
}: NumberControlProps) => {
  const hasIcon = !!icon
  const [virgin, setVirgin] = useState(data === undefined)

  const [parsedErrors, setParsedErrors] = useState<string[]>([])
  useEffect(() => {
    const splitErrors = errors?.split('\n').filter(e => e !== '') || []
    if (required && !data) splitErrors.push('* required field')
    setParsedErrors(splitErrors)
  }, [errors, required, data])

  const step = schema.type === 'integer' ? 1 : uischema.options?.precision ? uischema.options.precision : 'any'

  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input
          {...{ disabled, required }}
          minLength={schema.minimum}
          maxLength={schema.maximum}
          type="number"
          step={step}
          placeholder={uischema.options?.placeholder}
          defaultValue={data}
          onChange={e => handleChange(path, parseFloat(e.target.value))}
          onBlur={() => setVirgin(false)}
          className={!!data ? 'hasData' : 'noData'}
        />
        <InputLabel {...{ hasIcon }}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
        <Message {...{ virgin }} errorCount={parsedErrors.length}>
          {parsedErrors?.[0]}
        </Message>
      </InputWrapper>
    </Wrapper>
  )
}

export const numberControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'number' || schema.type === 'integer'),
)

export default withJsonFormsControlProps(NumberControl)
