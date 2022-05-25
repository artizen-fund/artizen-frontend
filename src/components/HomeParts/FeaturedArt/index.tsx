import styled from 'styled-components'
import { StickyContent, ProgressBar, Button, Table, TableCell } from '@components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

const FeaturedArt = () => (
  <Wrapper>
    <FeaturedArtworkImage />
    <h1>Title of Monthly Featured Artwork</h1>
    <Info>
      <div>Artist Name</div>
      <div>Created # days ago</div>
      <div>Tag Name</div>
    </Info>
  </Wrapper>
)

const Wrapper = styled.section``

const FeaturedArtworkImage = styled.div`
  width: 100%;
  height: 400px;
  background: blue;
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-gap: 50px;
  > div {
    min-width: 45%;
  }
`

export default FeaturedArt
