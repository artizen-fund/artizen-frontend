import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { JsonForms } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import { debounce } from 'lodash'
import StringControl, { stringControlTester } from '../StringControl'
import NumberControl, { numberControlTester } from '../NumberControl'
import BooleanControl, { booleanControlTester } from '../BooleanControl'
import EnumControl, { enumControlTester } from '../EnumControl'
import FormLabel, { formLabelTester } from '../FormLabel'
// import FormCategorization, { formCategorizationTester } from '../FormCategorization'
import { Button } from '@components'

interface FormProps {
  schema: any
  uischema: any
  initialState: any
}

const Form = ({ schema, uischema, initialState }: FormProps) => {
  const [data, setData] = useState<any>(undefined)
  const [errors, setErrors] = useState<any>(undefined)

  useEffect(() => {
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
    if (typeof localStorage !== 'undefined') {
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

  return (
    <JsonForms
      {...{ schema, renderers, data }}
      config={{
        trim: true,
      }}
      onChange={({ data, errors }) => freezeAndSetData(data, errors)}
    />
  )
}

export default Form
