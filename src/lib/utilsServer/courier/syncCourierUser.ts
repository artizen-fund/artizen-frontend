import { assert } from '@lib'
import { getClient, sendNotification } from './'

export const syncCourierUser = async (data: ICourierAPI) => {
  const courier = getClient()

  const { id, email, artizenHandle, type } = data

  try {
    //TODO: Notifications must be updated to stop using given_name and family_names and move into nickname
    await courier.mergeProfile({
      recipientId: id,
      profile: {
        email,
        // given_name: firstName,
        // family_name: lastName,
        nickname: artizenHandle,
      },
    })
    //TODO: Update must be updated to stop using given_name and family_names and move into nickname
    const TEMPLATE_ID = assert(process.env.COURIER_WELCOME_TEMPLATE_ID, 'COURIER_WELCOME_TEMPLATE_ID')
    if (type === 'addNewUser') {
      sendNotification(
        {
          nickname: artizenHandle,
        },
        TEMPLATE_ID,
        email,
      )
    }
  } catch (err) {
    console.error('error syncing user in courier', err)
  }
}
