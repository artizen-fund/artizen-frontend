import styled from 'styled-components'
import { Button } from '@components'
import { rgba } from '@lib'
import { breakpoint, palette, typography } from '@theme'

const HowItWorks = () => {
  const cells = [
    {
      illustration: 'derp',
      title: 'Leaderboard',
      copy: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
      destination: '/derp',
      mobileOnly: true,
    },
    {
      illustration: 'derp',
      title: 'About',
      copy: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
      destination: '/derp',
    },
    {
      illustration: 'derp',
      title: 'Grants',
      copy: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
      destination: '/derp',
    },
    {
      illustration: 'derp',
      title: 'FAQs',
      copy: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
      destination: '/derp',
    },
  ]
  return (
    <Wrapper>
      {cells.map(cell => (
        <Cell key={`cell-${cell.title}`} mobileOnly={cell.mobileOnly}>
          <Illustration />
          <Under>
            <Title>{cell.title}</Title>
            <Description>{cell.copy}</Description>
            <Button outline level={2} href={cell.destination}>
              Learn More
            </Button>
          </Under>
        </Cell>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Cell = styled.div<{ mobileOnly?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    ${props => props.mobileOnly && 'display: none;'}
  }
`

const Under = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
`

const Illustration = styled.div`
  height: 120px;
  margin-bottom: 1em;
  background: ${rgba(palette.moss)};
  border-radius: 15px;
`

const Title = styled.h2`
  ${typography.title.l4}
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

const Description = styled.p`
  ${typography.body.l3}
  color: ${rgba(palette.slate)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.stone)};
  }
`

export default HowItWorks
