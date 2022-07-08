import styled from 'styled-components'
import { PagePadding } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'

const Metrics = () => (
  <PagePadding>
    <Wrapper>
      {[0, 1, 2, 3].map(index => (
        <Metric key={`metric-${index}`}>
          <Illustration url="/assets/illustrations/stats-collected.svg" />
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
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 30px;
  grid-column-gap: 15px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 25px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-column-gap: 30px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-column-gap: 80px;
  }
`

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

// todo: the responsive layout needs work, waiting on images first
const Illustration = styled.div<{ url: string }>`
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
  background-image: url(${props => props.url});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  outline: 1px dashed black;
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
