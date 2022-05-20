import type { NextPage } from 'next'
import Link from 'next/link'
import { Header } from '@components'
import { CreateTopUpWallet, usePreventTabClose } from '@lib'

const Home: NextPage = () => {
  usePreventTabClose()
  return (
    <>
      <CreateTopUpWallet />
      <Header />
      <p>Home!</p>
      <ul>
        <li>
          <Link href="/sample-form">
            <a>👉 Sample Form</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Home
