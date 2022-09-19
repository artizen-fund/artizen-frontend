import { useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { rgba, DonationContext } from '@lib'
import { breakpoint, palette, typography } from '@theme'
import { howItWorks } from '@copy/header'

const HowItWorks = () => {
  const { toggleShelf } = useContext(DonationContext)

  return (
    <Wrapper>
      {howItWorks.map(cell => (
        <Cell key={`cell-${cell.title}`} mobileOnly={cell.mobileOnly}>
          <Illustration light={cell.illustration} dark={cell.illustrationDark} />
          <Under>
            <Title>{cell.title}</Title>
            <Description>{cell.copy}</Description>
            {!!cell.shelf && (
              <Button outline level={2} onClick={() => toggleShelf?.(cell.shelf as HeaderShelfType)}>
                Learn More
              </Button>
            )}
            {!!cell.destination && (
              <Button outline level={2} href={cell.destination}>
                Learn More
              </Button>
            )}
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
  flex-direction: row;
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: column;
    &:nth-child(even) {
      flex-direction: column;
    }
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

const Illustration = styled.div<{ light: string; dark: string }>`
  height: auto;
  width: 50%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/assets/illustrations/${props => props.light}');
  @media (prefers-color-scheme: dark) {
    background-image: url('/assets/illustrations/${props => props.dark}');
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    background-position: center center;
    height: 150px;
    width: auto;
  }
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
