import { useGrant } from '@lib'
import Button from '../Button'

export const Grants = () => {
  const { publish } = useGrant()

  return <Button onClick={() => publish('')}>Publish</Button>
}

export default Grants
