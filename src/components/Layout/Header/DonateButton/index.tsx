import styled from 'styled-components'
import { Button, Glyph } from '@components'
import { useScrollToDonationBox } from '@lib'

const DonateButton = ({ ...props }: SimpleComponentProps) => {
  const scrollToDonationBox = useScrollToDonationBox()

  return (
    <StyledButton onClick={() => scrollToDonationBox()} glyph="donate" level={1} {...props}>
      Donate
    </StyledButton>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  @media only screen and (max-width: 413px) {
    ${() => Glyph} {
      display: none;
    }
  }
`

export default DonateButton
