import { CourierClient } from '@trycourier/courier'
import { assert } from '@lib'
import { FormState } from '@forms/createProfile'
import { welcomeEmail } from '@copy/common'

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

    const courierResponse = await courier.send({
      message: {
        to: {
          data: {
            name: `${userData.firstName} ${userData.lastName}`,
          },
          email: userData.email,
        },
        content: {
          title: welcomeEmail.title,
          body: welcomeEmail.body,
        },
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
