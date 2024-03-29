import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { useRouter } from 'next/router'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useQuery, useMutation } from '@apollo/client'
import { InputWrapper } from '../../../components/Form/Controls/_Common'
import { GET_SPONSORS, INSERT_SPONSOR_IN_MATCH } from '@gql'
import { IGetSponsorsQuery, ISponsorFragment, Maybe } from '@types'
import { DropDownBlocks } from './lib/DropDownBlocks'
import { startCase } from 'lodash'

const AddSponsorToMatchFund = () => {
  const { modalAttrs, toggleModal } = useContext(LayoutContext)
  const { push, reload } = useRouter()
  const [sponsorSelected, setSponsorSelection] = useState<ISponsorFragment | null>(null)
  // const [showNonUsers, setShowNonUsers] = useState<boolean>(false)
  const [insertSponsorToMatch] = useMutation(INSERT_SPONSOR_IN_MATCH)
  const {
    loading,
    data: loadedSponsors,
    error,
  } = useQuery<IGetSponsorsQuery>(GET_SPONSORS, {
    fetchPolicy: 'no-cache',
  })

  const [searchData, setSearchDataData] = useState<string>('')

  const { matchFund } = modalAttrs

  const sponsors =
    !loading && loadedSponsors !== undefined && loadedSponsors?.Sponsors.length > 0
      ? loadedSponsors?.Sponsors.filter(
          sponsor =>
            sponsor.sponsorInMatchFunds.filter(sponsorInMatchFund => sponsorInMatchFund.matchFundId === matchFund.id)
              .length === 0,
        )
      : null

  const createNewUserCallBack = () => {
    toggleModal()
    push('/admin/sponsors')
  }

  const addSponsorToMatchFund = async (sponsorSelected: ISponsorFragment) => {
    const data = await insertSponsorToMatch({
      onError: error => console.error('INSERT_SPONSOR_IN_MATCH error ', error),
      variables: {
        objects: [
          {
            matchFundId: matchFund.id,
            sponsorId: sponsorSelected.id,
            contribution: sponsorSelected.participation,
          },
        ],
      },
    })

    if (data) {
      toggleModal()
      reload()
    }
  }

  return (
    <Wrapper>
      <Headline>Sponsors</Headline>
      <Subtitle>Select a sponsor to be added to {startCase(matchFund.name)}:</Subtitle>
      {loading && <div style={{ margin: '16px 0' }}>Loading...</div>}
      {!sponsors ||
        (sponsors.length === 0 && (
          <div style={{ margin: '16px 0' }}>
            There is not available sponsors, or all the sponsors are already added to this Match Fund
          </div>
        ))}
      {sponsors && sponsors.length > 0 && (
        <SchoolItems>
          <DropDownBlocks<ISponsorFragment>
            itemSelected={sponsorSelected}
            setItemSelected={setSponsorSelection}
            items={sponsors}
            align="left"
            structure={[
              {
                renderer: (item: ISponsorFragment) => <AvatarImage profileImage={item.logotype}></AvatarImage>,
                classNames: 'doubleHeight',
              },
              {
                renderer: (item: ISponsorFragment) => <ItemText>{item.name}</ItemText>,
              },
            ]}
          ></DropDownBlocks>
        </SchoolItems>
      )}

      <Menu>
        {!sponsorSelected && (
          <Button level={2} outline onClick={() => createNewUserCallBack()}>
            Create New Sponsor
          </Button>
        )}
        {sponsorSelected && (
          <>
            <Button level={2} onClick={() => addSponsorToMatchFund(sponsorSelected)}>
              Add Sponsor
            </Button>
          </>
        )}
      </Menu>
    </Wrapper>
  )
}

const NonUser = styled.span`
  ${typography.body.l3}
  @media (prefers-color-scheme: light) {
    color: ${rgba(palette.black)};
  }
  text-transform: italic;
`

const InputSearchWrapper = styled(props => <InputWrapper {...props} />)`
  // width: 500px;
  margin: 1rem 0;
`

const AvatarImage = styled.div<{ profileImage?: Maybe<string> }>`
  width: 64px;
  height: 64px;
  background-image: url(${props => props.profileImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${rgba(palette.white, 0.2)};
`

const SchoolItems = styled.div`
  margin: 0.3rem 0 1rem 0;
  flex-direction: column;
  overflow: auto;
  height: 100px;
`

const Menu = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
`

const Wrapper = styled.div`
  max-width: calc(100vw - 20px);
  padding: 20px;
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
  width: calc(100vw - 320px);
`

const Headline = styled.h1`
  margin: 1rem 0;
  ${typography.title.l3}
`

const ItemText = styled.h3`
  ${typography.body.l3}
`

const Subtitle = styled.h2`
  ${typography.title.l4}
`

export default AddSponsorToMatchFund
