/* This is a placeholder component that holds the new-wallet logic which was formerly in pages/index.js
 * This logic will be moved to the AccountButton component(?), but that component isn't ready for placement yet.
 */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { CREATE_TOP_UP_WALLET } from '@gql'
import { useSession, isServer } from '@lib'

export const CreateTopUpWallet = () => {
  const router = useRouter()
  const user = useSession()

  const [createTopUpWallet] = useMutation(CREATE_TOP_UP_WALLET, { onError: error => console.log('updatePost resultado', error) })

  useEffect(() => {
    const checkOnRampReturn = async () => {
      const { transferId } = router.query
      if (transferId) {
        try {
          const response = await fetch(`/api/onramp/status?transferId=${transferId}`, { method: 'GET' })
          const status = await response.json()
          createTopUpWallet({
            variables: {
              data: {
                userId: user?.id,
                amount: status.destAmount,
                originFund: 'FIAT',
                state: 'INITIATED',
                timestamp: status.successTimeline[0].createdAt,
              },
            },
          })
          router.push('/')
        } catch (err) {
          console.error(err)
        }
      }
    }
    checkOnRampReturn()
  }, [createTopUpWallet, router, router.query, user])

  return <></>
}
