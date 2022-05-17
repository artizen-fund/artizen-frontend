import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Badge from './'

describe('Button', () => {
  it('renders Badge unchanged', () => {
    const { container } = render(<Badge>5</Badge>)
    expect(container).toMatchSnapshot()
  })
})

/* 
Possible future tests…

- check that large numbers render as "!"
	- unsure how to look at css :after{content} text!
*/
