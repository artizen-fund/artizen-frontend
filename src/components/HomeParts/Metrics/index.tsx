import styled from 'styled-components'
import { PagePadding } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'

const Metrics = () => (
  <PagePadding>
    <Wrapper>
      {[0, 1, 2, 3].map(i => (
        <Metric key={`metric-${i}`}>
          <Illustration />
          <Amount>
            <span>$</span>99,999
          </Amount>
          <Description>Description</Description>
        </Metric>
      ))}
    </Wrapper>
  </PagePadding>
)

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Metric = styled.div`
  text-align: center;
`

// todo: replace with styled.img
// todo: the responsive layout needs work, waiting on images first
const Illustration = styled.div`
  width: 148px;
  height: 148px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 204px;
    height: 204px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 320px;
    height: 320px;
  }
  border-radius: 9999px;
  background-color: ${rgba(palette.algae)};
`

const Amount = styled.div`
  margin-top: 0.75em;
  ${typography.title.l2}
  color: ${rgba(palette.night)};
  span {
    ${typography.title.l4}
    padding-right: 5px;
  }
`

const Description = styled.div`
  ${typography.label.l0}
  color: ${rgba(palette.barracuda)};
`

export default Metrics
