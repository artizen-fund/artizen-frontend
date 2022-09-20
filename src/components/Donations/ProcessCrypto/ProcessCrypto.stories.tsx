import ProcessCrypto from './'
import { MockedProvider } from '@apollo/client/testing'
import { WagmiConfig } from 'wagmi'
import { CREATE_SWAP, CREATE_TOP_UP_WALLET, GET_TOP_UP_WALLET_VIA_TRANSFER_ID } from '@gql'
import { CourierNotification } from '@lib'
import { getWagmiClient } from '../../../lib/wagmiClient'

const { client } = getWagmiClient()

export default {
  title: 'donations/ProcessCrypto',
  component: ProcessCrypto,
  argTypes: {},
}

export const ProcessCryptoComponent = (props: any) => {
  const amount = 1000
  const order = {
    id: 'abc123',
  }
  return (
    <WagmiConfig client={client}>
      <MockedProvider>
        <CourierNotification>
          <ProcessCrypto {...props} {...{ amount, order }} />
        </CourierNotification>
      </MockedProvider>
    </WagmiConfig>
  )
}

ProcessCryptoComponent.parameters = {
  apolloClient: {
    // do not put MockedProvider here, you can, but its preferred to do it in preview.js
    mocks: [
      {
        request: {
          query: CREATE_SWAP,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      {
        request: {
          query: CREATE_TOP_UP_WALLET,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      {
        request: {
          query: GET_TOP_UP_WALLET_VIA_TRANSFER_ID,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
    ],
  },
}
