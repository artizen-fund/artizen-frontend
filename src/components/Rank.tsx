import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'
import numeral from 'numeral'

const Rank = ({ value }: { value: number }) => (
  <Wrapper>
    {value === 1 && <Glyph glyph="crown" level={2} color="algae" />}
    <span>{numeral(value).format('Oo')}</span>
  </Wrapper>
)

const Wrapper = styled.div`
  color: ${rgba(palette.algae)};
  ${typography.title.l4}
`

export default Rank
