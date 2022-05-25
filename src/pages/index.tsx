import styled from 'styled-components'
import type { NextPage } from 'next'
import { Layout, Newsletter, TableCell, Table, StickyCanvas, StickyContent } from '@components'
import { CreateTopUpWallet } from '@lib'

const Home: NextPage = () => {
  return (
    <Layout>
      <CreateTopUpWallet />

      <StickyCanvas>
        <DryContent>
          <h1>dry content</h1>
          <p>welcome to Artizen</p>
          <p>
            Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo.
          </p>
          <p>
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
            dolor auctor.
          </p>
          <p>
            Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Aenean lacinia
            bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          </p>
          <p>
            Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit
            aliquet. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.
          </p>
        </DryContent>
        <StickyContent>
          <Table title="Leaderboard">
            <TableCell>derp</TableCell>
          </Table>
          <Table title="Additional Perks">
            <TableCell>derp</TableCell>
          </Table>
        </StickyContent>
      </StickyCanvas>
      <Newsletter />
      <p>love us some Artizen</p>
    </Layout>
  )
}

const DryContent = styled.div`
  width: 60%;
`

export default Home
