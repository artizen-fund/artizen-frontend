import { useEffect, useState, cloneElement } from 'react'
import { JsonForms } from '@jsonforms/react'
import { JsonSchema, Layout, ControlElement, JsonFormsCore } from '@jsonforms/core'
import { vanillaRenderers } from '@jsonforms/vanilla-renderers'
import flattenChildren from 'react-keyed-flatten-children'
import { pickBy } from 'lodash'
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
  submitDisabledFromOutside?: boolean
  children?: React.ReactElement | Array<React.ReactElement>
}

const Form = <TStateInterface extends Record<string, unknown>>({
  localStorageKey,
  schema,
  uischema,
  data,
  setData,
  readonly,
  submitDisabledFromOutside,
  children,
  ...props
}: FormProps<TStateInterface>) => {
  const [disabled, setDisabled] = useState(true)

  const updateFormState = ({ data, errors }: Pick<JsonFormsCore, 'data' | 'errors'>) => {
    setData(data)
    if (localStorageKey && typeof localStorage !== 'undefined' && !!data) {
      const safeVars = (uischema.elements as Array<ControlElement>)
        .filter(schemaVar => !schemaVar.options?.unsafeToRetain)
        .map(schemaVar => schemaVar.scope.replace('#/properties/', ''))
      const safeData = pickBy(data, (_, key) => safeVars.includes(key))
      localStorage.setItem(localStorageKey, JSON.stringify(safeData))
    }
    setDisabled(!!errors && errors.length > 0)
  }

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
        {...props}
        config={{ trim: true }}
        onChange={formState => updateFormState(formState)}
      />
      {flattenChildren(children).map(child =>
        cloneElement(child as React.ReactElement, { disabled: disabled || submitDisabledFromOutside }),
      )}
    </>
  )
}

export default Form
