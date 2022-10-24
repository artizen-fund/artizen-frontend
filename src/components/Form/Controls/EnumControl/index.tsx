import { withJsonFormsControlProps } from '@jsonforms/react'
import { JsonSchema, ControlElement, rankWith, schemaMatches } from '@jsonforms/core'
import SegmentedControl from './SegmentedControl'
import SelectControl from './SelectControl'
import TileControl from './TileControl'

export interface EnumControlProps {
  disabled?: boolean
  invalid?: boolean
  label: string | Array<string>
  enabled?: boolean
  processing?: boolean
  onChange?: (e: any) => void
  required?: boolean
  schema?: JsonSchema
  uischema?: ControlElement
  data: any
  handleChange(path: string, value: any): void
  path: string
  errors?: string
}

export const EnumControl = (props: EnumControlProps) => {
  switch (props.uischema?.options?.format) {
    case 'segmented':
      return <SegmentedControl {...props} />
    case 'tile':
      return <TileControl {...props} />
    default:
      return <SelectControl {...props} />
  }
}

export const enumControlTester = rankWith(
  3,
  schemaMatches(schema => schema.type === 'string' && (!!schema.enum || !!schema.oneOf)),
)

export default withJsonFormsControlProps(EnumControl)
