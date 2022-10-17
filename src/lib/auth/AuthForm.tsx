import { useRouter } from 'next/router'
import { Form, Button, PagePadding } from '@components'
import { schema, uischema, initialState, FormState } from './form'
import { useFormLocalStorage } from '@lib'

export const AuthForm = () => {
  const router = useRouter()
  const localStorageKey = 'ARTIZEN_DEV_PASSWORD'
  const [data, setData] = useFormLocalStorage<FormState>(localStorageKey, initialState)

  const submit = () => router.reload()

  return (
    <PagePadding>
      <h1>Please enter the Artizen Frontend Preview password.</h1>
      <Form {...{ schema, uischema, initialState, data, setData, localStorageKey }} />
      <Button onClick={() => submit()} level={1}>
        Submit
      </Button>
    </PagePadding>
  )
}
