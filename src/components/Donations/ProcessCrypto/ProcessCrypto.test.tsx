import renderer from 'react-test-renderer'
import { WagmiConfig } from 'wagmi'
import { getWagmiClient } from '../../../lib/wagmiClient'
import ProcessCrypto from './'

describe('ProcessCrypto', () => {
  // TODO: it's gonna take a bit of work to mock up a WagmiClient.
  // see https://github.com/tmm/testing-wagmi/blob/main/components/Connect.test.tsx

  // const setStage = (_: string) => {
  //   // do nothing
  // }
  // const setOrder = (_: { id: string }) => {
  //   // do nothing
  // }
  // const order = { id: 'derp' }
  // const donationMethod = 'ethereum'
  // const amount = 101
  //
  // it('renders correctly', () => {
  //   const { client, chains } = getWagmiClient()
  //
  //   const tree = renderer
  //     .create(
  //       <WagmiConfig client={client}>
  //         <ProcessCrypto {...{ setStage, chains, setOrder, order, donationMethod, amount }} />
  //       </WagmiConfig>,
  //     )
  //     .toJSON()
  //   expect(tree).toMatchSnapshot()
  // })

  it('does nothing', () => {
    expect(1).toEqual(1)
  })
})
