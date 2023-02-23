import { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { Button, Spinner } from '@components'
import GrantLayout from './GrantLayout'
import { useSendRewards, usePublishGrant, ARTIZEN_TIMEZONE } from '@lib'
import { IGrantFragment } from '@types'

interface IViewGrantProps {
  grant?: IGrantFragment
}

const ViewGrant = ({ grant }: IViewGrantProps) => {
  const { sendRewards } = useSendRewards()
  const { publish } = usePublishGrant()
  // const { sendTopDonor } = useSendGrantNotification()
  const [processing, setProcessing] = useState<boolean>()

  if (!grant) {
    return <Spinner minHeight="75vh" />
  }

  const grantIsPublished = grant.status === 'published'
  const grantIsActive = moment().isBefore(moment.tz(grant.closingDate, ARTIZEN_TIMEZONE))
  const endGrantDisabled = grantIsPublished && grantIsActive

  return (
    <>
      <GrantLayout {...{ grant }} />
      <Buttons>
        {
          <Button
            stretch
            disabled={grantIsPublished || processing}
            onClick={async () => {
              setProcessing(true)
              await publish(grant)
              setProcessing(false)
            }}
            level={2}
          >
            {processing ? 'Processing' : 'Publish'}
          </Button>
        }
        <Button
          disabled={endGrantDisabled || processing}
          stretch
          onClick={async () => {
            setProcessing(true)
            sendRewards(Number(grant?.blockchainId), grant?.submission?.project?.walletAddress || '')
            // send notifications
            // sendTopDonor(Number(grant?.blockchainId), grant?.submission?.project?.walletAddress)
            setProcessing(true)
          }}
          level={2}
        >
          {processing ? 'Processing' : 'Send Rewards'}
        </Button>
      </Buttons>
    </>
  )
}

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em 0;
  gap: 15px;
`

export default ViewGrant
