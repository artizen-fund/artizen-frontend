import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { rgba, LayoutContext, assert } from '@lib'
import { StringControlProps } from '../StringControl'
import { breakpoint, palette } from '@theme'
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

interface UploadCloudinaryControlProps {
  onBlur: () => void
  disabled: boolean
  placeholder: string
  className: string
  path: string
}

const UploadCloudinaryFileControl = ({
  enabled,
  processing,
  required,
  uischema,
  data,
  handleChange,
  path,
  onBlur,
  ...props
}: Partial<StringControlProps> & UploadCloudinaryControlProps) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const showModal = () => {
    setVisibleModalWithAttrs('media', {
      videoFile: data,
    })
  }

  useEffect(() => {
    if (!data) return
    showModal()
  }, [data])

  const uploadPreset = assert(
    process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET,
    'NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET',
  )
  const cloudName = assert(process.env.NEXT_PUBLIC_CLOUDINARY_NAME, 'NEXT_PUBLIC_CLOUDINARY_NAME')
  console.log('CLOUDINARY_NAME   ', cloudName)

  const onSuccess = ({ event, info }: { event: string; info: any }) => {
    if (event !== 'success') return
    const cloudinaryUrl = info?.secure_url
    if (!uischema?.options?.extensions.find((supportedFormat: string) => supportedFormat === info.format)) {
      alert('illegal file type')
      return
    }
    handleChange!(path, cloudinaryUrl)
  }

  return (
    <>
      <WidgetLoader />
      <CloudinaryButtonWrapper visible={!data}>
        <Widget sources={['local']} {...{ cloudName, uploadPreset, onSuccess }} />
      </CloudinaryButtonWrapper>
      <input
        {...{ required, onBlur }}
        disabled={true}
        type="string"
        style={{ backgroundColor: 'white' }}
        placeholder={uischema?.options?.placeholder || ' '}
        value={!!data ? 'uploaded' : ''}
        onChange={() => {
          /* do nothing (required to keep this a controlled input) */
        }}
      />
      <PreviewWrapper visible={!!data} filled={!!data} onClick={() => showModal()}>
        {!!data && (
          <video loop={true} autoPlay={true} controls={false} muted={true}>
            <source src={data} />
          </video>
        )}
      </PreviewWrapper>
    </>
  )
}

const CloudinaryButtonWrapper = styled.div<{ visible: boolean }>`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  button {
    width: 100% !important;
    height: 100% !important;
    opacity: 0;
    cursor: pointer;
  }
`

const PreviewWrapper = styled.div<{ visible: boolean; filled: boolean }>`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  display: ${props => (props.visible ? 'block' : 'none')};
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
  background-image: ${props => (props.filled ? 'none' : 'url(/assets/glyphs/download/20/solid.svg)')};
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  video {
    max-height: 100%;
  }
  pointer-events: ${props => (props.filled ? 'all' : 'none')};
`

export default UploadCloudinaryFileControl
