import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { CREATE_MATCH_FUNDS } from '@gql'
import { Button, CloseButton, Icon, Form } from '@components'
import { rgba, LayoutContext } from '@lib'
import { schema, uischema, FormState, initialState } from '@forms/createMatchFund'
import { palette, breakpoint, typography } from '@theme'

const MatchFundsModal = () => {
  const { reload } = useRouter()
  const { toggleModal, modalAttrs } = useContext(LayoutContext)
  const { error } = modalAttrs as any
  const [tempValue, setTempValue] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)

  const [createMatchFund] = useMutation(CREATE_MATCH_FUNDS, {
    onError: error => console.error('CREATE_MATCH_FUNDS error ', error),
  })

  function addData(data: FormState) {
    setTempValue(data)
  }

  const saveNewMatchFund = async () => {
    const { data } = await createMatchFund({
      variables: {
        objects: [tempValue],
      },
    })

    if (data) {
      reload()
    }
  }

  return (
    <Wrapper>
      <Tile>{error}</Tile>
      <CloseButton onClick={() => toggleModal()} />
      <WrapperForm>
        <Form data={tempValue} setData={addData} {...{ schema, uischema }} readonly={processing}>
          <Button onClick={saveNewMatchFund} stretch level={0}>
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </WrapperForm>
    </Wrapper>
  )
}

const WrapperForm = styled.div`
  gap: 10px;
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
  gap: 30px;
  padding: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    width: 416px;
    padding: 30px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 768px;
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

export default MatchFundsModal
