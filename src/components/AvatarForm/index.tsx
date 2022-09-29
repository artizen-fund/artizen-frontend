import { useEffect } from 'react'
import styled from 'styled-components'
import { Button, Glyph } from '@components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'

const AvatarForm = () => {
  return (
    <Wrapper>
      <DropZone>
        <Glyph glyph="face" />
      </DropZone>
      <Buttons>
        <Button level={2} onClick={() => alert('derp')}>
          Take photo
        </Button>
        <Button level={2} onClick={() => alert('derp')} outline>
          Upload photo
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: avatarForm;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  gap: 20px;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 100px;
    height: 100px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 120px;
    height: 120px;
  }
  border: 2px dashed black;
  border-radius: 9999px;
`

export default AvatarForm
