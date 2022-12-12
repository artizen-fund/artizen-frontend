import { useGrant } from '@lib'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../Button'

export const Grants = () => {
  const [grantId, setGrantId] = useState(0)
  const { publish, endGrant, cancelGrant } = useGrant()

  return (
    <>
      <Container>
        <label>
          Grant ID:
          <input
            type="text"
            value={grantId}
            onChange={event => setGrantId(Number(event.target.value))}
            style={{ backgroundColor: '#FFFFFF' }}
          />
        </label>

        <Button onClick={() => endGrant(grantId)}>End Grant</Button>
        <Button onClick={() => cancelGrant(grantId)}>Cancel Grant</Button>
      </Container>
      {/* <Button onClick={() => publish('')}>Publish</Button> */}
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

export default Grants
