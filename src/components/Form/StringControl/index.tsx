import { useState, useEffect } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import { Wrapper, Label, InputWrapper, InputIcon, Message } from '../_Common'

export interface StringControlProps {
  icon?: string
  label: string | Labels
  outline?: boolean
  disabled?: boolean
  onChange?: (e: any) => void
  required?: boolean
  autoComplete?: string
  schema: JsonSchema
  uischema: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
  errors?: string
  description?: string
}

export const StringControl = ({
  icon,
  label,
  outline = true,
  disabled,
  required,
  autoComplete,
  schema,
  uischema,
  data,
  handleChange,
  path,
  errors,
  description,
}: StringControlProps) => {
  const hasIcon = !!icon
  const [virgin, setVirgin] = useState(data === undefined)

  const [parsedErrors, setParsedErrors] = useState<string[]>([])
  useEffect(() => {
    const splitErrors = errors?.split('\n').filter(e => e !== '') || []
    if (required && !data) splitErrors.push('* required field')
    setParsedErrors(splitErrors)
  }, [errors, required, data])

  return (
    <Wrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <InputWrapper {...{ hasIcon, disabled, outline }}>
        <input
          {...{ disabled, required, autoComplete }}
          minLength={schema.minLength}
          maxLength={schema.maxLength}
          type={uischema?.options?.format || 'text'}
          placeholder={uischema.options?.placeholder}
          defaultValue={data}
          onChange={e => handleChange(path, e.target.value)}
          onBlur={() => setVirgin(false)}
          className={!!data ? 'hasData' : 'noData'}
        />
        <Label {...{ hasIcon }}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </Label>
      </InputWrapper>
      <Message {...{ virgin }} errorCount={parsedErrors.length}>
        {parsedErrors?.[0]}
      </Message>
    </Wrapper>
  )
}

export const stringControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'string' && !schema.enum),
)

export default withJsonFormsControlProps(StringControl)
