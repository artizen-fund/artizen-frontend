import React, { useState } from 'react'
import { JsonForms } from '@jsonforms/react'
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

interface FormProps {
  schema: any
  uischema: any
  data: any
  setData: any
  children: React.ReactElement
  processing?: boolean
}

const Form = ({ schema, uischema, data, setData, processing, children }: FormProps) => {
  const [errors, setErrors] = useState<any>(undefined)
  const submitted = false

  const freezeAndSetData = debounce((newData: any, errors: any) => {
    setData(newData)
    setErrors(errors)
    if (typeof localStorage !== 'undefined' && !!newData) {
      localStorage.setItem(schema.name, JSON.stringify(newData))
    }
  }, 100)

  const renderers = [
    ...vanillaRenderers,
    { tester: stringControlTester, renderer: StringControl },
    { tester: booleanControlTester, renderer: BooleanControl },
    { tester: numberControlTester, renderer: NumberControl },
    { tester: enumControlTester, renderer: EnumControl },
    /* { tester: formLabelTester, renderer: FormLabel }, */
  ]

  // if (!data) return <></>
  // todo: does removing this break anything?

  return (
    <>
      <JsonForms
        {...{ schema, uischema, renderers, data }}
        config={{
          trim: true,
        }}
        onChange={({ data, errors }) => freezeAndSetData(data, errors)}
        readonly={processing || submitted}
      />
      {children}
    </>
  )
}

export default Form
