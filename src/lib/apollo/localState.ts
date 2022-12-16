import { makeVar } from '@apollo/client'
import { IUsers } from '@types'

export const loggedInUserVar = makeVar<Partial<IUsers> | undefined>(undefined)

/*
note: to protect a page…
```
  const { status } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status])
```
It is advisable to show a <Spinner /> or some sort of interim state for the page.
*/
