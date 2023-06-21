import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { InputWrapper } from '../../Form/Controls/_Common'
import { INSERT_SPONSOR_IN_MATCH, LOAD_SUBMISSIONS } from '@gql'
import { IGetSponsorsQuery, ISubmissionFragment, Maybe } from '@types'
import { DropDownBlocks } from './lib/DropDownBlocks'
import { capitalCase } from 'capital-case'

const AddProjectsToMatchFund = () => {
  const { modalAttrs, toggleModal } = useContext(LayoutContext)
  const [sponsorSelected, setSponsorSelection] = useState<ISubmissionFragment | null>(null)
  const [showNonUsers, setShowNonUsers] = useState<boolean>(false)
  const [insertSponsorToMatch] = useMutation(INSERT_SPONSOR_IN_MATCH)
  const [loadSubmissions, { loading, data: loadedSubmissions, error }] = useLazyQuery(LOAD_SUBMISSIONS, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ Submissions }) => {
      console.log('loaded loadSubmissions  ', Submissions)
      if (Submissions.length === 0) {
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

  console.log('loadedSponsors  ', loadedSubmissions)

  const submissions =
    !loading && loadedSubmissions !== undefined && loadedSubmissions?.Submissions.length > 0
      ? loadedSubmissions?.Submissions
      : null

  const createNewUserCallBack = () => {
    toggleModal()
  }

  console.log('submissions  ', submissions)

  // const addSponsorToMatchFund = async (sponsorSelected: ISponsorFragment) => {
  //   console.log('sponsorSelected  ', sponsorSelected)
  //   console.log('matchFund  ', matchFund)
  //   const data = await insertSponsorToMatch({
  //     onError: error => console.error('INSERT_SPONSOR_IN_MATCH error ', error),
  //     variables: {
  //       objects: [
  //         {
  //           matchFundId: matchFund.id,
  //           sponsorId: sponsorSelected.id,
  //           contribution: sponsorSelected.participation,
  //         },
  //       ],
  //     },
  //   })

  //   console.log('data   ', data)
  //   toggleModal()
  // }

  const searchSponsors = (value: string) => {
    console.log('value  ', value)
    setSearchDataData(value)
    loadSubmissions({
      variables: {
        where: {
          project: {
            title: {
              _eq: value,
            },
          },
        },
      },
    })
  }

  return (
    <Wrapper>
      <Headline>Project Submissions</Headline>
      <Subtitle>Search project submission to add to {capitalCase(matchFund.name)}:</Subtitle>
      <InputSearchWrapper>
        <input
          placeholder={'Search project by name'}
          value={searchData}
          onBlur={e => e.target.value === '' && !loading && setShowNonUsers(false)}
          onChange={e => searchSponsors(e.target.value)}
        />
      </InputSearchWrapper>
      {showNonUsers && <NonUser>...project does not exists or has not be submitted to season</NonUser>}
      {submissions && (
        <SchoolItems>
          <DropDownBlocks<ISubmissionFragment>
            itemSelected={sponsorSelected}
            setItemSelected={setSponsorSelection}
            items={submissions}
            align="left"
            structure={[
              {
                renderer: (item: ISubmissionFragment) => (
                  <AvatarImage profileImage={item.project?.artifacts[0].artwork}></AvatarImage>
                ),
                classNames: 'doubleHeight',
              },
              {
                renderer: (item: ISubmissionFragment) => <ItemText>{item.project?.title}</ItemText>,
              },
            ]}
          ></DropDownBlocks>
        </SchoolItems>
      )}

      <Menu>
        {/* {!sponsorSelected && (
          <Button level={2} outline onClick={() => createNewUserCallBack()}>
            Create New Sponsor
          </Button>
        )} */}
        {sponsorSelected && (
          <>
            <Button stretch level={2} onClick={() => {}}>
              Add Project Submission
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

const ItemText = styled.h3`
  ${typography.body.l3}
`

const Headline = styled.h1`
  margin: 1rem 0;
  ${typography.title.l3}
`

const Subtitle = styled.h2`
  ${typography.title.l4}
`

export default AddProjectsToMatchFund
