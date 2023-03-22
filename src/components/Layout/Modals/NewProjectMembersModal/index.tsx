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
    fetchPolicy: 'no-cache',
    onCompleted: ({ Users }) => {
      if (Users.length === 0) {
        setuserSelection(null)
        setShowNonUsers(true)
      } else {
        setShowNonUsers(false)
      }
    },
  })
  const [submitProjectMutaton] = useMutation(INSERT_PROJECTS_MEMBERS)
  const [searchData, setSearchDataData] = useState<string>('')

  const { callback } = modalAttrs

  const Users = !loading && loadedUsers !== undefined && loadedUsers?.Users.length > 0 ? loadedUsers?.Users : null

  const createNewUserCallBack = () => {
    toggleModal()
    setVisibleModalWithAttrs('createProfile', {
      scope: 'admin',
      setLocked: true,
      action: 'create',
      callback: (data: any) => {
        callback(data)
        toggleModal()
      },
    })
  }

  console.log('userSelected   ', userSelected)

  const editUser = () => {
    toggleModal()
    setVisibleModalWithAttrs('createProfile', {
      scope: 'admin',
      action: 'update',
      initialState: userSelected,
      callback: (data: any) => {
        callback(data)
        toggleModal()
      },
    })
  }

  const searchUser = (value: string) => {
    setSearchDataData(value)
    loadUsers({
      variables: {
        where: {
          _or: [{ email: { _eq: value } }, { publicAddress: { _eq: value.toLocaleLowerCase() } }],
        },
      },
    })
  }

  return (
    <Wrapper>
      <Headline>Project Lead</Headline>
      <Subtitle>Search User to add to the project:</Subtitle>
      <InputSearchWrapper>
        <input
          placeholder={'Search users by email or wallet address'}
          value={searchData}
          onBlur={e => e.target.value === '' && !loading && setShowNonUsers(false)}
          onChange={e => searchUser(e.target.value)}
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
                renderer: (item: IUserPublicFragment) => (
                  <ItemText>
                    {item.firstName} {item.lastName}
                  </ItemText>
                ),
              },

              {
                renderer: (item: IUserPublicFragment) => <ItemText>Public Address: {item.publicAddress}</ItemText>,
              },
            ]}
          ></DropDownBlocks>
        </SchoolItems>
      )}

      <Menu>
        {!userSelected && (
          <Button level={2} outline onClick={() => createNewUserCallBack()}>
            Create New User
          </Button>
        )}
        {userSelected && (
          <>
            {!userSelected.claimed && (
              <Button level={2} outline onClick={() => editUser()}>
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

  @media (prefers-color-scheme: light) {
    color: ${rgba(palette.black)};
  }
  ${typography.title.l3}
`

const ItemText = styled.h3`
  @media (prefers-color-scheme: light) {
    color: ${rgba(palette.black, 0.6)};
  }
  ${typography.body.l3}
`

const Subtitle = styled.h2`
  @media (prefers-color-scheme: light) {
    color: ${rgba(palette.black)};
  }
  ${typography.title.l4}
`

export default NewProjectMembersModal
