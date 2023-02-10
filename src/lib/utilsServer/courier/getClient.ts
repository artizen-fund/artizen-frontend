import { CourierClient } from '@trycourier/courier'
import { assert } from '@lib'

export const getClient = () => {
  const authorizationToken = assert(process.env.COURIER_API_KEY, 'COURIER_API_KEY')
  return CourierClient({ authorizationToken })
}
