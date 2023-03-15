import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button, Icon } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { InputWrapper } from '../../../../components/Form/Controls/_Common'
import { GET_USERS, INSERT_PROJECTS_MEMBERS } from '@gql'
import { IGetUsersQuery, IUserPublicFragment, Maybe } from '@types'
import { DropDownBlocks } from '../lib/DropDownBlocks'

const NewProjectMembersModal = () => {
  const { modalAttrs, toggleModal, setVisibleModalWithAttrs } = useContext(LayoutContext)

  const [userSelected, setuserSelection] = useState<IUserPublicFragment | null>(null)
  const [showNonUsers, setShowNonUsers] = useState<boolean>(false)
  const [loadUsers, { loading, data: loadedUsers }] = useLazyQuery<IGetUsersQuery>(GET_USERS, {
    onCompleted: ({ Users }) => {
      console.log('Users', Users)

      if (Users.length === 0) {
        setShowNonUsers(true)
      } else {
        console.log('gets here')
        setShowNonUsers(false)
      }
    },
  })
  const [submitProjectMutaton] = useMutation(INSERT_PROJECTS_MEMBERS)
  const [searchData, setSearchDataData] = useState<string>('')

  const { callback } = modalAttrs

  const Users = !loading && loadedUsers !== undefined && loadedUsers?.Users.length > 0 ? loadedUsers?.Users : null

  console.log('Users here  ', Users)

  return (
    <Wrapper>
      <Headline>Project Lead</Headline>

      <div>Search User to add to the project:</div>
      <InputSearchWrapper>
        <input
          placeholder={'Search users by email or public address'}
          value={searchData}
          onBlur={e => e.target.value === '' && !loading && setShowNonUsers(false)}
          onChange={e => {
            console.log('e.target.value', e.target.value)
            setSearchDataData(e.target.value)
            loadUsers({
              variables: {
                where: {
                  _or: [
                    { email: { _eq: e.target.value } },
                    { publicAddress: { _eq: e.target.value.toLocaleLowerCase() } },
                  ],
                },
              },
            })
          }}
        />
      </InputSearchWrapper>
      {showNonUsers && <NonUser>...user does not exists</NonUser>}
      {Users && (
        <SchoolItems>
          <DropDownBlocks<IUserPublicFragment>
            itemSelected={userSelected}
            setItemSelected={setuserSelection}
            items={Users}
            align="left"
            structure={[
              {
                renderer: (item: IUserPublicFragment) => <AvatarImage profileImage={item.profileImage}></AvatarImage>,
                classNames: 'doubleHeight',
              },
              {
                renderer: (item: IUserPublicFragment) => `${item.firstName} ${item.lastName}`,
              },

              {
                renderer: (item: IUserPublicFragment) => `Public Address :${item.publicAddress}`,
              },
            ]}
          ></DropDownBlocks>
        </SchoolItems>
      )}

      <Menu>
        {!userSelected && (
          <Button
            level={2}
            outline
            onClick={() => {
              toggleModal()
              setVisibleModalWithAttrs('createProfile', {
                type: 'admin',
                callback: (data: any) => {
                  console.log('New user in here :::::::', data)
                  callback(data)
                  toggleModal()
                },
              })
            }}
          >
            Create New User
          </Button>
        )}
        {userSelected && (
          <>
            {!userSelected.claimed && (
              <Button level={2} outline onClick={() => setuserSelection(null)}>
                Edit Users Data
              </Button>
            )}
            <Button level={2} onClick={() => callback(userSelected)}>
              Add User to Project
            </Button>
          </>
        )}
      </Menu>
    </Wrapper>
  )
}

const NonUser = styled.span`
  ${typography.body.l3}
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

export default NewProjectMembersModal
