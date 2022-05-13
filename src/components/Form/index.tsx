import React from 'react'
import { JsonForms } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import StringControl, { stringControlTester } from './StringControl'
import NumberControl, { numberControlTester } from './NumberControl'
import BooleanControl, { booleanControlTester } from './BooleanControl'
import EnumControl, { enumControlTester } from './EnumControl'

interface FormProps {
  schema: any
  uischema: any
  data: any
}

const Form = ({ schema, uischema, data }: FormProps) => {
  const renderers = [
    ...vanillaRenderers,
    { tester: booleanControlTester, renderer: BooleanControl },
    { tester: stringControlTester, renderer: StringControl },
    { tester: numberControlTester, renderer: NumberControl },
    { tester: enumControlTester, renderer: EnumControl },
  ]
  return <JsonForms {...{ uischema, schema, data, renderers }} cells={vanillaCells} />
}

export default Form
