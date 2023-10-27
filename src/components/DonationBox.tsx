import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Counter } from '@components'
import {
  LayoutContext,
  trackEventF,
  intercomEventEnum,
  assertFloat,
  rgba,
  useContracts,
  getTwitterHandler,
  useFullSignOut,
  USER_CLOSE_WALLET,
} from '@lib'
import { breakpoint, typography, palette } from '@theme'
import { IProjectFragment } from '@types'

interface IDonationBox {
  tokenId?: string
  project: IProjectFragment
}

const DonationBox = ({ tokenId, project }: IDonationBox) => {
  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )

  const { setVisibleModalWithAttrs, toggleModal, setVisibleModal } = useContext(LayoutContext)
  const [sending, setSending] = useState<boolean>(false)
  const [artifactQuantity, setArtifactQuantity] = useState(1)
  const [warming, setWarming] = useState<boolean>(true)
  const { disconnectAndSignout } = useFullSignOut()

  const {
    execute: donate,
    status: contractStatus,
    processing,
  } = useContracts({
    args: [[Number(tokenId || 1)], [Number(artifactQuantity || 1)]],
    functionName: 'mintArtifact',
    eventName: 'ArtifactMinted',
    value: BigInt(BASE_ARTIFACT_PRICE * artifactQuantity * 1e18),
    warming,
  })

  useEffect(() => {
    if (processing) {
      toggleModal('processTransaction')
    }
  }, [processing])

  const donateFn = async () => {
    if (!tokenId || !artifactQuantity) return

    setWarming(false)

    setSending(true)

    trackEventF(intercomEventEnum.DONATION_START, {
      amount: artifactQuantity,
      tokenId,
    })

    let returnData: any

    try {
      returnData = await donate?.()

      console.log('returnData:::', returnData)

      if (returnData.error || returnData.outcome[0].eventName !== 'ArtifactMinted') {
        setVisibleModalWithAttrs('errorModal', {
          error: returnData.error,
        })

        setSending(false)
        return
      }

      trackEventF(intercomEventEnum.DONATION_FINISHED, {
        amount: artifactQuantity.toString(),
        tokenId,
      })

      setVisibleModalWithAttrs('share', {
        mode: 'postTransaction',
        destination: `/project/${project.titleURL}`,
        projectTitle: project.title,
        twitterHandle: getTwitterHandler(project?.members[0]?.user?.twitterHandle || ''),
        artizenHandle: project?.members[0]?.user?.artizenHandle,
      })

      setSending(false)
    } catch (e: any) {
      console.log('error in here  ', e)
      const error = e?.message || e?.error?.message || e?.error || e
      if (error.includes(USER_CLOSE_WALLET)) {
        setWarming(true)
        setSending(false)
        toggleModal()
        return
      }
      setVisibleModalWithAttrs('errorModal', {
        error: 'Something went wrong, try again',
      })
      setSending(false)
    }
  }

  return (
    <Wrapper>
      <ScrollPoint id="donation-box" />
      <>
        <MobileBreak>
          <Cost>
            <div>Price</div>
            <Amount>
              <span>Ξ {BASE_ARTIFACT_PRICE}</span>
            </Amount>
          </Cost>
          <Counter
            value={artifactQuantity}
            onChange={newNumber => {
              !isNaN(newNumber) && setArtifactQuantity(newNumber)
            }}
            min={1}
            max={99}
          />
        </MobileBreak>
        <StyledButton
          level={1}
          onClick={() => {
            // if (error) {
            //   setVisibleModalWithAttrs('errorModal', {
            //     error,
            //   })
            //   return
            // }

            donateFn()
          }}
        >
          {sending ? 'Buying' : 'Buy'}
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
