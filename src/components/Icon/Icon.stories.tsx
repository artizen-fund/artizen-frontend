import Icon, { IconProps } from './'
import { iconSize, iconKey } from './Icon.enums'
import { palette } from '@theme'

export default {
  title: 'components/Icon',
  component: Icon,
  argTypes: {
    children: {
      options: iconKey,
      control: { type: 'select' },
    },
    color: {
      options: Object.keys(palette),
      control: { type: 'select' },
    },
    darkColor: {
      options: [undefined, ...Object.keys(palette)],
      control: { type: 'select' },
    },
    size: {
      options: { responsive: undefined, ...iconSize },
      control: { type: 'radio' },
    },
    solid: {
      control: 'boolean',
    },
  },
}

export const IconComponent = (props: IconProps) => <Icon {...props} />
