import FormLabel, { FormLabelProps } from './'

export default {
  title: 'forms/FormLabel',
  component: FormLabel,
  argTypes: {},
}

export const StringControlComponent = (props: FormLabelProps) => {
  return <FormLabel {...props} />
}
