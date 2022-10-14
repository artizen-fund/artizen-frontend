import { useContext } from 'react'
import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { rgba, DonationContext } from '@lib'
import { Button, PagePadding } from '@components'
import SocialLinks from './SocialLinks'

const Footer = () => {
  const { setVisibleShelf } = useContext(DonationContext)
  return (
    <>
      <PagePadding black>
        <Wrapper>
          <Rule gridSpace="rule1" />
          <BigLinks>
            <li>Mission</li>
            <li>Leaderboard</li>
            <li>How it Works</li>
            <li>Community</li>
          </BigLinks>
          <SmallLinks>
            <li>Contact</li>
            <li>Careers</li>
            <li>Press</li>
          </SmallLinks>
          <Rule gridSpace="rule2" />
          <CTA>
            <Copy>Join the mission to fund human creativity.</Copy>
            <Buttons>
              <Button onClick={() => setVisibleShelf?.('donate')} stretch inverted level={1} glyph="donate">
                Donate
              </Button>
              <Button onClick={() => alert('coming soon')} stretch inverted outline level={1}>
                Share
              </Button>
            </Buttons>
          </CTA>
          <Rule gridSpace="rule3" />
          <SocialLinks />
        </Wrapper>
      </PagePadding>
      <StyledPagePadding>
        <Credits>
          <div>Open source platform made with ❤️ by a globally distributed team</div>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
          </ul>
        </Credits>
      </StyledPagePadding>
    </>
  )
}

const Wrapper = styled.footer`
  display: grid;
  grid-template-areas:
    'rule1 rule1'
    'bigLinks smallLinks'
    'rule2 rule2'
    'cta cta'
    'rule3 rule3'
    'social social';
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 21px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-gap: 24px 48px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-areas:
      'rule1 rule1 rule2'
      'bigLinks smallLinks cta'
      'rule3 rule3 rule3'
      'social social social';
    grid-template-columns: 2fr 1fr 3fr;
    grid-gap: 32px 65px;
    /* todo: this grid template is not getting us equal columns */
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-gap: 40px 65px;
  }
  color: ${rgba(palette.white)};
`

const Rule = styled.hr<{ gridSpace: string }>`
  grid-area: ${props => props.gridSpace};
  display: block;
  appearance: none;
  width: 100%;
  height: 1px;
  background-color: ${rgba(palette.barracuda, 0.64)};
  border: 0px;
  outline: 0px;
`

const BigLinks = styled.ul`
  grid-area: bigLinks;
  ${typography.title.l2}
  line-height: 155% !important;
`

const SmallLinks = styled.ul`
  grid-area: smallLinks;
  ${typography.label.l0}
  line-height: 220% !important;
`

const CTA = styled.div`
  grid-area: cta;
  display: flex;
  flex-direction: column;
  gap: 21px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 24px 48px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 32px 65px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 40px 65px;
  }
`

const Copy = styled.div`
  ${typography.title.l2}
`

const Buttons = styled.div`
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`

const Credits = styled.footer`
  text-align: center;
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
  ul {
    display: flex;
    justify-content: space-around;
    li {
      display: block;
    }
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  padding: 15px 0;
  background-color: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.black)};
    color: ${rgba(palette.white)};
  }
`

export default Footer
