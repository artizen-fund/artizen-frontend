/*
todo: this doesn't parse floats
*/

import { useState, useEffect } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import { Wrapper, InputLabel, InputIcon, InputWrapper, Message } from '../_Common'

export interface NumberControlProps {
  label: string | Labels
  disabled?: boolean
  onChange?: (e: any) => void
  required?: boolean
  schema: JsonSchema
  uischema: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
  errors?: string
}

export const NumberControl = ({
  label,
  disabled,
  required,
  schema,
  uischema,
  data,
  handleChange,
  path,
  errors,
}: NumberControlProps) => {
  const hasWidget = false
  const hasStatusIcon = false
  const [virgin, setVirgin] = useState(data === undefined)

  const [parsedErrors, setParsedErrors] = useState<string[]>([])
  useEffect(() => {
    const splitErrors = errors?.split('\n').filter(e => e !== '') || []
    if (required && !data) splitErrors.push('* required field')
    setParsedErrors(splitErrors)
  }, [errors, required, data])

  const [visibleError, setVisibleError] = useState<string>()
  useEffect(() => {
    if (visibleError && parsedErrors.length < 1) {
      // wait a moment before disappearing the error so that it's visible during transition-out
      setTimeout(() => setVisibleError(undefined), 1000)
    } else {
      setVisibleError(parsedErrors[0])
    }
  }, [parsedErrors])

  const step = schema.type === 'integer' ? 1 : uischema.options?.precision ? uischema.options.precision : 'any'

  return (
    <Wrapper {...{ disabled }} hasMessage={!!errors}>
      <InputWrapper {...{ hasWidget, hasStatusIcon, disabled }}>
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
        <InputLabel {...{ hasWidget }}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
      </InputWrapper>
      <Message {...{ virgin }} className={!!errors ? 'hasErrors' : ''}>
        {visibleError}
      </Message>
    </Wrapper>
  )
}

export const numberControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'number' || schema.type === 'integer'),
)

export default withJsonFormsControlProps(NumberControl)
