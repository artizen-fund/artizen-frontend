import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { JsonForms } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import { debounce } from 'lodash'
import StringControl, { stringControlTester } from './StringControl'
import NumberControl, { numberControlTester } from './NumberControl'
import BooleanControl, { booleanControlTester } from './BooleanControl'
import EnumControl, { enumControlTester } from './EnumControl'

interface FormProps {
  schema: any
  uischema: any
  initialState: any
}

const Form = ({ schema, uischema, initialState }: FormProps) => {
  const [data, setData] = useState<any>(undefined)

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

  const freezeAndSetData = debounce((newData: any) => {
    setData(newData)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(schema.name, JSON.stringify(newData))
    }
  }, 100)

  const renderers = [
    ...vanillaRenderers,
    { tester: booleanControlTester, renderer: BooleanControl },
    { tester: stringControlTester, renderer: StringControl },
    { tester: numberControlTester, renderer: NumberControl },
    { tester: enumControlTester, renderer: EnumControl },
    /* { tester: sectionLabelTester, renderer: SectionLabel }, */
  ]

  return (
    <Wrapper>
      {data && (
        <JsonForms
          {...{ uischema, schema, renderers, data }}
          cells={vanillaCells}
          onChange={({ data }) => freezeAndSetData(data)}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .vertical-layout {
    display: flex;
    flex-direction: column;
  }
  .vertical-layout-item {
  }
  .horizontal-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0 50px;
  }
  .horizontal-layout-item {
    flex: 1;
  }
`

export default Form
