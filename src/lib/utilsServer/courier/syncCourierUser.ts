import { assert } from '@lib'
import { getClient, sendNotification } from './'
import { FormState } from '@forms/createProfile'
import { template } from 'lodash'

export const createUserCourierProfile = async (recipientId: string, userData: FormState) => {
  const courier = getClient()
  try {
    await courier.mergeProfile({
      recipientId,
      profile: {
        email: userData.email,
        given_name: userData.firstName,
        family_name: userData.lastName,
      },
    })
    const TEMPLATE_ID = assert(process.env.COURIER_WELCOME_TEMPLATE_ID, 'COURIER_WELCOME_TEMPLATE_ID')

    sendNotification(
      {
        firstName: userData.firstName,
      },
      TEMPLATE_ID,
      userData.email,
    )
  } catch (err) {
    console.error('error syncing user in courier')
  }
}
