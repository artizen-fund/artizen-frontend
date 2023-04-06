import { assert } from '@lib'
import { getClient, sendNotification } from './'

export const syncCourierUser = async (data: ICourierAPI) => {
  const courier = getClient()

  const { id, email, firstName, lastName, type } = data

  try {
    await courier.mergeProfile({
      recipientId: id,
      profile: {
        email,
        given_name: firstName,
        family_name: lastName,
      },
    })
    const TEMPLATE_ID = assert(process.env.COURIER_WELCOME_TEMPLATE_ID, 'COURIER_WELCOME_TEMPLATE_ID')
    if (type === 'addNewUser') {
      sendNotification(
        {
          firstName,
        },
        TEMPLATE_ID,
        email,
      )
    }
  } catch (err) {
    console.error('error syncing user in courier')
  }
}
