import styled from 'styled-components'
import { Button, Glyph } from '@components'
import { glyphKey } from '@theme'

const DonateButton = ({ active, ...props }: SimpleComponentProps & { active: boolean }) => {
  return (
    <StyledButton glyph={active ? 'cross' : 'donate'} level={1} {...props} outline={active} glyphOnRight={active}>
      {active && 'Close'}
      {!active && 'Donate'}
    </StyledButton>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  @media only screen and (max-width: 413px) {
    ${Glyph} {
      display: none;
    }
  }
`

export default DonateButton
