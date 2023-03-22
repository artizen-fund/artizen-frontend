import { useState, useEffect, FormEventHandler } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { rankWith, schemaMatches, JsonSchema, ControlElement } from '@jsonforms/core'
import { Wrapper, InputLabel, InputWrapper, Message, InputGlyph } from '../_Common'
import { GlyphKey } from '@theme'
import PhoneInput from './PhoneInput'
import UploadFileControl from '../UploadFileControl'
import UploadCloudinaryFileControl from '../UploadCloudinaryFileControl'

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

  /* Why are we managing state locally and not just using data and handleChange from JSONForms?
   * For unknown reasons, React thinks that's changing from an unmanaged to a managed input.
   * That error goes away when we go unmanaged, but then we're not able to do special formatting
   *   like toLowerCase()
   * So, this is the compromise. Not crazy about it. :\ -EJ
   */

  const [localData, setLocalData] = useState<string>(data || '')

  useEffect(() => {
    // TODO: Commented this out so the input field can be set as empty
    // if (!localData) return
    console.log('!!localData   ', path, !!localData)
    handleChange(path, !!localData ? localData : '')
  }, [localData])

  const [parsedErrors, setParsedErrors] = useState<string[]>([])
  useEffect(() => {
    const splitErrors = errors?.split('\n').filter(e => e !== '') || []
    if (required && (!data || data === '')) splitErrors.push('is a required property')
    setParsedErrors(splitErrors)
  }, [errors, required, data])

  const handleStringChange = (value: string) => {
    // put any special formatting rules here
    if (uischema?.options?.format === 'creditCard') {
      // setLocalData(ccnFormat(value))
    } else if (uischema?.options?.format === 'lowercase') {
      setLocalData(value.toLowerCase())
    } else {
      setLocalData(value)
    }
  }

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

  const hasMessage = !virgin && !!errors && errors !== ''

  return (
    <Wrapper gridArea={path} {...props} {...{ hasMessage }} id={uischema?.scope}>
      <InputWrapper disabled={!enabled || processing}>
        {uischema?.options?.format === 'uploadFile' ? (
          <UploadFileControl
            {...{ required, setVirgin, enabled, data, path, handleChange, uischema }}
            disabled={!enabled}
            placeholder={uischema?.options?.placeholder || ' '}
            onBlur={() => setVirgin(false)}
            className={!!data ? 'hasData' : ''}
          />
        ) : uischema?.options?.format === 'uploadCloudinaryFile' ? (
          <UploadCloudinaryFileControl
            {...{ required, setVirgin, enabled, data, path, handleChange, uischema }}
            disabled={!enabled}
            placeholder={uischema?.options?.placeholder || ' '}
            onBlur={() => setVirgin(false)}
            className={!!data ? 'hasData' : ''}
          />
        ) : uischema?.options?.format === 'phone' ? (
          <PhoneInput
            {...{ required, autoComplete }}
            disabled={!enabled}
            placeholder={uischema?.options?.placeholder || ' '}
            value={localData}
            onChange={(e: string) => setLocalData(e)}
            onBlur={() => setVirgin(false)}
            countrySelectProps={{ unicodeFlags: true }}
            defaultCountry="US"
            international={false}
            className={!!data ? 'hasData' : ''}
          />
        ) : schema?.format === 'date' ? (
          <input
            {...{ required, autoComplete }}
            disabled={!enabled || processing}
            minLength={schema?.minLength}
            maxLength={schema?.maxLength}
            type="date"
            placeholder={uischema?.options?.placeholder || ' '}
            value={localData}
            onChange={e => handleStringChange(e.target.value)}
            onBlur={() => setVirgin(false)}
          />
        ) : uischema?.options?.format === 'text' ? (
          <textarea
            {...{ required, autoComplete }}
            disabled={!enabled || processing}
            minLength={schema?.minLength}
            maxLength={schema?.maxLength}
            placeholder={uischema?.options?.placeholder || ' '}
            value={localData}
            onChange={e => handleStringChange(e.target.value)}
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
            value={localData}
            onChange={e => handleStringChange(e.target.value)}
            onBlur={() => setVirgin(false)}
          />
        )}
        <InputLabel>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
        <InputGlyph outline color="night" darkColor="night" glyph={statusGlyph} />
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
