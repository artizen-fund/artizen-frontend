import IconStack from './'
import { Icon } from '@components'

export default {
  title: 'components/IconStack',
  component: IconStack,
  argTypes: {},
}

export const IconStackComponent = (props: any) => (
  <IconStack {...props}>
    <li>
      <Icon glyph="refresh" label="Basic" />
    </li>
    <li>
      <Icon glyph="intersect" outline label="Outline" />
    </li>
    <li>
      <Icon glyph="swap" outline inverted label="Outline and Inverted" />
    </li>
    <li>
      <Icon glyph="intersect" inverted label="Inverted" />
    </li>
  </IconStack>
)
