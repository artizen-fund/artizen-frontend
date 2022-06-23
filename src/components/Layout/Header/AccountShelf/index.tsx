import styled from 'styled-components'
import { Button } from '@components'
import { breakpoint } from '@theme'
import { useSession } from '@lib'

interface IAccountShelf {
  user: ArtizenUser
}

const AccountShelf = ({ user }: IAccountShelf) => {
  const { endSession } = useSession()
  return (
    <Wrapper>
      <div>
        <h1>Congrats on being logged in, buckaroo.</h1>
        <p>{user.email}</p>
        <p>{user.id}</p>
      </div>
      <Button onClick={() => endSession()}>Log out</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

export default AccountShelf
