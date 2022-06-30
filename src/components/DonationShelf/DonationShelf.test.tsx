import renderer from 'react-test-renderer'
import { SessionProvider } from '@lib'
import DonationShelf from './'

describe('DonationShelf', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SessionProvider>
          <DonationShelf />
        </SessionProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
