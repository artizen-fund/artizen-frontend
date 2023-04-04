import styled from 'styled-components'
import { assetPath } from '@lib'
import { breakpoint, typography } from '@theme'
import { partners as copy } from '@copy/home'
import { PagePadding } from '@components'

const PartnersRibbon = () => (
  <PagePadding>
    <Wrapper>
      <Label>{copy.label}</Label>
      <Partners>
        {copy.partners.map(partner => (
          <Partner key={`partner-${partner}`}>
            <img src={assetPath(`/assets/partners/${partner}.svg`)} alt={partner} />
          </Partner>
        ))}
      </Partners>
    </Wrapper>
  </PagePadding>
)

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`

const Label = styled.h2`
  ${typography.label.l1}
`

const Partners = styled.ul`
  position: relative;
  margin-left: -24px;
  width: calc(100% + 48px);
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  overflow: scroll;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: contents;
    gap: 0;
  }
  /* TODO: need more time on this
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    pointer-events: none;
    content: ' ';
  }
  */
`

const Partner = styled.li`
  img {
    max-height: 56px;
    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }
  }
`

export default PartnersRibbon
