import { useState, useEffect, FormEventHandler } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { rankWith, schemaMatches, JsonSchema, ControlElement } from '@jsonforms/core'
import { Wrapper, InputLabel, InputWrapper, Message, InputGlyph } from '../_Common'
import { ccnFormat } from '@lib'
import { GlyphKey } from '@theme'
import PhoneInput from './PhoneInput'

export interface StringControlProps {
  label: string | Array<string>
  enabled?: boolean
  processing?: boolean
  onChange?: FormEventHandler<HTMLDivElement>
  required?: boolean
  autoComplete?: string
  schema?: JsonSchema
  uischema?: ControlElement
  data: string
  handleChange(path: string, value: string): void
  path: string
  errors?: string
}

export const StringControl = ({
  label,
  enabled,
  processing,
  required,
  autoComplete,
  schema,
  uischema,
  data,
  handleChange,
  path,
  errors,
  ...props
}: StringControlProps) => {
  const [virgin, setVirgin] = useState(data === undefined)

  const [parsedErrors, setParsedErrors] = useState<string[]>([])
  useEffect(() => {
    const splitErrors = errors?.split('\n').filter(e => e !== '') || []
    if (required && (!data || data === '')) splitErrors.push('is a required property')
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
  const [statusGlyph, setStatusGlyph] = useState<keyof GlyphKey>()
  useEffect(() => {
    if (!enabled) {
      setStatusGlyph('lock')
    } else if (uischema?.options?.format === 'creditCard') {
      setStatusGlyph('creditCard')
    } else {
      setStatusGlyph(undefined)
    }
  }, [enabled, uischema])

  // This is for all left-hand-side icons.
  // Currently just phone.
  const hasMessage = !virgin && !!errors && errors !== ''

  return (
    <Wrapper gridArea={path} {...props} {...{ hasMessage }} id={uischema?.scope}>
      <InputWrapper disabled={!enabled || processing} hasStatusGlyph={!!statusGlyph}>
        {uischema?.options?.format === 'phone' ? (
          <PhoneInput
            {...{ required, autoComplete }}
            disabled={!enabled}
            placeholder={uischema?.options?.placeholder || ' '}
            value={data}
            onChange={(e: string) => handleChange(path, e)}
            onBlur={() => setVirgin(false)}
            countrySelectProps={{ unicodeFlags: true }}
            defaultCountry="US"
            international={false}
            className={!!data ? 'hasData' : ''}
          />
        ) : uischema?.options?.format === 'cccreditCard' ? (
          <input
            {...{ required, autoComplete }}
            disabled={!enabled || processing}
            minLength={schema?.minLength}
            maxLength={schema?.maxLength}
            type={uischema?.options?.format || 'text'}
            placeholder={uischema?.options?.placeholder || ' '}
            defaultValue={data}
            onChange={e => handleChange(path, ccnFormat(e.target.value))}
            onBlur={() => setVirgin(false)}
            value={data}
          />
        ) : uischema?.options?.format === 'text' ? (
          <textarea
            {...{ required, autoComplete }}
            disabled={!enabled || processing}
            minLength={schema?.minLength}
            maxLength={schema?.maxLength}
            placeholder={uischema?.options?.placeholder || ' '}
            defaultValue={data}
            onChange={e => handleChange(path, e.target.value)}
            onBlur={() => setVirgin(false)}
            rows={3}
          />
        ) : (
          <input
            {...{ required, autoComplete }}
            disabled={!enabled || processing}
            minLength={schema?.minLength}
            maxLength={schema?.maxLength}
            type={uischema?.options?.format || 'text'}
            placeholder={uischema?.options?.placeholder || ' '}
            defaultValue={data}
            onChange={e => handleChange(path, e.target.value)}
            onBlur={() => setVirgin(false)}
          />
        )}
        <InputLabel>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
        {!!statusGlyph && <InputGlyph outline color="night" darkColor="night" glyph={statusGlyph} />}
      </InputWrapper>
      <Message className={hasMessage ? 'hasMessage' : ''}>{visibleError}</Message>
    </Wrapper>
  )
}

export const stringControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'string' && !schema.enum && !schema.oneOf),
)

export default withJsonFormsControlProps(StringControl)
