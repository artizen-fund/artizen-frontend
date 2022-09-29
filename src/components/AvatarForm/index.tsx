import { useRef, useState } from 'react'
import styled from 'styled-components'
import { Button, Glyph } from '@components'
import { rgba, assert } from '@lib'
import { palette, breakpoint } from '@theme'

interface IAvatarForm {
  setFile: (input: File) => void
}

const AvatarForm = ({ setFile }: IAvatarForm) => {
  const fileref = useRef<HTMLInputElement>()
  const [preview, setPreview] = useState<string>()

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFile = e.target.files?.[0]
    if (!pickedFile) return
    setFile(pickedFile)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader?.result as string)
    reader.readAsDataURL(pickedFile)
  }

  return (
    <Wrapper>
      <DropZone {...{ preview }}>{!preview && <Glyph glyph="face" />}</DropZone>
      <Buttons>
        {/*
        <Button level={2} onClick={() => alert('derp')}>
          Take photo
        </Button>
        */}
        <Button level={2} htmlFor="avatarUploadInput" outline>
          Upload photo
          <FileInput type="file" onChange={pickFile} {...{ fileref }} id="avatarUploadInput" />
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const FileInput = styled.input`
  appearance: none;
  width: 1px;
  height: 1px;
  opacity: 0;
`

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
  `}
  border: 2px dashed black;
  border-radius: 9999px;
  transition: border-color 0.2s ease-in-out;
`

export default AvatarForm
