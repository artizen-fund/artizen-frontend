import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'
import numeral from 'numeral'

const Rank = ({ value }: { value: number }) => (
  <Wrapper>
    {value === 1 && <StyledGlyph glyph="crown" level={1} color="algae" darkColor="algae" />}
    <span>{numeral(value).format('Oo')}</span>
  </Wrapper>
)

const StyledGlyph = styled(props => <Glyph {...props} />)`
  --iconSize: 16px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  color: ${rgba(palette.algae)};
  ${typography.title.l4}
`

export default Rank
