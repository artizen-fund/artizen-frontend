import Icon, { IconProps } from './'
import { glyphKey } from '@theme'

const story = {
  title: 'components/Icon',
  component: Icon,
  argTypes: {
    glyph: {
      options: glyphKey,
      control: { type: 'select' },
    },
    level: {
      options: [0, 1, 2],
      control: { type: 'radio' },
    },
  },
}
export default story

export const IconComponent = (props: IconProps) => <Icon {...props} />
