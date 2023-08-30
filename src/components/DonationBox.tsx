import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { Button, Counter } from '@components'
import {
  LayoutContext,
  trackEventF,
  intercomEventEnum,
  assertFloat,
  assert,
  rgba,
  useSeasons,
  useMintArtifacts,
  useContracts,
} from '@lib'
import { breakpoint, typography, palette } from '@theme'
import { IProjectFragment } from '@types'

interface IDonationBox {
  tokenId: string
  project: IProjectFragment
}

const DonationBox = ({ tokenId, project }: IDonationBox) => {
  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )

  /*
    const { execute: donate } = useContracts({
    args: [tokenId, artifactQuantity],
    functionName: 'mintArtifact',
    eventName: 'SubmissionCreated',
    warming: isWarming,
  })
  */

  const { status } = useSession()

  const { setVisibleModalWithAttrs, toggleModal, setVisibleModal } = useContext(LayoutContext)
  const [sending, setSending] = useState<boolean>(false)
  const [artifactQuantity, setArtifactQuantity] = useState<number>(1)

  const { writeAsync, error } = useMintArtifacts({
    tokenId,
    artifactQuantity,
  })

  useEffect(() => {
    if (error) {
      setVisibleModalWithAttrs('errorModal', {
        error,
      })
    }
  }, [error])

  const donateFn = async () => {
    if (!tokenId || !artifactQuantity) return
    toggleModal('confirmTransaction')
    setSending(true)
    trackEventF(intercomEventEnum.DONATION_START, {
      amount: artifactQuantity,
      tokenId,
    })

    const hash = await writeAsync?.()

    toggleModal('processTransaction')

    //TODO: review if hash is return as plain string or as an object
    //https://wagmi.sh/react/hooks/useContractWrite#return-value
    // const result = await writeContract?.wait()

    if (hash) {
      trackEventF(intercomEventEnum.DONATION_FINISHED, {
        amount: artifactQuantity.toString(),
        tokenId,
      })

      setVisibleModalWithAttrs('shareTransaction', {
        mode: 'postTransaction',
        destination: `/projects/${project.titleURL}`,
        projecTitle: project.title,
      })
    }

    setSending(false)
  }

  return (
    <Wrapper>
      <ScrollPoint id="donation-box" />
      {status !== 'authenticated' && <SessionMask onClick={() => setVisibleModal('login')} />}
      <>
        <MobileBreak>
          <Cost>
            <div>Price</div>
            <Amount>
              <span>Ξ {BASE_ARTIFACT_PRICE}</span>
            </Amount>
          </Cost>
          <Counter value={artifactQuantity} onChange={setArtifactQuantity} min={1} max={99} />
        </MobileBreak>
        <StyledButton
          level={1}
          onClick={() => {
            if (error) {
              setVisibleModalWithAttrs('errorModal', {
                error,
              })
              return
            }

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
