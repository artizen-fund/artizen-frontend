import Label, { LabelProps } from './'

export default {
  title: 'forms/Label',
  component: Label,
  argTypes: {},
}

export const StringControlComponent = (props: LabelProps) => {
  return <Label {...props} />
}
