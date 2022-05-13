import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import SwitchControl from './SwitchControl'
import CheckboxControl from './CheckboxControl'

export interface BooleanControlProps {
  icon?: string
  invalid?: boolean
  label: string | Labels
  disabled?: boolean
  onChange?: (e: any) => void
  required?: boolean

  schema: JsonSchema
  uischema: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
}

export const BooleanControl = (props: BooleanControlProps) =>
  props.uischema.options?.format === 'switch' ? <SwitchControl {...props} /> : <CheckboxControl {...props} />

export const booleanControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'boolean'),
)

export default withJsonFormsControlProps(BooleanControl)
