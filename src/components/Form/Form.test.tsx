import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Form from './'
import { schema, uischema, initialState } from '@forms/sample'

describe('Form', () => {
  it('renders Form unchanged', () => {
    const { container } = render(<Form {...{ schema, uischema, initialState }} />)
    expect(container).toMatchSnapshot()
  })
})

/* 
Possible future tests…

- onchange triggers console log
- error state is respected

Note: @forms/sample is a beefy form.
			If this test lags, maybe consider feeding a simpler form.
*/
