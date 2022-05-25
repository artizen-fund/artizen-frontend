import React, { useMemo, useState } from 'react'
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
  initialState: any
}

const Form = ({ schema, uischema, initialState }: FormProps) => {
  const [data, setData] = useState<any>(undefined)
  const [errors, setErrors] = useState<any>(undefined)

  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      setData(initialState)
      return
    }
    const frozenAnswers = localStorage.getItem(schema.name)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [schema])

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

  if (!data) return <></>

  return (
    <JsonForms
      {...{ schema, uischema, renderers, data }}
      config={{
        trim: true,
      }}
      onChange={({ data, errors }) => freezeAndSetData(data, errors)}
    />
  )
}

export default Form
