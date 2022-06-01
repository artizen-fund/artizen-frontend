import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, ControlElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import SwitchControl from './SwitchControl'
import CheckboxControl from './CheckboxControl'

export interface BooleanControlProps {
  inverted?: boolean
  invalid?: boolean
  label: string | Labels
  enabled?: boolean
  onChange?: (e: any) => void
  required?: boolean

  schema?: JsonSchema
  uischema?: ControlElement
  data: any
  handleChange(path: string, value: any): void
  path: string
}

export const BooleanControl = (props: BooleanControlProps) =>
  props.uischema?.options?.format === 'switch' ? (
    <SwitchControl {...props} />
  ) : (
    <CheckboxControl {...props} inverted={props.uischema?.options?.inverted} />
  )

export const booleanControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'boolean'),
)

export default withJsonFormsControlProps(BooleanControl)
