import { useState, cloneElement, useEffect } from 'react'
import { JsonForms } from '@jsonforms/react'
import { ErrorObject } from 'ajv'
import { JsonSchema, Layout, ControlElement } from '@jsonforms/core'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
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
  additionalErrors?: Array<ErrorObject>
  children?: React.ReactElement | Array<React.ReactElement>
}

type JsonFormsError = ErrorObject<string, Record<string, any>>

const Form = <TStateInterface extends Record<string, unknown>>({
  localStorageKey,
  schema,
  uischema,
  data,
  setData,
  readonly,
  submitDisabledFromOutside,
  additionalErrors,
  children,
  ...props
}: FormProps<TStateInterface>) => {
  console.log('data in here  ', data)
  const [disabled, setDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState<Array<JsonFormsError>>()

  const setForm = (data: TStateInterface, errors?: Array<ErrorObject<string, Record<string, any>>>) => {
    setData(data)
    setFormErrors(errors)
  }

  useEffect(() => {
    if (!data) return

    if (localStorageKey && typeof localStorage !== 'undefined' && !!data) {
      const safeVars = (uischema.elements as Array<ControlElement>)
        .filter(schemaVar => !schemaVar.options?.unsafeToRetain)
        .map(schemaVar => schemaVar.scope.replace('#/properties/', ''))
      const safeData = pickBy(data, (_, key) => safeVars.includes(key))
      localStorage.setItem(localStorageKey, JSON.stringify(safeData))
    }

    setDisabled(
      formErrors === undefined ||
        [formErrors].flatMap(e => e).length > 0 ||
        (!!additionalErrors && [additionalErrors].flatMap(e => e).length > 0),
    )
  }, [data, formErrors, additionalErrors])

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
        {...{ schema, uischema, renderers, data, readonly, additionalErrors }}
        {...props}
        cells={vanillaCells}
        config={{ trim: true }}
        onChange={({ data, errors }) => setForm(data, errors)}
      />
      {flattenChildren(children).map(child =>
        cloneElement(child as React.ReactElement, { disabled: disabled || submitDisabledFromOutside }),
      )}
    </>
  )
}

export default Form
