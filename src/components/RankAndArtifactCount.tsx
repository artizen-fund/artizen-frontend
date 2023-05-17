import styled from 'styled-components'
import { ArtifactCount, Rank } from '@components'
import { typography, palette } from '@theme'
import { rgba } from '@lib'

// note that rank comes from an array with starting index 0

const RankAndArtifactCount = ({
  rank,
  count,
  seasonIsActive,
}: {
  rank: number
  count: number
  seasonIsActive?: boolean
}) => (
  <Wrapper>
    <Rank value={rank + 1} />
    <ArtifactCount count={count} />
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
`

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  lign-items: flex-end;
`

export default RankAndArtifactCount
