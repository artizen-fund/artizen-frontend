import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { useRouter } from 'next/router'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { InputWrapper } from '../../../components/Form/Controls/_Common'
import { GET_SPONSORS, INSERT_SPONSOR_IN_MATCH } from '@gql'
import { IGetSponsorsQuery, ISponsorFragment, Maybe } from '@types'
import { DropDownBlocks } from './lib/DropDownBlocks'
import { capitalCase } from 'capital-case'

const AddSponsorToMatchFund = () => {
  const { modalAttrs, toggleModal } = useContext(LayoutContext)
  const { push } = useRouter()
  const [sponsorSelected, setSponsorSelection] = useState<ISponsorFragment | null>(null)
  const [showNonUsers, setShowNonUsers] = useState<boolean>(false)
  const [insertSponsorToMatch] = useMutation(INSERT_SPONSOR_IN_MATCH)
  const [loadSponsors, { loading, data: loadedSponsors, error }] = useLazyQuery<IGetSponsorsQuery>(GET_SPONSORS, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ Sponsors }) => {
      console.log('loaded Sponsors  ', Sponsors)
      if (Sponsors.length === 0) {
        setSponsorSelection(null)
        setShowNonUsers(true)
      } else {
        setShowNonUsers(false)
      }
    },
  })

  console.log('error  ', error)

  const [searchData, setSearchDataData] = useState<string>('')

  const { matchFund } = modalAttrs

  const sponsors =
    !loading && loadedSponsors !== undefined && loadedSponsors?.Sponsors.length > 0 ? loadedSponsors?.Sponsors : null

  const createNewUserCallBack = () => {
    toggleModal()
    push('/admin/sponsors')
  }

  const addSponsorToMatchFund = async (sponsorSelected: ISponsorFragment) => {
    console.log('sponsorSelected  ', sponsorSelected)
    console.log('matchFund  ', matchFund)
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

    console.log('data   ', data)
    toggleModal()
  }

  const searchSponsors = (value: string) => {
    console.log('value  ', value)
    setSearchDataData(value)
    loadSponsors({
      variables: {
        where: {
          name: { _eq: value },
        },
      },
    })
  }

  return (
    <Wrapper>
      <Headline>Sponsors</Headline>
      <Subtitle>Search sponsors to add to {capitalCase(matchFund.name)}:</Subtitle>
      <InputSearchWrapper>
        <input
          placeholder={'Search sponsors by name'}
          value={searchData}
          onBlur={e => e.target.value === '' && !loading && setShowNonUsers(false)}
          onChange={e => searchSponsors(e.target.value)}
        />
      </InputSearchWrapper>
      {showNonUsers && <NonUser>...sponsor does not exists</NonUser>}
      {sponsors && (
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
