import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

const makePayment = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.cookies.token) {
        return res.status(401).json({ message: 'User is not logged in' })
    }

    const {body} = req

    const apiRaw = await fetch('https://api-sandbox.circle.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API}`,
        },
        body: JSON.stringify(body),
      })

      const api = await apiRaw.json()
      // eslint-disable-next-line
      console.log('result of payment  ', api)

      if(api?.code) {
        return res.status(500).json(api)
      }

      
      return res.status(200).json(api)


}

export default withSentry(makePayment)
