import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

const ProfileCard = () => {
  return (
    <Wrapper>
      <AvatarImage />
      <Name>Herp Derp</Name>
      <Username>@herpderp</Username>
      <Biography>Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</Biography>
      <Button onClick={() => alert('TODO: share!')} stretch level={1}>
        Share +
      </Button>
      <SocialLinks>twitter, discord, iDunno</SocialLinks>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 32px;
  background: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
`

const AvatarImage = styled.div``

const Name = styled.h1``

const Username = styled.h2``

const Biography = styled.p``

const SocialLinks = styled.ul``

export default ProfileCard
