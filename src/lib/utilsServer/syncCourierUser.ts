import { CourierClient } from '@trycourier/courier'
import { assert } from '@lib'

export const createUserCourierProfile = async (recipientId: any, email: string) => {
  const courier = CourierClient({
    authorizationToken: assert(process.env.COURIER_API_KEY, 'COURIER_API_KEY'),
  })

  try {
    await courier.mergeProfile({
      recipientId,
      profile: {
        email,
      },
    })
  } catch (err) {
    console.error(err)
  }
}
