import styled from 'styled-components'
import { withJsonFormsControlProps, withJsonFormsArrayControlProps } from '@jsonforms/react'
import {
  or,
  isObjectArrayControl,
  isPrimitiveArrayControl,
  Test,
  JsonSchema,
  ControlElement,
  rankWith,
  schemaMatches,
  ArrayControlProps,
  createDefaultValue,
  Resolve,
  encode,
  Paths,
  getControlPath,
} from '@jsonforms/core'
import { withVanillaControlProps, VanillaRendererProps } from '@jsonforms/vanilla-renderers'
import { Table, TableCell, Button } from '@components'
import { StringControl, EnumControl, BooleanControl, NumberControl } from '../'
import { filter, join } from 'lodash'
import fpfilter from 'lodash/fp/filter'
import fpmap from 'lodash/fp/map'
import fpflow from 'lodash/fp/flow'
import fpkeys from 'lodash/fp/keys'
import fpstartCase from 'lodash/fp/startCase'
import DispatchCell from './DispatchCell'

export const ArrayControl = ({
  uischema,
  schema,
  rootSchema,
  path,
  data,
  visible,
  errors,
  label,
  childErrors,
  removeItems,
  addItem,
  ...props
}: ArrayControlProps & VanillaRendererProps) => {
  const confirmDelete = (path: string, index: number) => {
    const p = path.substring(0, path.lastIndexOf('.'))
    removeItems?.(p, [index])()
  }

  const controlElement = uischema as ControlElement
  const createControlElement = (key?: string): ControlElement => ({
    type: 'Control',
    label: false,
    scope: schema.type === 'object' ? `#/properties/${key}` : '#',
  })
  const isValid = errors.length === 0

  // get title: controlElement, schema

  const sideItem = (
    <Button onClick={() => addItem(path, createDefaultValue(schema))} outline level={2}>
      Add Item
    </Button>
  )

  return (
    <Wrapper>
      <Table title="derp" {...{ sideItem }}>
        {data.map((_child: any, index: number) => {
          const childPath = Paths.compose(path, `${index}`)
          const errorsPerEntry: any[] = filter(childErrors, error => {
            const errorPath = getControlPath(error)
            return errorPath.startsWith(childPath)
          })

          const validationClassName = 'array.validation'
          const errorValidationClassName = 'array.validation.error'
          const errorClassNames = errorsPerEntry
            ? [validationClassName].concat(errorValidationClassName).join(' ')
            : validationClassName

          return (
            <TableCell key={`table-cell-${index}`}>
              {schema.properties ? (
                fpflow(
                  fpkeys,
                  fpfilter(prop => schema.properties?.[prop].type !== 'array'),
                  fpmap(prop => {
                    const childPropPath = Paths.compose(childPath, prop.toString())
                    // this is an input
                    return (
                      <One key={childPropPath}>
                        <DispatchCell
                          schema={Resolve.schema(schema, `#/properties/${encode(prop)}`, rootSchema)}
                          uischema={createControlElement(encode(prop))}
                          path={`${childPath}.${prop}`}
                        />
                      </One>
                    )
                  }),
                )(schema.properties)
              ) : (
                <Two key={Paths.compose(childPath, index.toString())}>
                  {/* dunno what this is… no schema? */}
                  <DispatchCell schema={schema} uischema={createControlElement()} path={childPath} />
                </Two>
              )}
              <Three>
                {/* errors… why here… */}
                {errorsPerEntry ? (
                  <span className={errorClassNames}>
                    {join(
                      errorsPerEntry.map(e => e.message),
                      ' and ',
                    )}
                  </span>
                ) : (
                  <span className={errorClassNames}>OK</span>
                )}
              </Three>
              <Four>
                {/* delete button */}
                <button
                  aria-label={`Delete`}
                  onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this item?')) {
                      confirmDelete(childPath, index)
                    }
                  }}
                >
                  Delete
                </button>
              </Four>
            </TableCell>
          )
        })}
      </Table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-column: 1 / span 12;
`

const One = styled.div`
  outline: 2px dashed red;
`

const Two = styled.div`
  outline: 2px dashed blue;
`

const Three = styled.div`
  outline: 2px dashed purple;
`

const Four = styled.div`
  outline: 2px dashed yellow;
`

export const arrayControlTester = rankWith(4, or(isObjectArrayControl, isPrimitiveArrayControl))

export default withVanillaControlProps(withJsonFormsArrayControlProps(ArrayControl))
