import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
// import { uploadToCloudinary } from '@lib'

export interface UploadFileProps {
  onChange?: (fileUrl: string) => void
  disabled: boolean
  required?: boolean
  path: string
  placeholder: string | undefined
  value: string
  className: string
}

const UploadFileControl = ({ required, placeholder, onChange, path, value, className, disabled }: UploadFileProps) => {
  const [tempImg, settempImg] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>()

  // create a preview as a side effect, whenever selected file is changed
  // preventing memory leaks with createObjectURL
  useEffect(() => {
    if (!selectedFile) {
      settempImg('')
      return
    }

    const objectUrl: string = URL.createObjectURL(selectedFile)

    settempImg(objectUrl)

    onChange && onChange(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const isThereImg = value !== undefined || tempImg !== ''

  return (
    <UploadWrapper>
      {!isThereImg && (
        <>
          <input
            disabled={disabled}
            {...{ required }}
            defaultValue={value}
            type="file"
            placeholder={placeholder}
            accept=".jpg, .png, .jpeg, .gif"
            onChange={event => {
              event.preventDefault()
              const file: File | null =
                event.target.files && event.target.files.length > 0 ? event.target.files[0] : null

              if (!file) {
                return
              }

              setSelectedFile(file)
            }}
            style={{ display: 'none' }}
            id={path}
            className={className}
          />
          <label htmlFor={path}>Upload</label>
        </>
      )}
      {isThereImg && (
        <ImageWrapper>
          <Image width={300} height={300} src={tempImg} alt="preview" />
        </ImageWrapper>
      )}
    </UploadWrapper>
  )
}

const ImageWrapper = styled.div`
  width: 100%
  text-align: center;
  background-color: #fff;
  padding: 20px;

  appearance: none;
  outline: none;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  
`

const UploadWrapper = styled.div`
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-radius: 0px;

  label {
    height: 200px;
    display: block;
    background-color: #fff;
  }
`

export default UploadFileControl
