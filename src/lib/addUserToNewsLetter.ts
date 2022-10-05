import { setConfig, lists, MembersSuccessResponse, MemberErrorResponse } from '@mailchimp/mailchimp_marketing'

setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_PREFIX,
})

export const addUserToNewsLetter = async (mail: string) => {
  const responseFromAddingUserCall: MembersSuccessResponse | MemberErrorResponse = await lists.addListMember(
    process.env.MAILCHIMP_AUDIENCE_ID || '',
    {
      email_address: mail,
      status: 'subscribed',
    },
  )

  console.log('responseFromAddingUserCall  ', responseFromAddingUserCall)
}
