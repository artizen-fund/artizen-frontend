import { useState, useEffect, FormEventHandler } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { Labels, JsonSchema, ControlElement, rankWith, schemaMatches } from '@jsonforms/core'
import { Wrapper, InputLabel, InputIcon, InputWrapper, Message } from '../_Common'
import { GlyphKey } from '@theme'

export interface NumberControlProps {
  label: string | Labels
  enabled?: boolean
  processing?: boolean
  onChange?: FormEventHandler<HTMLDivElement>
  required?: boolean
  schema: JsonSchema
  uischema: ControlElement
  data: number
  handleChange(path: string, value: number): void
  path: string
  errors?: string
}

export const NumberControl = ({
  label,
  enabled,
  processing,
  required,
  schema,
  uischema,
  data,
  handleChange,
  path,
  errors,
  ...props
}: NumberControlProps) => {
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
  }, [visibleError, parsedErrors])

  // This effect is for all right-hand-side icons.
  // This is currently just disabled ("locked"), but down the line could include a spinner, red/yellow/green status markers, …?
  const [statusIcon, setStatusIcon] = useState<keyof GlyphKey>()
  useEffect(() => {
    setStatusIcon(enabled ? undefined : 'lock')
  }, [enabled])

  const step = schema.type === 'integer' ? 1 : uischema.options?.precision ? uischema.options.precision : 'any'

  const hasData = (data?: number) => !!data

  return (
    <Wrapper gridArea={path} hasMessage={!!errors} {...props} id={uischema?.scope}>
      <InputWrapper disabled={!enabled || processing} hasStatusIcon={!!statusIcon}>
        <input
          {...{ required }}
          disabled={!enabled || processing}
          defaultValue={data}
          minLength={schema.minimum}
          maxLength={schema.maximum}
          type="number"
          step={step}
          placeholder={uischema.options?.placeholder || ' '}
          onChange={e => handleChange(path, parseFloat(e.target.value))}
          onBlur={() => setVirgin(false)}
          className={hasData(data) ? 'hasData' : 'noData'}
        />
        <InputLabel>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
        {statusIcon && <InputIcon>{statusIcon}</InputIcon>}
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
