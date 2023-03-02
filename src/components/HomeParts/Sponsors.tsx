import styled from 'styled-components'
import { assetPath } from '@lib'
import { breakpoint, typography } from '@theme'
import { partners as copy } from '@copy/home'

const Sponsors = () => (
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
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
`

const Label = styled.h2`
  ${typography.label.l1}
`

const Partners = styled.ul`
  display: contents;
`

const Partner = styled.li`
  img {
    max-height: 56px;
  }
`

export default Sponsors
