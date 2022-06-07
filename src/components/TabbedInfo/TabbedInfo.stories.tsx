import styled from 'styled-components'
import TabbedInfo from './'

const story = {
  title: 'components/TabbedInfo',
  component: TabbedInfo,
  argTypes: {},
}
export default story

const Tab = styled.div<{ label: string }>``

export const ProgressBarComponent = () => {
  return (
    <TabbedInfo>
      <Tab label="First Tab">
        <h1>This is the first tab.</h1>
        <p>
          Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere
          velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
          elit. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
          dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.
        </p>
      </Tab>
      <Tab label="Second Tab">
        <h1>Is the second tab?</h1>
        <p>
          Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent
          commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.
        </p>
      </Tab>
      <Tab label="Third Tab">
        <h1>Yo quiero tres tab.</h1>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce
          dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
      </Tab>
    </TabbedInfo>
  )
}
