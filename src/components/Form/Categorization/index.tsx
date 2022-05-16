// exploring: https://github.com/eclipsesource/jsonforms/tree/master/packages/vanilla/src/complex/categorization

import { JsonFormsDispatch } from '@jsonforms/react'
import { rankWith, uiTypeIs, and } from '@jsonforms/core'
import type { Categorization } from '@jsonforms/core'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'

export interface CategorizationProps {
  uischema: Categorization
  schema: JsonSchema
  path: string
}

const Categorization = ({ uischema, schema, path, ...props }: CategorizationProps) => {
  console.log('c', props, schema, uischema)
  return <div>c</div>
}

export const categorizationTester = rankWith(3, and(uiTypeIs('Categorization')))

export default Categorization
