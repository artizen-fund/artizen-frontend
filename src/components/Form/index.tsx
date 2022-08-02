import { JsonForms } from '@jsonforms/react'
import { JsonSchema, Layout, ControlElement } from '@jsonforms/core'
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
  readonly?: boolean
  children?: React.ReactNode
}

const Form = <TStateInterface extends Record<string, unknown>>({
  localStorageKey,
  schema,
  uischema,
  data,
  setData,
  readonly,
  children,
}: FormProps<TStateInterface>) => {
  const freezeAndSetData = debounce(newData => {
    setData(newData)
    if (localStorageKey && typeof localStorage !== 'undefined' && !!newData) {
      const safeVars = (uischema.elements as Array<ControlElement>)
        .filter(schemaVar => !schemaVar.options?.unsafeToRetain)
        .map(schemaVar => schemaVar.scope.replace('#/properties/', ''))
      const safeData = Object.keys(newData)
        .filter(key => safeVars.includes(key))
        .reduce(
          (obj, key) =>
            Object.assign(obj, {
              [key]: newData[key],
            }),
          {},
        )
      localStorage.setItem(localStorageKey, JSON.stringify(safeData))
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
