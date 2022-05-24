import FormCategorization, { FormCategorizationProps } from './'

export default {
  title: 'forms/FormCategorization',
  component: FormCategorization,
  argTypes: {},
}

export const FormCategorizationComponent = (props: FormCategorizationProps) => {
  return <FormCategorization {...props} />
}
