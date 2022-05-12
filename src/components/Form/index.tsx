import React from 'react'
import { JsonForms } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import { BooleanSwitch, InputString, InputNumber, Select } from '@components'
import booleanSwitchControlTester from './booleanSwitchControlTester'
import stringControlTester from './stringControlTester'
import numberControlTester from './numberControlTester'
import selectControlTester from './selectControlTester'

interface FormProps {
  schema: any
  uischema: any
  data: any
}

const Form = ({ schema, uischema, data }: FormProps) => {
  const renderers = [
    ...vanillaRenderers,
    { tester: booleanSwitchControlTester, renderer: BooleanSwitch },
    { tester: stringControlTester, renderer: InputString },
    { tester: numberControlTester, renderer: InputNumber },
    { tester: selectControlTester, renderer: Select },
  ]
  return <JsonForms {...{ uischema, schema, data, renderers }} cells={vanillaCells} />
}

export default Form
