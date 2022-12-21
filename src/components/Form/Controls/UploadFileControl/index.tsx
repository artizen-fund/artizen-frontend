import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { InvisiFileInput, uploadToCloudinary, fileType } from '@lib'
import { StringControlProps } from '../StringControl'
import { breakpoint } from '@theme'

interface UploadFileControlProps {
  onBlur: () => void
  disabled: boolean
  placeholder: string
  className: string
  path: string
}

const UploadFileControl = ({
  enabled,
  processing,
  required,
  uischema,
  data,
  handleChange,
  path,
  onBlur,
  ...props
}: Partial<StringControlProps> & UploadFileControlProps) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  useEffect(() => {
    if (!selectedFile) return
    uploadFile(selectedFile)
  }, [selectedFile])

  const uploadFile = async (newFile: File) => {
    if (!uischema?.options?.fileFormats.find((supportedFormat: string) => supportedFormat === newFile.type)) {
      console.error('illegal file type')
      return
    }
    try {
      const cloudinaryResponse = await uploadToCloudinary(newFile)
      const cloudinaryUrl = cloudinaryResponse.secure_url
      handleChange!(path, cloudinaryUrl)
    } catch (error) {
      console.error('error uploading to cloudinary', error)
    }
  }

  return (
    <InvisiFileInput setFile={setSelectedFile}>
      <input
        {...{ required, onBlur }}
        disabled={!enabled || processing}
        type="string"
        placeholder={uischema?.options?.placeholder || ' '}
        defaultValue={data}
        value={data}
      />
      <PreviewWrapper visible={!!selectedFile && !!data}>
        {fileType(selectedFile) === 'image' && !!data && <PreviewImage src={data} />}
        {fileType(selectedFile) === 'video' && !!data && (
          <video loop={true} autoPlay={true} controls={false} muted={true}>
            <source src={data} type="video/mp4" />
          </video>
        )}
      </PreviewWrapper>
    </InvisiFileInput>
  )
}

const PreviewWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  display: ${props => (props.visible ? 'block' : 'none')};
  height: 56px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 64px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 72px;
  }
  text-align: center;
  background-color: #fff;

  appearance: none;
  outline: none;

  align-items: center;
  border: 1px solid black;
`

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
`

export default UploadFileControl
