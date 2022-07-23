import styled from 'styled-components'
import { PagePadding } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba, assetPath } from '@lib'

interface IMetrics {
  metrics?: Array<{
    description: string
    image: string
    amount: number
  }>
}

const Metrics = ({ metrics }: IMetrics) => (
  <PagePadding>
    <Wrapper>
      {metrics?.map((metric, index) => (
        <Metric key={`metric-${index}`}>
          <Illustration type="image/svg+xml" data={assetPath(metric.image)} />
          <Amount>
            <span>$</span>
            {metric.amount.toLocaleString('en-US')}
          </Amount>
          <Description>{metric.description}</Description>
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
const Illustration = styled.object`
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
`

const Amount = styled.div`
  margin-top: 0.75em;
  ${typography.title.l2}
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
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
