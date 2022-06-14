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

interface FormProps<FormState> {
  localStorageKey?: string
  schema: JsonSchema
  uischema: Layout
  data: FormState
  setData: (input: FormState) => void
  readonly: boolean
  children: React.ReactNode
}

const Form = <FormState,>({
  localStorageKey,
  schema,
  uischema,
  data,
  setData,
  readonly,
  children,
}: FormProps<FormState>) => {
  const freezeAndSetData = debounce((newData: FormState) => {
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
