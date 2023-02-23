import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Spinner, Glyph } from '@components'
import { InvisiFileInput, useCloudinary, fileType, rgba, LayoutContext, sleep } from '@lib'
import { StringControlProps } from '../StringControl'
import { breakpoint, palette } from '@theme'

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

  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const { upload, uploading } = useCloudinary()
  const uploadFile = async (newFile: File) => {
    if (!uischema?.options?.fileFormats.find((supportedFormat: string) => supportedFormat === newFile.type)) {
      alert('illegal file type')
      return
    }
    const cloudinaryResponse = await upload(newFile)
    if (!cloudinaryResponse) {
      console.error('Error uploading to Cloudinary')
    }
    const cloudinaryUrl = cloudinaryResponse?.secure_url
    handleChange!(path, cloudinaryUrl)
  }

  const showModal = () => {
    setVisibleModalWithAttrs(
      'media',
      fileType(selectedFile) === 'image'
        ? {
            imageFile: data,
          }
        : {
            videoFile: data,
          },
    )
  }

  useEffect(() => {
    if (!selectedFile || !data) return
    showModal()
  }, [selectedFile, data])

  return (
    <>
      <InvisiFileInput setFile={setSelectedFile}>
        <input
          {...{ required, onBlur }}
          disabled={true}
          type="string"
          placeholder={uischema?.options?.placeholder || ' '}
          value={!!data ? 'uploaded' : ''}
          onChange={() => {
            /* do nothing (required to keep this a controlled input) */
          }}
        />
      </InvisiFileInput>
      <PreviewWrapper visible={!!selectedFile && !!data} {...{ uploading }} filled={!!data} onClick={() => showModal()}>
        {uploading && <StyledSpinner darkBackground />}
        {fileType(selectedFile) === 'image' && !!data && <PreviewImage src={data} />}
        {fileType(selectedFile) === 'video' && !!data && !!selectedFile && (
          <video loop={true} autoPlay={true} controls={false} muted={true}>
            <source src={data} type={selectedFile.type} />
          </video>
        )}
        <GlyphWrapper visible={!!selectedFile && !!data}>
          <Glyph glyph="expand" size={12} />
        </GlyphWrapper>
      </PreviewWrapper>
    </>
  )
}

const GlyphWrapper = styled.div<{ visible: boolean }>`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  z-index: 102;
  bottom: 5px;
  right: 5px;
  filter: drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4));
`

const StyledSpinner = styled(props => <Spinner {...props} />)`
  position: absolute;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const PreviewWrapper = styled.div<{ visible: boolean; uploading: boolean; filled: boolean }>`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  display: ${props => (props.visible || props.uploading ? 'block' : 'none')};
  height: 56px;
  min-width: 56px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 64px;
    min-width: 64px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 72px;
    min-width: 72px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  background-color: ${rgba(palette.moon)};

  appearance: none;
  outline: none;

  align-items: center;
  border: 1px solid ${props => rgba(props.filled ? palette.night : palette.stone)};
  background-image: ${props =>
    !props.uploading && props.filled ? 'none' : 'url(/assets/glyphs/download/20/solid.svg)'};
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  video {
    max-height: 100%;
  }
  pointer-events: ${props => (props.filled ? 'all' : 'none')};
`

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
`

export default UploadFileControl
