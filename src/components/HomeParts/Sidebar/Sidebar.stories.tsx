import Sidebar from './'

export default {
  title: 'homeParts/Sidebar',
  component: Sidebar,
  argTypes: {},
}

export const SidebarComponent = (props: any) => {
  return <Sidebar {...props} />
}
