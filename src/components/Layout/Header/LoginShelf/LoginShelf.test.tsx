import renderer from 'react-test-renderer'
import { SessionProvider } from '@lib'
import LoginShelf from './'

describe('LoginShelf', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SessionProvider>
          <LoginShelf />
        </SessionProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
