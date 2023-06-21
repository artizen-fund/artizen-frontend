import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { UPDATE_SEASONS } from '@gql'
import { Button, CloseButton, Icon, Form } from '@components'
import { rgba, LayoutContext } from '@lib'
import { schema, uischema, FormState, initialState } from '@forms/createMatchFund'
import { palette, breakpoint, typography } from '@theme'

const UpdateMatchFundsSeasonAmount = () => {
  const { reload } = useRouter()
  const { toggleModal, modalAttrs } = useContext(LayoutContext)
  const { season } = modalAttrs as any
  const [tempValue, setTempValue] = useState<number>(season.matchFundPooled)
  const [processing, setProcessing] = useState(false)

  const [updateSeasons, { loading }] = useMutation(UPDATE_SEASONS, {
    onError: error => console.error('UPDATE_SEASONS error ', error),
  })

  const saveNewMatchFund = async (newMatchFund: number) => {
    console.log('saveNewSponsor', tempValue)

    console.log('season', season)

    const { data } = await updateSeasons({
      variables: {
        // objects: [
        //   {
        //     matchFundPooled: tempValue,
        //   },
        // ],
        where: {
          id: {
            _eq: season.id,
          },
        },
        _set: {
          matchFundPooled: tempValue,
        },
      },
    })

    if (data) {
      toggleModal()
      reload()
    }
  }

  return (
    <Wrapper>
      <Headline>Update Match Fund Amount In Season</Headline>
      <Subtitle>
        This amount is used to estimate the match funds allowcate to the projects on competition during this season
      </Subtitle>
      <CloseButton onClick={() => toggleModal()} />
      <Input
        type="number"
        onChange={e => {
          setTempValue(Number(e.target.value))
        }}
        value={tempValue}
      />
      <Button onClick={() => saveNewMatchFund(tempValue)}>{loading ? 'Updating' : 'Update'}</Button>
    </Wrapper>
  )
}

const Headline = styled.h1`
  ${typography.title.l3}
`

const Subtitle = styled.h2`
  ${typography.label.l1}
`

const Input = styled.input`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${typography.title.l4}
  @media (prefers-color-scheme: dark) {
    color: white;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }

  border: 1px solid ${rgba(palette.barracuda)};
`

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

export default UpdateMatchFundsSeasonAmount
