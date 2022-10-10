import styled from 'styled-components'
import { IconStack, Icon, Button, Distraction, DonationComplete } from '@components'
import { rgba, useProcessDonation } from '@lib'
import { breakpoint, typography, palette } from '@theme'
import { useEffect } from 'react'

const ProcessCrypto = () => {
  const { cryptoStage, setCryptoStage, donationMethod, error, restart, retry, swapId } = useProcessDonation()

  useEffect(() => {
    setCryptoStage?.(donationMethod !== 'ethereum' ? 'building' : swapId ? 'bridging' : 'swapping')
  }, [])

  return (
    <Wrapper>
      <Information>
        {!error ? (
          <div>
            <Title>It’s time to create your donation which requires a little extra magic</Title>
            <Subhead>
              Web3 takes longer to process transactions than traditional methods. You can keep this window open –
              we&apos;ll send you an email when it is completed.
            </Subhead>
          </div>
        ) : (
          <div>
            <Title>Uh oh, looks like something went wrong</Title>
            <Subhead>
              Don&apos;t worry you haven&apos;t been charged! Unfortunately Web3 is still in it&apos;s infancy and
              unusual issues can pop up from time-to-time.
            </Subhead>
          </div>
        )}

        <IconStack>
          {donationMethod === 'ethereum' && (
            <>
              <li>
                <Icon
                  outline={cryptoStage !== 'swapping'}
                  animating={cryptoStage === 'swapping'}
                  glyph="swap"
                  label="12% — Exchanging to USDC (est. 2m)"
                  error={error ? true : false}
                />
              </li>
              <li>
                <Icon
                  outline={cryptoStage !== 'bridging'}
                  animating={cryptoStage === 'bridging'}
                  glyph="intersect"
                  label="Bridging blockchains (est. 2m)"
                  error={error ? true : false}
                />
              </li>
            </>
          )}

          {donationMethod !== 'ethereum' && (
            <li>
              <Icon
                outline={cryptoStage !== 'building'}
                animating={cryptoStage === 'building'}
                glyph="refresh"
                label="Building your donation (est. 10m)"
                error={error ? true : false}
              />
            </li>
          )}
          <li>
            <Icon
              outline={cryptoStage !== 'confirming'}
              animating={cryptoStage === 'confirming'}
              glyph="tick"
              label="Confirming your donation (est. 2m)"
              error={error ? true : false}
            />
          </li>
          <li>
            <Icon
              outline={cryptoStage !== 'complete'}
              animating={cryptoStage === 'complete'}
              glyph="party"
              label="Donation Complete"
              error={error ? true : false}
            />
          </li>
        </IconStack>
      </Information>

      <Right>
        {cryptoStage !== 'complete' && (
          <>
            {error ? (
              <div>
                <Label>There was an error while processing your donation: {error}</Label>
                <Button onClick={restart}>Restart</Button>
                <Button onClick={retry}>Retry</Button>
              </div>
            ) : (
              <Distraction />
            )}
          </>
        )}
        {cryptoStage === 'complete' && <DonationComplete />}
      </Right>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy'
    'rightSide';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'copy rightSide';
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }
  justify-content: center;
  align-items: center;
`
const Information = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: copy;
  gap: 30px;
`

const Title = styled.h1`
  ${typography.title.l2}
`

const Subhead = styled.h2`
  ${typography.body.l2}
`

const Right = styled.article`
  grid-area: rightSide;
`

const Label = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

export default ProcessCrypto
