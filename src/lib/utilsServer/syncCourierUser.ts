import { CourierClient } from '@trycourier/courier'
import { assert } from '@lib'
import { FormState } from '@forms/createProfile'

export const createUserCourierProfile = async (recipientId: string, userData: FormState) => {
  const authorizationToken = assert(process.env.COURIER_API_KEY, 'COURIER_API_KEY')
  const courier = CourierClient({ authorizationToken })
  try {
    await courier.mergeProfile({
      recipientId,
      profile: {
        email: userData.email,
        name: userData.firstName,
        family_name: userData.lastName,
      },
    })
    const TEMPLATE_ID = assert(process.env.COURIER_WELCOME_TEMPLATE_ID, 'COURIER_WELCOME_TEMPLATE_ID')
    await courier.send({
      message: {
        to: {
          data: {
            firstName: userData.firstName,
          },
          email: userData.email,
        },
        template: TEMPLATE_ID,
        routing: {
          method: 'single',
          channels: ['email'],
        },
      },
    })
  } catch (err) {
    console.error(err)
  }
}
