import renderer from 'react-test-renderer'
import { SessionProvider } from '@lib'
import SessionShelf from './'

describe('SessionShelf', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SessionProvider>
          <SessionShelf />
        </SessionProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
