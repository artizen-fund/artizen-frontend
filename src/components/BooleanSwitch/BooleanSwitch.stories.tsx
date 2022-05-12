import BooleanSwitch, { BooleanSwitchProps } from './'
import { JsonForms } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import booleanSwitchControlTester from '../BooleanSwitch//booleanSwitchControlTester'

export default {
  title: 'components/BooleanSwitch',
  component: BooleanSwitch,
  argTypes: {},
}

export const BooleanSwitchComponent = (props: BooleanSwitchProps) => {
  const renderers = [...vanillaRenderers, { tester: booleanSwitchControlTester, renderer: BooleanSwitch }]

  const uischema = {
    type: 'Control',
    scope: '#/properties/booleanSwitch',
  }

  const data = {}

  const schema = {
    title: 'Todo',
    type: 'object',
    required: ['title'],
    properties: {
      done: { type: 'boolean', title: 'Done?', default: false },
    },
  }
  return <JsonForms {...{ schema, data, renderers, uischema }} cells={vanillaCells} />
}
