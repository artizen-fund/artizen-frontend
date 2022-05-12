import React from 'react'
import Image from 'next/image'
import { Button } from '@components'

const Page = () => (
  <div>
    <Image
      src="https://res.cloudinary.com/kaleidoscope/image/upload/v1650027686/web3_public/illustrations/scream.png"
      alt="Artizen Scream"
      width={122}
      height={183}
    />
    <p>
      Looks like the page you&apos;re looking for doesn&apos;t exist. There might be a typo in the url address or the
      page might have moved.
    </p>
    <Button href="/">Go back to the hompage</Button>
  </div>
)

export default Page
