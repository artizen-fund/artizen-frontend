import Metrics from './'

const story = {
  title: 'page/home/Metrics',
  component: Metrics,
  argTypes: {},
}
export default story

export const MetricsComponent = (props: any) => {
  return <Metrics {...props} />
}
