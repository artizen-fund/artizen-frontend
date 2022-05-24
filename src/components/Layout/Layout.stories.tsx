import Layout from './'
import { PagePadding } from '@components'

export default {
  title: 'layout/Layout',
  component: Layout,
}

export const LayoutComponent = () => {
  return (
    <Layout>
      <PagePadding>
        <h1>This is just some placeholder page content.</h1>
        <p>
          Curabitur blandit tempus porttitor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et.
        </p>
        <p>
          Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula
          porta felis euismod semper. Sed posuere consectetur est at lobortis.
        </p>
        <p>
          Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Curabitur blandit tempus porttitor. Curabitur blandit tempus
          porttitor. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
          dolor auctor.
        </p>
        <p>
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean
          lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          Maecenas sed diam eget risus varius blandit sit amet non magna.
        </p>
      </PagePadding>
    </Layout>
  )
}
