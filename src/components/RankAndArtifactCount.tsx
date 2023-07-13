import styled from 'styled-components'
import { ArtifactRaised, Rank } from '@components'
import { typography, palette, breakpoint } from '@theme'
import { rgba } from '@lib'

// note that rank comes from an array with starting index 0

const RankAndArtifactCount = ({
  rank,
  count,
  seasonIsActive,
  totalSales,
  matchFundPooled,
}: {
  rank: number
  count: number
  seasonIsActive?: boolean
  totalSales: number
  matchFundPooled: number
}) => (
  <Wrapper>
    <Rank value={rank + 1} />
    <ArtifactRaised isWinner={rank === 0} count={count} totalSales={totalSales} matchFundPooled={matchFundPooled} />
    {!seasonIsActive && (
      <SubmissionEnded>
        <span>Season 2 ended</span>
      </SubmissionEnded>
    )}
  </Wrapper>
)

const SubmissionEnded = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4em 0.5em;
  border: 0.5px solid ${palette.grey};
  color: ${rgba(palette.barracuda)};
  span {
    font-weight: 800 !important;
    ${typography.label.l3}
  }
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    display: none;
  }

  @media only screen and (min-width: ${breakpoint.mobile}px) {
    display: none;
  }
`

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  lign-items: flex-end;
`

export default RankAndArtifactCount
