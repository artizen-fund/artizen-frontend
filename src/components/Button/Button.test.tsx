import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Button from './'

describe('Button', () => {
  it('renders Button link unchanged', () => {
    const { container } = render(<Button href="/">button test</Button>)
    expect(container).toMatchSnapshot()
  })

  it('renders form Button unchanged', () => {
    const { container } = render(<Button onClick={() => console.log('derp')}>button test</Button>)
    expect(container).toMatchSnapshot()
  })

  it('form button functions', () => {
    let testBool = false
    render(<Button onClick={() => (testBool = !testBool)}>herp derp</Button>)

    const button = screen.getByText('herp derp')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(testBool).toEqual(true)
  })
})

/* 
Possible future tests…

- It would be nice to test Button Link clicking, but…
		- https://github.com/vercel/next.js/issues/16864
- test left and right icons
- test abundance of styling? (outline, small, etc.)
*/
