import { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { rgba, LayoutContext, textCrop } from '@lib'
import { Button, PagePadding } from '@components'
import SocialLinks from './SocialLinks'

const Footer = () => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  return (
    <Wrapper>
      <PagePadding black>
        <TopWrapper>
          <Column>
            <WrapperLists>
              <Lists>
                <MainList>
                  <Item>
                    <Link target="_blank" href="https://help.artizen.fund/en/articles/6767446-our-mission">
                      Mission
                    </Link>
                  </Item>
                  <Item>
                    <Link target="_blank" href="https://help.artizen.fund/en/articles/6604052-what-are-artifacts">
                      Artifacts
                    </Link>
                  </Item>
                  <Item>
                    <Link
                      target="_blank"
                      href="https://help.artizen.fund/en/articles/6782291-welcome-to-the-artizen-fund"
                    >
                      How It Works
                    </Link>
                  </Item>
                  <Item>
                    <Link target="_blank" href="https://help.artizen.fund/en/articles/6761187-join-a-vibrant-community">
                      Community
                    </Link>
                  </Item>
                </MainList>
                <SubList>
                  <Item>
                    <Link target="_blank" href="https://help.artizen.fund/en/articles/4758440-connect-with-us">
                      Contact
                    </Link>
                  </Item>
                  <Item>
                    <Link target="_blank" href="https://help.artizen.fund">
                      Help Center
                    </Link>
                  </Item>
                  <Item>
                    <Link target="_blank" href="https://help.artizen.fund/en/articles/6746680-reward-positive-impact">
                      Impact
                    </Link>
                  </Item>
                </SubList>
              </Lists>
            </WrapperLists>
          </Column>
          <Column>
            <Headline>Join the mission to fund human creativity.</Headline>
            <Buttons>
              <Button
                onClick={() => setVisibleModalWithAttrs('share', { mode: 'home' })}
                stretch
                inverted
                outline
                level={1}
              >
                Share Now
              </Button>
            </Buttons>
          </Column>
          <Column>
            <SocialLinks />
          </Column>
        </TopWrapper>
      </PagePadding>

      <StyledPagePadding>
        <BottomWrapper>
          <Credits>Open source platform made with ❤️ by a globally distributed team.</Credits>
          <Legal>
            <Item>
              <Link target="_blank" href="https://help.artizen.fund/en/articles/4761373-privacy-policy">
                Privacy Policy
              </Link>
            </Item>
            <Item>
              <Link target="_blank" href="https://help.artizen.fund/en/articles/4761356-terms-of-use">
                Terms &amp; Conditions
              </Link>
            </Item>
          </Legal>
        </BottomWrapper>
      </StyledPagePadding>
    </Wrapper>
  )
}

/* Scaffolding */

const Wrapper = styled.footer``

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  padding: 0 !important;
`

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
  color: ${rgba(palette.white)};

  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
    gap: 48px;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 64px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 80px;
  }
`

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  gap: 12px;
  width: 100%;
  padding: 20px 0;
  color: ${rgba(palette.barracuda)};

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 48px;
    height: 56px;
    padding: 0px;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 64px;
    height: 64px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 80px;
    height: 72px;
  }
`

/* Columns */

const Column = styled.div`
  flex: 1 1 auto;
  align-self: stretch;
  padding-top: 24px;
  border-top: 1px solid ${rgba(palette.barracuda, 0.64)};

  &:last-of-type {
    flex: 1 1 100%;
  }

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex: 1 1 calc(50% - 24px);
    padding-top: 32px;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    flex: 1 1 auto;
    padding-top: 40px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding-top: 48px;
  }
`

/* Lists */

const WrapperLists = styled.div`
  &::before,
  &::after {
    display: block;
    height: 0;
    width: 0;
    pointer-events: none;
    content: '';
  }

  &::before {
    margin-bottom: -12px;
  }
  &::after {
    margin-top: -10px;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    &::before {
      margin-bottom: -14px;
    }
    &::after {
      margin-top: -14px;
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    &::before {
      margin-bottom: -16px;
    }
    &::after {
      margin-top: -16px;
    }
  }
`

const Lists = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  gap: 20px;

  & > ul {
    flex: 0 1 auto;
    min-width: 25%;
  }

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 24px;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 32px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 40px;
  }
`

const MainList = styled.ul`
  & > li {
    ${textCrop(typography.title.l2)}

    & a {
      padding: 10px 0;

      @media only screen and (min-width: ${breakpoint.tablet}px) {
        &::after {
          bottom: 8px;
        }

        &:hover {
          transform: translate3d(5px, 0, 0);
        }
      }

      @media only screen and (min-width: ${breakpoint.laptop}px) {
        padding: 14px 0;
        &::after {
          bottom: 10px;
        }
      }

      @media only screen and (min-width: ${breakpoint.desktop}px) {
        padding: 16px 0;
        &::after {
          bottom: 12px;
        }
      }
    }
  }
`

const SubList = styled.ul`
  padding-top: 4px;

  & > li {
    ${textCrop(typography.label.l1)}

    & a {
      padding: 7px 0;

      @media only screen and (min-width: ${breakpoint.tablet}px) {
        &::after {
          bottom: 6px;
        }
        &:hover {
          transform: translate3d(3px, 0, 0);
        }
      }

      @media only screen and (min-width: ${breakpoint.laptop}px) {
        padding: 8.5px 0;
      }

      @media only screen and (min-width: ${breakpoint.desktop}px) {
        padding: 10px 0;
      }
    }
  }
`

const Item = styled.li`
  & > a {
    position: relative;
    display: block;
    width: fit-content;
    overflow: hidden;
    cursor: pointer;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
    transition: color 0.25s ease-in-out, transform 0.35s ease-in-out;

    @media only screen and (min-width: ${breakpoint.tablet}px) {
      &::after {
        z-index: 2;
        position: absolute;
        left: 0;
        background-color: ${rgba(palette.algae)};
        width: 100%;
        height: 2px;
        border-radius: 1px;
        transform: translate3d(-100%, 0, 0);
        transition: color 0.25s ease-in-out, transform 0.35s ease-in-out;
        content: '';
        pointer-events: none;
      }

      &:hover {
        color: ${rgba(palette.algae)};
        &::after {
          transform: translate3d(0, 0, 0);
        }
      }
    }
  }
`

/* Styling */

const Headline = styled.div`
  ${textCrop(typography.title.l2)}
  overflow-wrap: break-word;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 480px;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding-top: 24px;

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding-top: 32px;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 14px;
    padding-top: 40px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
    max-width: 420px;
    padding-top: 48px;
  }
`

const Credits = styled.div`
  ${textCrop(typography.label.l2)}
  text-align: center;

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    text-align: left;
  }
`

const Legal = styled.ul`
  display: flex;
  justify-content: center;
  gap: 8px;

  & > li {
    ${textCrop(typography.label.l2)}
  }

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    & > li a {
      &::after {
        bottom: 0px;
      }
    }
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 14px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }
`

export default Footer
