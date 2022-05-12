import Input, { InputProps } from './'
import { iconKey } from '../Icon/Icon.enums'

export default {
  title: 'components/Input',
  component: Input,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(iconKey),
    },
  },
}

export const InputComponent = (props: InputProps) => <Input {...props} />

export const SelectComponent = (props: InputProps) => (
  <Input {...props} type="select" options={['red', 'blue', 'orange']} />
)
