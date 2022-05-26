import styled from 'styled-components'
import { Table, TableCell, Icon } from '@components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'

const Perks = () => (
  <Table title="Additional Perks">
    <TableCell>
      <div>
        <StyledIcon>badge</StyledIcon>Membership in Artizen DAO
      </div>
    </TableCell>
    <TableCell>
      <div>
        <StyledIcon>token</StyledIcon>0.01% of $ART tokens
      </div>
    </TableCell>
    <TableCell>
      <div>
        <StyledIcon>certificate</StyledIcon>Collectable Receipt
      </div>
    </TableCell>
    <TableCell>
      <div>
        <StyledIcon>face</StyledIcon>Custom Discord Avatar
      </div>
    </TableCell>
  </Table>
)

const StyledIcon = (props: any) => (
  <Wrapper>
    <Icon color="night" darkColor="moon" {...props} />
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
