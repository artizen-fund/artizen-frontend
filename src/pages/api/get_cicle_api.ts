import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'


// import { removeTokenCookie, assert } from '@lib'

const getCicleApi = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (!req.cookies.token) {
//     return res.status(401).json({ message: 'User is not logged in' })
// }  



    // console.log('${process.env.CIRCLE_API}   ', process.env.CIRCLE_API)

    const apiRaw = await fetch('https://api-sandbox.circle.com/v1/encryption/public', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API}`,
        },
      })

      
      

      if(apiRaw.status !== 200) {
        return res.status(500).json(apiRaw)
      }

      const api = await apiRaw.json()

      
      return res.status(200).json(api)

      
        // .then(async data => {
            
        //   const api = await data.json()
        //   console.log('api backend   ', api)
        //   return api
        // })
        // .catch(e => {
        //   throw new Error(e)
        // })
  
}

export default withSentry(getCicleApi)
