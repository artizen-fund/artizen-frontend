import { getClient } from './getClient'

export const sendNotification = async (data: any, template: string, email?: string) => {
  const courier = getClient()

  try {
    await courier.send({
      message: {
        to: {
          data,
          email,
        },
        template,
        routing: {
          method: 'single',
          channels: ['email'],
        },
      },
    })
  } catch (err) {
    console.error('error sending courier notification', err)
  }
}
