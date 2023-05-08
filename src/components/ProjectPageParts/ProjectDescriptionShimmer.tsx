import { Shimmer } from '@components'
import styled from 'styled-components'
import { sizeForLevel } from '@lib'
import { breakpoint } from '@theme'

const ProjectDescriptionShimmer = () => (
  <Wrapper>
    <Shimmer height="30px" />
    <Shimmer height="30px" />
    <Shimmer height="50px" />
    <Shimmer height="30px" />
    <CreatorShimmer>
      <div>
        <AvatarShimmer />
      </div>
      <Copy>
        <Shimmer height="20px" />
        <Shimmer height="20px" />
      </Copy>
    </CreatorShimmer>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`

const CreatorShimmer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: 2em 0;
`

const AvatarShimmer = styled(props => <Shimmer {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px !important;

  min-width: ${sizeForLevel('mobile', 0)}px;
  height: ${sizeForLevel('mobile', 0)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    min-width: ${sizeForLevel('laptop', 0)}px;
    height: ${sizeForLevel('laptop', 0)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    min-width: ${sizeForLevel('desktop', 0)}px;
    height: ${sizeForLevel('desktop', 0)}px;
  }
`

const Copy = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > * {
    margin: auto 0;
  }
`

export default ProjectDescriptionShimmer
