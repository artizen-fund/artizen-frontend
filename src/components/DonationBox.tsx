import { useState, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { SeasonsAbi } from '@contracts'
import { goerli } from 'wagmi/chains'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { usePrepareContractWrite, useContractWrite, useBalance } from 'wagmi'
import { ErrorObject } from 'ajv'
import { Button, Counter } from '@components'
import { LayoutContext, trackEventF, intercomEventEnum, assertFloat, assert, rgba, useSeasons } from '@lib'
import { breakpoint, typography, palette } from '@theme'
import { IProjectFragment } from '@types'

interface IDonationBox {
  tokenId: string | undefined
  project: IProjectFragment
}

const DonationBox = ({ tokenId, project }: IDonationBox) => {
  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )

  const SEASON_CONTRACT = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  const { status } = useSession()

  const { setVisibleModalWithAttrs, toggleModal } = useContext(LayoutContext)

  const { mintOpenEditions } = useSeasons()
  const [sending, setSending] = useState<boolean>(false)
  const { setVisibleModal } = useContext(LayoutContext)
  const [artifactQuantity, setArtifactQuantity] = useState<number>(1)

  const { config } = usePrepareContractWrite({
    address: SEASON_CONTRACT as `0x${string}`,
    abi: SeasonsAbi,
    functionName: 'mintArtifact',
    args: [[tokenId], [artifactQuantity]],
    chainId: goerli.id,
    overrides: {
      value: ethers.utils.parseEther((BASE_ARTIFACT_PRICE * artifactQuantity).toString()),
    },
    onError: e => {
      console.log('error prepering contract', e)
    },
  })

  const { write, isLoading, isSuccess, isError } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled', { data, error })

      if (error) {
        console.log('error useContractWrite', error)
      }

      if (data) {
        data.wait().then((receipt: any) => {
          console.log('receipt', receipt)
          alert(`receipt: ${receipt.blockHash}`)
        })
      }
    },
  })

  const donateFn = async () => {
    if (!tokenId || !artifactQuantity) return
    toggleModal('confirmTransaction')
    setSending(true)
    trackEventF(intercomEventEnum.DONATION_START, {
      amount: artifactQuantity,
      tokenId,
    })

    write?.()

    // const { error, txHash } = await mintOpenEditions(tokenId, artifactQuantity, BASE_ARTIFACT_PRICE)

    // //All good, there is a txHash
    // if (txHash) {
    //   // NOTE: This will trigger a blockchain
    //   // event which is captured by event listener script (EK's owned)
    //   // event listener script writes a openEditions record in Hasura
    //   // which is then picked up by the subscription and the UI is updated
    //   // and sends Courier email and in-app notification to the donor

    //   trackEventF(intercomEventEnum.DONATION_FINISHED, {
    //     amount: artifactQuantity.toString(),
    //     tokenId,
    //   })

    //   setVisibleModalWithAttrs('shareTransaction', {
    //     mode: 'postTransaction',
    //     destination: `/projects/${project.titleURL}`,
    //     projecTitle: project.title,
    //   })
    // }

    // //Show error
    // if (error === 'Insufficient funds') {
    //   //insufficientFunds
    //   toggleModal('insufficientFunds')
    //   setSending(false)
    //   return
    // }

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
            <div>Price</div>
            <Amount>
              <span>Ξ {BASE_ARTIFACT_PRICE}</span>
            </Amount>
          </Cost>
          <Counter value={artifactQuantity} onChange={setArtifactQuantity} min={1} max={99} />
        </MobileBreak>
        <StyledButton level={1} onClick={() => donateFn()} disabled={artifactQuantity <= 0 || sending || !write}>
          {isLoading ? 'Buying' : 'Buy'}
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
