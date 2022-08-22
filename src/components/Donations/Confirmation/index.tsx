import styled from 'styled-components'
import { Icon } from '@components'
import { DonationContext, rgba } from '@lib'
import { palette } from '@theme'
import { useContext, useEffect } from 'react'

const Confirmation = () => {
  const { setDonationStatus } = useContext(DonationContext)

  useEffect(() => {
    setDonationStatus?.('completed')
  }, [])

  return (
    <Wrapper>
      <h1>hey good job</h1>
      <Icon glyph="face" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px dashed ${rgba(palette.uiAlert)};
`

export default Confirmation
