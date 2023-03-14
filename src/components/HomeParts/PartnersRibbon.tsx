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
  display: flex;
  flex-direction: row;
  gap: 30px;
  overflow: scroll;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: contents;
    gap: 0;
  }
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
