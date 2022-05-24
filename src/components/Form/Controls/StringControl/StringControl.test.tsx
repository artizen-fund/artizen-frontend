import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { StringControl } from './'
import { schema, uischema } from '@forms/sample'

describe('StringControl', () => {
  it('renders StringControl unchanged', () => {
    const INPUT_PATH = '#/properties/stringExample'
    const handleChange = () => console.log('derp')
    const { container } = render(
      <StringControl
        data="derp"
        path={uischema.elements.find(e => e.scope === INPUT_PATH)?.scope!}
        {...{ handleChange, schema, uischema }}
        label="String test"
      />,
    )
    expect(container).toMatchSnapshot()
  })

  it('renders StringControl:Phone unchanged', () => {
    const INPUT_PATH = '#/properties/phoneExample'
    const handleChange = () => console.log('derp')
    const { container } = render(
      <StringControl
        data={undefined}
        path={uischema.elements.find(e => e.scope === INPUT_PATH)?.scope!}
        {...{ handleChange, schema, uischema }}
        label="String test"
      />,
    )
    expect(container).toMatchSnapshot()
  })
})

/* 
Possible future tests…

- onchange triggers console log
- error state (minLength, maxLength, pattern, required) is respected
*/
