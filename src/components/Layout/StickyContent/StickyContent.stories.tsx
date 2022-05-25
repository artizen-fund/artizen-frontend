import styled from 'styled-components'
import { StickyContent, StickyCanvas } from './'
import { breakpoint } from '@theme'

export default {
  title: 'layout/StickyContent',
  component: StickyContent,
  argTypes: {},
}

const MockSubContent = styled.div`
  min-height: 150vh;
`

const DryContent = styled.div`
  padding-top: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding-top: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding-top: 88px;
  }
`

export const StickyContentComponent = (props: any) => {
  return (
    <div>
      <StickyCanvas>
        <DryContent>
          <h1>dry content</h1>
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
        <StickyContent>This is sticky content.</StickyContent>
      </StickyCanvas>
      <MockSubContent>
        <h1>subsequent content</h1>
        <p>
          Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta
          ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.
        </p>
        <p>
          Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi leo risus, porta ac consectetur ac,
          vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
          massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus
          sit amet fermentum.
        </p>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare
          vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius
          blandit sit amet non magna.
        </p>
        <p>
          Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a
          ante venenatis dapibus posuere velit aliquet.
        </p>
        <p>
          Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta
          ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.
        </p>
        <p>
          Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi leo risus, porta ac consectetur ac,
          vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
          massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus
          sit amet fermentum.
        </p>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare
          vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius
          blandit sit amet non magna.
        </p>
        <p>
          Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a
          ante venenatis dapibus posuere velit aliquet.
        </p>
      </MockSubContent>
    </div>
  )
}
