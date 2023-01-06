import { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { Button, PagePadding, Spinner } from '@components'
import GrantLayout from './GrantLayout'
import { useGrant, ARTIZEN_TIMEZONE } from '@lib'
import { IGrantsWithProjectFragment } from '@types'

interface IViewGrantProps {
  grant?: IGrantsWithProjectFragment
}

const ViewGrant = ({ grant }: IViewGrantProps) => {
  const { publish, endGrant } = useGrant()
  const [processing, setProcessing] = useState<boolean>()

  if (!grant) {
    return <Spinner minHeight="75vh" />
  }

  const grantIsPublished = grant.status === 'published'
  const grantIsActive = moment().isBefore(moment.tz(grant.closingDate, ARTIZEN_TIMEZONE))
  const endGrantDisabled = grantIsPublished && grantIsActive

  return (
    <Wrapper>
      <StyledPagePadding>
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
              endGrant(Number(grant?.blockchainId), grant?.submission?.project?.walletAddress || '')
              setProcessing(true)
            }}
            level={2}
          >
            {processing ? 'Processing' : 'End'}
          </Button>
        </Buttons>
      </StyledPagePadding>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 600px;
  min-height: 75vh;
  margin: auto;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1em 0;
  gap: 15px;
`

export default ViewGrant
