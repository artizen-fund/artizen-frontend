import { CourierClient } from '@trycourier/courier'
import { assert } from '../assert'

export const createUserCourierProfile = async (userId: string, email: string) => {
  const courier = CourierClient({
    authorizationToken: assert(process.env.COURIER_API_KEY, 'COURIER_API_KEY'),
  })

  try {
    await courier.mergeProfile({
      recipientId: userId,
      profile: {
        email,
      },
    })
  } catch (err) {
    console.error(err)
  }
}
