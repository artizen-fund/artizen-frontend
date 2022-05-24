import { rankWith, uiTypeIs, and } from '@jsonforms/core'
import type { LabelElement } from '@jsonforms/core'

export interface FormLabelProps {
  uischema: LabelElement
  text: string
}

const FormLabel = ({ uischema, ...props }: FormLabelProps) => {
  return <div>{uischema.text}</div>
}

export const formLabelTester = rankWith(3, and(uiTypeIs('Label')))

export default FormLabel
