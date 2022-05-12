import InputString, { InputStringProps } from './'
import { iconKey } from '../Icon/Icon.enums'

export default {
  title: 'components/InputString',
  component: InputString,
  argTypes: {},
}

export const InputStringComponent = (props: InputStringProps) => <InputString {...props} />
