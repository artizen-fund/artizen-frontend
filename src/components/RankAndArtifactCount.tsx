import { useEffect } from 'react'
import styled from 'styled-components'
import { ArtifactCount, Rank } from '@components'

const RankAndArtifactCount = ({ rank, count }: { rank: number; count: number }) => (
  <Wrapper>
    <Rank value={rank} />
    <ArtifactCount count={count} />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`

export default RankAndArtifactCount
