import styled from 'styled-components'
import { ArtifactCount, Rank } from '@components'

// note that rank comes from an array with starting index 0

const RankAndArtifactCount = ({ rank, count }: { rank: number; count: number }) => (
  <Wrapper>
    <Rank value={rank + 1} />
    <ArtifactCount count={count} />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`

export default RankAndArtifactCount
