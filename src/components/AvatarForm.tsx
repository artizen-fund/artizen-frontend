import styled from 'styled-components'
import { Button, Glyph } from '@components'
import { InvisiFileInput, rgba } from '@lib'
import { breakpoint, palette } from '@theme'

interface IAvatarForm {
  setFile: (input: File) => void
  initialState?: string
}

const AvatarForm = ({ setFile, initialState }: IAvatarForm) => {
  const IMAGE_UPLOAD_BUTTON_ID = 'avatarUploadImage'
  return (
    <Wrapper>
      <InvisiFileInput id={IMAGE_UPLOAD_BUTTON_ID} {...{ setFile, initialState }}>
        <DropZone>
          <Glyph glyph="face" />
        </DropZone>
      </InvisiFileInput>
      <Buttons>
        {/*
        <Button level={2} onClick={() => alert('derp')}>
          Take photo
        </Button>
        */}
        <Button level={2} htmlFor={IMAGE_UPLOAD_BUTTON_ID} outline>
          Upload photo
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
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

const DropZone = styled.div<{ preview?: string }>`
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
  ${props =>
    props.preview &&
    `
    background-image: url(${props.preview});
    background-size: cover;
    background-position: center center;
    > * {
      display: none;
    }
  `}
  border: 2px dashed black;
  @media (prefers-color-scheme: dark) {
    border: 2px dashed ${rgba(palette.moon)};
  }
  border-radius: 9999px;
  transition: border-color 0.2s ease-in-out;
`

export default AvatarForm
