// exploring: https://github.com/eclipsesource/jsonforms/tree/master/packages/vanilla/src/complex/categorization

import { JsonFormsDispatch } from '@jsonforms/react'
import { rankWith, uiTypeIs, and } from '@jsonforms/core'
import type { Categorization } from '@jsonforms/core'
import type { Labels, JsonSchema, UISchemaElement } from '@jsonforms/core'

export interface FormCategorizationProps {
  uischema: Categorization
  schema: JsonSchema
  path: string
}

const FormCategorization = ({ uischema, schema, path, ...props }: FormCategorizationProps) => {
  console.log('c', props, schema, uischema)
  return <div>c</div>
}

export const formCategorizationTester = rankWith(3, and(uiTypeIs('FormCategorization')))

export default FormCategorization
