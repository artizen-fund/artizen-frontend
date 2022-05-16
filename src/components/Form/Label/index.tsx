import { rankWith, uiTypeIs, and } from '@jsonforms/core'
import type { LabelElement } from '@jsonforms/core'

export interface LabelProps {
  uischema: LabelElement
  text: string
}

const Label = ({ uischema, ...props }: LabelProps) => {
  return <div>{uischema.text}</div>
}

export const labelTester = rankWith(3, and(uiTypeIs('Label')))

export default Label
