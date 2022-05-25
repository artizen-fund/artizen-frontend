import styled from 'styled-components'
import { StickyContent, ProgressBar, Button, Table, TableCell } from '@components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

const Sidebar = () => (
  <Wrapper>
    <h3>
      Join our <strong>May, 2022</strong> donation drive
    </h3>
    <Content>
      <p>$15,250 raised of $25,000 goal</p>
      <ProgressBar>{55}</ProgressBar>
      <Row>
        <CountdownClock />
        <DonationCount>3.2k</DonationCount>
      </Row>
      <Row>
        <Button onClick={() => console.log('donate!')} size="l1">
          Donate Now
        </Button>
        <Button onClick={() => console.log('share!')} size="l1" outline>
          Share
        </Button>
      </Row>
      <Table title="Leaderboard">
        <TableCell>
          <div>#1</div>
          <div>herp derp</div>
          <div>$69,00</div>
        </TableCell>
        <TableCell>
          <div>#2</div>
          <div>herp derp</div>
          <div>$68,00</div>
        </TableCell>
        <TableCell>
          <div>#3</div>
          <div>herp derp</div>
          <div>$67,00</div>
        </TableCell>
      </Table>
      <Table title="Additional Perks">
        <TableCell>Membership in Artizen DAO</TableCell>
        <TableCell>0.01% of $ART tokens</TableCell>
        <TableCell>Collectable Receipt</TableCell>
        <TableCell>Custom Discord Avatar</TableCell>
      </Table>
    </Content>
  </Wrapper>
)

const Wrapper = styled(props => <StickyContent {...props} />)`
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.barracuda)};
    border-bottom: 1px solid rgba(114, 124, 140, 0.12);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
  border-radius: 16px;

  display: none;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: block;
    width: 390px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 500px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px 32px 32px;
  gap: 32px;
  > * {
    width: 100%;
  }
`

const CountdownClock = styled.div``

const DonationCount = styled.div``

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default Sidebar
