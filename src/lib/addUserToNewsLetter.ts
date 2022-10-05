// const mailchimp = require('@mailchimp/mailchimp_marketing')
import { setConfig, lists } from '@mailchimp/mailchimp_marketing'
import md5 from 'md5'

setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_PREFIX,
})

export const addUserToNewsLetter = async (mail: string | null) => {
  if (!mail) {
    console.error('not email passed to add user to newsletter ')
    return
  }

  let response
  try {
    const subcriberHash = md5(mail.toLocaleLowerCase())
    response = await lists.setListMember(process.env.MAILCHIMP_AUDIENCE_ID || '', subcriberHash, {
      email_address: mail,
      status_if_new: 'subscribed',
      status: 'subscribed',
    })
  } catch (error) {
    console.error('error from adding user to newsLetter:: ', error)
  }

  return response
}
