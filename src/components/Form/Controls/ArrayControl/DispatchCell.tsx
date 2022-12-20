import maxBy from 'lodash/maxBy'
import React from 'react'
import { DispatchCellProps } from '@jsonforms/core'
import { UnknownRenderer, withJsonFormsDispatchCellProps } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import {
  StringControl,
  stringControlTester,
  NumberControl,
  numberControlTester,
  BooleanControl,
  booleanControlTester,
  EnumControl,
  enumControlTester,
} from '../'

const Dispatch = ({ uischema, schema, path, id, enabled, ...props }: DispatchCellProps) => {
  const cells = [...vanillaCells]
  // @ts-ignore
  const cell = maxBy(cells, r => r.tester(uischema, schema))

  const renderers = [
    ...vanillaRenderers,
    { tester: stringControlTester, renderer: StringControl },
    { tester: booleanControlTester, renderer: BooleanControl },
    { tester: numberControlTester, renderer: NumberControl },
    { tester: enumControlTester, renderer: EnumControl },
  ]
  // @ts-ignore
  if (cell === undefined || cell.tester(uischema, schema) === -1) {
    return <UnknownRenderer type={'cell'} />
  } else {
    const Cell = cell.cell
    return (
      <>
        <Cell
          uischema={uischema}
          schema={schema}
          enabled={enabled}
          path={path}
          id={id}
          renderers={renderers}
          cells={cells}
        />
      </>
    )
  }
}

export default withJsonFormsDispatchCellProps(Dispatch)
