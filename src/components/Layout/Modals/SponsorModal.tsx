import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { CREATE_SPONSOR } from '@gql'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, CloseButton, Icon, Form } from '@components'
import { rgba, LayoutContext } from '@lib'
import { schema, uischema, FormState, initialState } from '@forms/createSponsor'
import { palette, breakpoint, typography } from '@theme'
import { sharing } from '@copy/common'

const SponsorModal = () => {
  const { reload } = useRouter()
  const { toggleModal, modalAttrs } = useContext(LayoutContext)
  const { error } = modalAttrs as any
  const [tempValue, setTempValue] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)

  const [createSponsor] = useMutation(CREATE_SPONSOR, {
    onError: error => console.error('CREATE_SPONSOR error ', error),
  })

  function addData(data: FormState) {
    setTempValue(data)
  }

  const saveNewSponsor = async () => {
    console.log('saveNewSponsor', tempValue)

    const { data } = await createSponsor({
      variables: {
        objects: [tempValue],
      },
    })

    if (data) {
      reload()
    }

    console.log('data   ', data)
  }

  return (
    <Wrapper>
      <Tile>{error}</Tile>
      <CloseButton onClick={() => toggleModal()} />
      <WrapperForm>
        <Form data={tempValue} setData={addData} {...{ schema, uischema }} readonly={processing}>
          <Button onClick={saveNewSponsor} stretch level={0}>
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </WrapperForm>
    </Wrapper>
  )
}

const WrapperForm = styled.div`
  display: grid;
  gap: 10px;
  // grid-template-areas:
  //   'title logline'
  //   'impactTags walletAddress'
  //   'info1 info1'
  //   'info2 info2'
  //   'info3 info3'
  //   'info4 info4'
  //   'artworkArtifact videoArtifact';

  // @media only screen and (min-width: ${breakpoint.desktop}px) {
  //   gap: 16px;
  // }

  // .vertical-layout,
  // .vertical-layout-item {
  //   display: contents;
  // }

  // *[id='#/properties/name'] {
  //   grid-area: name;
  // }

  // *[id='#/properties/url'] {
  //   grid-area: url;
  // }

  // *[id='#/properties/logotype'] {
  //   grid-area: logotype;
  // }

  // *[id='#/properties/number'] {
  //   grid-area: number;
  // }
`

const Tile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;

  ${typography.title.l4}
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 30px;
  padding: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    width: 416px;
    padding: 30px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 568px;
    padding: 40px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 680px;
  }

  color: ${rgba(palette.night)};
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
    background-color: ${rgba(palette.slate)};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Header = styled.header`
  ${typography.title.l3}
`

const Subheader = styled.p`
  ${typography.body.l2}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 45px;
`

const Buttons = styled(props => <Row {...props} />)`
  gap: 10px;
`

export default SponsorModal
