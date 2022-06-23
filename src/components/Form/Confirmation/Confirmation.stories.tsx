import Confirmation from './'

export default {
  title: 'components/Confirmation',
  component: Confirmation,
  argTypes: {},
}

export const ConfirmationComponent = (props: any) => (
  <Confirmation {...props}>
    <div>Congrats, confirmation sent!</div>
    <p>Check your email and follow the steps to confirm your subscription.</p>
  </Confirmation>
)
