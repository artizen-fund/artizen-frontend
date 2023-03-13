import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button, Icon } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, INSERT_PROJECTS_MEMBERS } from '@gql'
import { IGetUsersQuery, IUserPublicFragment, Maybe } from '@types'
import { DropDownBlocks } from '../lib/DropDownBlocks'

const NewProjectMembersModal = () => {
  const { modalAttrs } = useContext(LayoutContext)
  const [userSelected, setuserSelection] = useState<IUserPublicFragment | null>(null)
  const { loading, data: loadedUsers } = useQuery<IGetUsersQuery>(GET_USERS)
  const [submitProjectMutaton] = useMutation(INSERT_PROJECTS_MEMBERS)

  const { callback } = modalAttrs

  const Users = !loading && loadedUsers !== undefined && loadedUsers?.Users.length > 0 ? loadedUsers?.Users : null

  return (
    <Wrapper>
      <Headline>Project Lead</Headline>

      <div>Search User to add the project to:</div>

      <SchoolItems>
        {Users && (
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
        )}
      </SchoolItems>

      <Menu>
        <Button level={2} outline onClick={() => setuserSelection(null)}>
          Create New User
        </Button>
        {userSelected && (
          <>
            <Button level={2} outline onClick={() => setuserSelection(null)}>
              Edit Users Data
            </Button>
            <Button level={2} onClick={() => callback(userSelected)}>
              Add User to Project
            </Button>
          </>
        )}
      </Menu>
    </Wrapper>
  )
}

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
  height: 300px;
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
