import { useState, useEffect } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import { Wrapper, InputLabel, InputWrapper, Message, InputIcon } from '../_Common'
import { IconKey } from '@theme'
import PhoneInput from './PhoneInput'

/* Todo: Trying to decide if schema and uischema should be optional.
 *       Boils down to whether we will ever use these outside of jsonforms.
 */
export interface StringControlProps {
  label: string | Labels
  disabled?: boolean
  onChange?: (e: any) => void
  required?: boolean
  autoComplete?: string
  schema?: JsonSchema
  uischema?: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
  errors?: string
}

export const StringControl = ({
  label,
  disabled,
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

  // This effect is for all right-hand-side icons.
  // This is currently just disabled ("locked"), but down the line could include a spinner, red/yellow/green status markers, …?
  const [statusIcon, setStatusIcon] = useState<keyof IconKey>()
  useEffect(() => {
    setStatusIcon(disabled ? 'lock' : undefined)
  }, [disabled])

  // This is for all left-hand-side icons.
  // Currently just phone.
  const hasWidget = uischema?.options?.format === 'phone'

  return (
    <Wrapper gridArea={path} {...{ disabled }} hasMessage={!!errors} {...props}>
      <InputWrapper {...{ hasWidget, disabled }} hasStatusIcon={!!statusIcon}>
        {uischema?.options?.format === 'phone' ? (
          <PhoneInput
            {...{ disabled, required, autoComplete }}
            placeholder={uischema?.options?.placeholder}
            value={data}
            onChange={(e: string) => handleChange(path, e)}
            onBlur={() => setVirgin(false)}
            className={!!data ? 'hasData' : 'noData'}
            countrySelectProps={{ unicodeFlags: true }}
            defaultCountry="US"
            international={false}
          />
        ) : (
          <input
            {...{ disabled, required, autoComplete }}
            minLength={schema?.minLength}
            maxLength={schema?.maxLength}
            type={uischema?.options?.format || 'text'}
            placeholder={uischema?.options?.placeholder}
            defaultValue={data}
            onChange={e => handleChange(path, e.target.value)}
            onBlur={() => setVirgin(false)}
            className={!!data ? 'hasData' : 'noData'}
          />
        )}
        <InputLabel {...{ hasWidget }}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
        {statusIcon && <InputIcon color="night">{statusIcon}</InputIcon>}
      </InputWrapper>
      <Message {...{ virgin }} className={!!errors ? 'hasErrors' : ''}>
        {visibleError}
      </Message>
    </Wrapper>
  )
}

export const stringControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'string' && !schema.enum),
)

export default withJsonFormsControlProps(StringControl)
