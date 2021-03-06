import styled from 'styled-components'
import { Button, Table, TableCell, Glyph } from '@components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'

const Perks = () => {
  const sideItem = (
    <Button href="/" outline level={2}>
      Learn More
    </Button>
  )
  return (
    <Table title="Additional Perks" {...{ sideItem }}>
      <TableCell>
        <div>
          <StyledGlyph glyph="badge" outline />
          Membership in Artizen DAO
        </div>
      </TableCell>
      <TableCell>
        <div>
          <StyledGlyph glyph="token" outline />
          0.01% of $ART tokens
        </div>
      </TableCell>
      <TableCell>
        <div>
          <StyledGlyph glyph="certificate" outline />
          Collectable Receipt
        </div>
      </TableCell>
      <TableCell>
        <div>
          <StyledGlyph glyph="face" outline />
          Custom Discord Avatar
        </div>
      </TableCell>
    </Table>
  )
}

const StyledGlyph = (props: any) => (
  <Wrapper>
    <Glyph {...props} />
  </Wrapper>
)

const Wrapper = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
  border-radius: 9999px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 48px;
    width: 48px;
  }
`

export default Perks
