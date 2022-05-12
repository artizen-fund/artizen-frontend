import { rankWith, schemaMatches } from '@jsonforms/core'

export default rankWith(
  3, //increase rank as needed
  schemaMatches(schema => schema.type === 'string' && !!schema.enum),
)
