import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SwitchControl from './SwitchControl'
import { schema, uischema } from '@forms/sample'

describe('SwitchControl', () => {
  const INPUT_PATH = '#/properties/switchBooleanExample'

  it('renders SelectControl unchanged', () => {
    const handleChange = () => console.log('derp')
    const { container } = render(
      <SwitchControl
        data="vanilla"
        path={uischema.elements.find(e => e.scope === INPUT_PATH)?.scope!}
        {...{ handleChange, schema, uischema }}
        label="Switch control test"
      />,
    )
    expect(container).toMatchSnapshot()
  })
})

/* 
Possible future tests…

- onchange triggers console log
*/
