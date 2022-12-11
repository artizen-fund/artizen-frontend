import { CourierClient } from '@trycourier/courier'
import { assert } from '@lib'

export const createUserCourierProfile = async (recipientId: string, email: string) => {
  const authorizationToken = assert(process.env.COURIER_API_KEY, 'COURIER_API_KEY')
  const courier = CourierClient({ authorizationToken })
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
