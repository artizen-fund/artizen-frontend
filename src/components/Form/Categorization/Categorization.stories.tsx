import Categorization, { CategorizationProps } from './'

export default {
  title: 'forms/Categorization',
  component: Categorization,
  argTypes: {},
}

export const CategorizationComponent = (props: CategorizationProps) => {
  return <Categorization {...props} />
}
