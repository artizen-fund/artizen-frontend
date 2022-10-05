// const mailchimp = require('@mailchimp/mailchimp_marketing')
import { setConfig, lists } from '@mailchimp/mailchimp_marketing'
import md5 from 'md5'
import { assert } from '@lib'

export const addUserToNewsLetter = async (mail: string | null) => {
  if (!mail) {
    console.error('not email passed to add user to newsletter ')
    return
  }

  try {
    const mailChimpApiKey = assert(process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY, 'NEXT_PUBLIC_MAILCHIMP_API_KEY')
    const mailChimpPrefix = assert(process.env.NEXT_PUBLIC_MAILCHIMP_PREFIX, 'NEXT_PUBLIC_MAILCHIMP_PREFIX')
    const mailChimpAudicienId = assert(
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
      'NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID',
    )
    setConfig({
      apiKey: mailChimpApiKey,
      server: mailChimpPrefix,
    })

    const subcriberHash = md5(mail.toLocaleLowerCase())
    const response = await lists.setListMember(mailChimpAudicienId || '', subcriberHash, {
      email_address: mail,
      status_if_new: 'subscribed',
      status: 'subscribed',
    })
    return response
  } catch (error) {
    console.error('error from adding user to newsLetter:: ', error)
  }
}
