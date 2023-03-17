import { useState, useRef, cloneElement } from 'react'
import flattenChildren from 'react-keyed-flatten-children'
import styled from 'styled-components'

/* USAGE
This component provides a simple `<input type='file' />` component,
  will store a file in a supplied state setter,
  and optionally feed child components a "preview" prop of the file.
  
This preview is a dataURL which will resolve to an image (if that
  is indeed what was uploaded), but could also be used to detect
  undefined state for a different file type.

const SomeForm = () => {  
  const [file, setFile] = React.useState<File>()
  const id = 'SOME_UNIQUE_STRING'
  const submit = () => uploadPayload({...data, imageFile})
  return (
    <div>
      <InvisiFileInput setFile={setImageFile} {...{ id }} >
        <Message />
        <Preview />
      </InvisiFileInput>
      <label htmlFor={id} >click to upload a file</label>
      <input type="submit" onClick={() => submit()} value="upload" />
    </div>
  )
}

const Preview = styled.div<{ preview?: string }>`
  background-image: url(${props => props.preview});
`

const Message = ({ preview?: string }) => 
  !preview 
    ? <p>waiting for file</p> 
    : <p>file is ready</p>
    

FUTURE ENHANCEMENTS: 
- would be nice to have the ability to provide an external ref
*/

interface IInvisiFileInput {
  setFile: (f: File) => void
  id?: string
  children?: React.ReactElement | Array<React.ReactElement>
  initialState?: string
}

const InvisiFileInput = ({ setFile, children, initialState, ...props }: IInvisiFileInput) => {
  console.log('initialState   ', initialState)
  const [preview, setPreview] = useState<string | undefined>(initialState)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFile = e.target.files?.[0]
    if (!pickedFile) return
    setFile(pickedFile)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader?.result as string)
    reader.readAsDataURL(pickedFile)
  }

  const ref = useRef<HTMLInputElement>(null)

  return (
    <>
      <Input type="file" {...{ onChange, ref }} {...props} />
      {flattenChildren(children).map(child =>
        cloneElement(child as React.ReactElement, {
          preview,
          onClick: () => ref.current?.click(),
        }),
      )}
    </>
  )
}

const Input = styled.input`
  position: absolute !important;
  z-index: 1;
  top: 0;
  left: 0;
  appearance: none;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

export { InvisiFileInput }
