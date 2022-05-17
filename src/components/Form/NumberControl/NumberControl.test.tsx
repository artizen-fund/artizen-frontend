import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { NumberControl } from './'
import { schema, uischema } from '@forms/sample'

describe('NumberControl', () => {
  const INPUT_PATH = '#/properties/integerExample'

  it('renders NumberControl unchanged', () => {
    const handleChange = () => console.log('derp')
    const { container } = render(
      <NumberControl
        data={5}
        path={uischema.elements.find(e => e.scope === INPUT_PATH)?.scope!}
        {...{ handleChange, schema, uischema }}
        label="Integer test"
      />,
    )
    expect(container).toMatchSnapshot()
  })
})

/* 
Possible future tests…

- onchange triggers console log
- error state (min, max, required) is respected
*/
