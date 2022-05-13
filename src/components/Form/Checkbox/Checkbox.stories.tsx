import Checkbox, { CheckboxProps } from './'

export default {
  title: 'forms/Checkbox',
  component: Checkbox,
  argTypes: {},
}

export const CheckboxComponent = (props: CheckboxProps) => <Checkbox {...props}>This is a checkbox.</Checkbox>
