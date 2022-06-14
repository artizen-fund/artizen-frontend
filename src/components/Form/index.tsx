import { JsonForms } from '@jsonforms/react'
import { JsonSchema, Layout } from '@jsonforms/core'
import { vanillaRenderers } from '@jsonforms/vanilla-renderers'
import { debounce } from 'lodash'
import {
  StringControl,
  stringControlTester,
  NumberControl,
  numberControlTester,
  BooleanControl,
  booleanControlTester,
  EnumControl,
  enumControlTester,
} from './Controls'

interface FormProps<TStateInterface> {
  localStorageKey?: string
  schema: JsonSchema
  uischema: Layout
  data: TStateInterface
  setData: (input: TStateInterface) => void
  readonly: boolean
  children: React.ReactNode
}

const Form = <TStateInterface,>({
  localStorageKey,
  schema,
  uischema,
  data,
  setData,
  readonly,
  children,
}: FormProps<TStateInterface>) => {
  const freezeAndSetData = debounce((newData: TStateInterface) => {
    setData(newData)
    if (localStorageKey && typeof localStorage !== 'undefined' && !!newData) {
      localStorage.setItem(localStorageKey, JSON.stringify(newData))
    }
  }, 100)

  const renderers = [
    ...vanillaRenderers,
    { tester: stringControlTester, renderer: StringControl },
    { tester: booleanControlTester, renderer: BooleanControl },
    { tester: numberControlTester, renderer: NumberControl },
    { tester: enumControlTester, renderer: EnumControl },
  ]

  return (
    <>
      <JsonForms
        {...{ schema, uischema, renderers, data, readonly }}
        config={{ trim: true }}
        onChange={({ data }) => freezeAndSetData(data)}
      />
      {children}
    </>
  )
}

export default Form
