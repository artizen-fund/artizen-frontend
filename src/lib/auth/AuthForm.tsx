import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Button, PagePadding } from '@components'
import { schema, uischema, initialState, FormState } from './form'

export const AuthForm = () => {
  const router = useRouter()

  const [data, setData] = useState<FormState>(initialState)

  const submit = () => router.reload()

  return (
    <PagePadding>
      <h1>Please enter the Artizen Frontend Preview password.</h1>
      <Form {...{ schema, uischema, initialState, data, setData }} />
      <Button onClick={() => submit()} level={1}>
        Submit
      </Button>
    </PagePadding>
  )
}
