import React from 'react'
import { JsonForms } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import { StringControl, stringControlTester } from './StringControl'
import { NumberControl, numberControlTester } from './NumberControl'
import { BooleanSwitch, booleanSwitchControlTester } from './BooleanSwitch'
import { SelectControl, selectControlTester } from './SelectControl'

interface FormProps {
  schema: any
  uischema: any
  data: any
}

const Form = ({ schema, uischema, data }: FormProps) => {
  const renderers = [
    ...vanillaRenderers,
    { tester: booleanSwitchControlTester, renderer: BooleanSwitch },
    { tester: stringControlTester, renderer: StringControl },
    { tester: numberControlTester, renderer: NumberControl },
    { tester: selectControlTester, renderer: SelectControl },
  ]
  return <JsonForms {...{ uischema, schema, data, renderers }} cells={vanillaCells} />
}

export default Form
