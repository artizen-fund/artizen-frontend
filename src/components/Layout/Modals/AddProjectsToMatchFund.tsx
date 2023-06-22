import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { InputWrapper } from '../../Form/Controls/_Common'
import { INSERT_SUBMISSION_IN_MATCH_FUND, GET_MATCH_FUNDS } from '@gql'
import { IGetSponsorsQuery, ISubmissionFragment, Maybe, IMatchFundFragment } from '@types'
import { DropDownBlocks } from './lib/DropDownBlocks'
import { capitalCase } from 'capital-case'

const AddProjectsToMatchFund = () => {
  const { reload } = useRouter()
  const { modalAttrs, toggleModal } = useContext(LayoutContext)
  const [sponsorSelected, setSponsorSelection] = useState<IMatchFundFragment | null>(null)
  const [showNonUsers, setShowNonUsers] = useState<boolean>(false)
  const [insertSubmissionInMatchFund] = useMutation(INSERT_SUBMISSION_IN_MATCH_FUND)
  const { projectSubmission } = modalAttrs
  const [loadMatchFund, { loading, data: loadedMatchFund, error }] = useLazyQuery(GET_MATCH_FUNDS, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ MatchFunds }) => {
      console.log('loaded loadSubmissions  ', MatchFunds)
      if (MatchFunds.length === 0) {
        setSponsorSelection(null)
        setShowNonUsers(true)
      } else {
        setShowNonUsers(false)
      }
    },
  })

  console.log('error  ', error)

  const [searchData, setSearchDataData] = useState<string>('')

  console.log('loadedSponsors  ', loadedMatchFund)

  const matchFund =
    !loading && loadedMatchFund !== undefined && loadedMatchFund?.MatchFunds.length > 0
      ? loadedMatchFund?.MatchFunds
      : null

  const createNewUserCallBack = () => {
    toggleModal()
  }

  // console.log('submissions  ', submissions)

  const addSponsorToMatchFund = async (matchFundSelected: IMatchFundFragment) => {
    console.log('sponsorSelected  ', sponsorSelected)
    console.log('matchFund  ', matchFund)
    const data = await insertSubmissionInMatchFund({
      onError: error => console.error('INSERT_SPONSOR_IN_MATCH error ', error),
      variables: {
        objects: [
          {
            matchFundId: matchFundSelected.id,
            submissionId: projectSubmission.id,
          },
        ],
      },
    })

    console.log('data   ', data)
    if (data) {
      toggleModal()
      reload()
    }
  }

  const searchSponsors = (value: string) => {
    console.log('value  ', value)
    setSearchDataData(value)
    loadMatchFund({
      variables: {
        where: {
          name: {
            _eq: value,
          },
        },
      },
    })
  }

  console.log('projectSubmission  ', projectSubmission)

  return (
    <Wrapper>
      <Headline>Add project submission to match fund</Headline>
      <Subtitle>Add match funds name to add {capitalCase(projectSubmission.project.title)}:</Subtitle>
      <InputSearchWrapper>
        <input
          placeholder={'Search match funds by name'}
          value={searchData}
          onBlur={e => e.target.value === '' && !loading && setShowNonUsers(false)}
          onChange={e => searchSponsors(e.target.value)}
        />
      </InputSearchWrapper>
      {showNonUsers && <NonUser>...project does not exists or has not be submitted to season</NonUser>}

      {matchFund && (
        <SchoolItems>
          <DropDownBlocks<IMatchFundFragment>
            itemSelected={sponsorSelected}
            setItemSelected={setSponsorSelection}
            items={matchFund}
            align="left"
            structure={[
              {
                renderer: (item: IMatchFundFragment) => <ItemText>{item.name}</ItemText>,
                classNames: 'doubleHeight',
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
              Add Project
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
