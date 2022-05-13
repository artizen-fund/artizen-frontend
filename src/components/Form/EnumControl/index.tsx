import { withJsonFormsControlProps } from '@jsonforms/react'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { rankWith, schemaMatches } from '@jsonforms/core'
import SegmentedControl from './SegmentedControl'
import SelectControl from './SelectControl'

export interface EnumControlProps {
  icon?: string
  invalid?: boolean
  label: string | Labels
  disabled?: boolean
  onChange?: (e: any) => void
  required?: boolean
  outline?: boolean

  schema: JsonSchema
  uischema: UISchemaElement
  data: any
  handleChange(path: string, value: any): void
  path: string
}

export const EnumControl = (props: EnumControlProps) =>
  props.uischema.options?.format === 'segmented' ? <SegmentedControl {...props} /> : <SelectControl {...props} />

export const enumControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'string' && !!schema.enum),
)

export default withJsonFormsControlProps(EnumControl)
