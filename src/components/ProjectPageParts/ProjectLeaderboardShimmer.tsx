import { Shimmer } from '@components'
import styled from 'styled-components'

const ProjectLeaderboardShimmer = () => (
  <Wrapper>
    <Shimmer height="20px" />
    <Shimmer height="60px" />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`

export default ProjectLeaderboardShimmer
