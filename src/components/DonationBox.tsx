import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { ErrorObject } from 'ajv'

import { Button, Counter } from '@components'
import { LayoutContext, trackEventF, intercomEventEnum, BASE_ARTIFACT_PRICE, rgba, useSeasons } from '@lib'
import { breakpoint, typography, palette } from '@theme'

interface IDonationBox {
  tokenId: string | undefined
}

const DonationBox = ({ tokenId }: IDonationBox) => {
  const { status } = useSession()

  const { toggleModal } = useContext(LayoutContext)

  const { mintOpenEditions } = useSeasons()
  const [sending, setSending] = useState<boolean>(false)
  const { setVisibleModal } = useContext(LayoutContext)
  const [artifactQuantity, setArtifactQuantity] = useState<number>(1)

  useEffect(() => console.log(artifactQuantity), [artifactQuantity])

  const donateFn = async () => {
    if (!tokenId || !artifactQuantity) return
    toggleModal('confirmTransaction')
    setSending(true)
    trackEventF(intercomEventEnum.DONATION_START, {
      amount: artifactQuantity,
      tokenId,
    })

    const { error, txHash } = await mintOpenEditions(tokenId, artifactQuantity, BASE_ARTIFACT_PRICE)

    //All good, there is a txHash
    if (txHash) {
      // NOTE: This will trigger a blockchain
      // event which is captured by event listener script (EK's owned)
      // event listener script writes a openEditions record in Hasura
      // which is then picked up by the subscription and the UI is updated
      // and sends Courier email and in-app notification to the donor

      trackEventF(intercomEventEnum.DONATION_FINISHED, {
        amount: artifactQuantity.toString(),
        tokenId,
      })

      toggleModal('shareTransaction')
    }

    //Show error
    if (error) {
      const errors: Array<ErrorObject> = []
      errors.push({
        instancePath: '/donationAmount',
        message: error,
        schemaPath: '#/properties/donationAmount',
        keyword: '',
        params: {},
      })
    }

    //Close modal if there is no error neither txHash, like when users have rejected transactions,
    toggleModal()
    setSending(false)
  }

  return (
    <Wrapper>
      <ScrollPoint id="donation-box" />
      {status !== 'authenticated' && <SessionMask onClick={() => setVisibleModal('login')} />}
      <>
        <MobileBreak>
          <Cost>
            <div>Cost</div>
            <Amount>
              <span>Ξ {BASE_ARTIFACT_PRICE}</span>
            </Amount>
          </Cost>
          <Counter value={artifactQuantity} onChange={setArtifactQuantity} min={1} max={99} />
        </MobileBreak>
        <StyledButton level={1} onClick={() => donateFn()} disabled={artifactQuantity <= 0 || sending}>
          {sending ? 'Processing Donation' : 'Buy'}
        </StyledButton>
      </>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    align-items: center;
    flex-direction: row;
  }
`

const MobileBreak = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: contents;
  }
`

const ScrollPoint = styled.div`
  position: absolute;
  left: 0;
  top: -100px;
  width: 1px;
  height: 1px;
`

const SessionMask = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const StyledButton = styled(props => <Button {...props} />)`
  flex: 1;
`

const Cost = styled.div`
  flex: 1;
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
`
const Amount = styled.div`
  white-space: nowrap;
  ${typography.label.l0}
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`

export default DonationBox
