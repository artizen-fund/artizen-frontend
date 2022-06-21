import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Button, PagePadding } from '@components'
import { schema, uischema, initialState, FormState } from './form'
import { isServer } from '@lib'

const AuthForm = () => {
  const router = useRouter()

  const LOCALSTORAGE_KEY = 'ARTIZEN_DEV_PASSWORD'

  const [data, setData] = useState<FormState>(initialState)
  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [])

  const submit = () => {
    if (isServer()) return
    router.reload()
  }

  return (
    <PagePadding>
      <h1>Please enter the Artizen Frontend Preview password.</h1>
      <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData }} />
      <Button onClick={() => submit()} level={1}>
        Submit
      </Button>
    </PagePadding>
  )
}

export default AuthForm
