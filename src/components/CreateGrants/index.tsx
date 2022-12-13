import { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { useGrant } from '@lib'
import NewGrantForm from './NewGrantForm'
import GrantLayout from './GrantLayout'

import { LOAD_GRANTS } from '@gql'
import { ILoadGrantsQuery } from '@types'

import { Button } from '@components'
// import { typography } from '@theme'
import { useRouter } from 'next/router'

//TODO: startingDate is set by publishing function
//TODO: closingDate is set by ending function

const CreateGrants = () => {
  const {
    query: { date },
  } = useRouter()
  const { publish } = useGrant()

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    skip: date === undefined || date === 'new',
    variables: {
      where: {
        date: {
          _eq: date,
        },
      },
    },
  })

  if (errorLoadingGrant) {
    console.error('errorLoadingGrant ', errorLoadingGrant)
    return <div>Error loading grant</div>
  }

  return (
    <FormWrapper>
      {!loading && !loadedGrantData && <NewGrantForm />}
      {!loading && loadedGrantData && (
        <>
          <GrantLayout grant={loadedGrantData.Grants[0]} />

          <FooterWrapper>
            <StyledButton
              stretch
              onClick={() => {
                publish(loadedGrantData.Grants[0])
              }}
              level={0}
            >
              Publish Grant
            </StyledButton>
            <StyledButton disabled={true} stretch onClick={() => alert('TODO')} level={0}>
              End Grant
            </StyledButton>
          </FooterWrapper>
        </>
      )}
    </FormWrapper>
  )
}

const GrantContentWrapper = styled.div`
  width: 80%;
  display: block;
`

const FooterWrapper = styled.div`
  width: 80%;
  display: flex;
`

/*
grid-template-areas: `firstname lastname, email email, submit submit`

const Email = styled.div`
  grid-area: email;
`
*/

const FormWrapper = styled.div`
  .group-layout legend {
    font-size: 30px;
  }
  .group-layout {
    margin: 40px 0;
  }

  // display: grid;

  // grid-template-areas:
  //   'artworkPatron ' 'artworkCreator' 'artworkCommunity'
  //   .vertical-layout-item {
  //   display: contents;
  // }
  * [id='#/properties/artifacts/properties/artworkPatron'] {
    display: block;
    grid-area: artworkPatron;
  }

  *[id='#/properties/artifacts/properties/artworkCreator'] {
    display: block;
    grid-area: artworkCreator;
  }

  *[id='#/properties/artifacts/properties/artworkCommunity'] {
    display: block;
    grid-area: artworkCommunity;
  }

  // display: grid;
  // justify-items: stretch;
  // gap: 10px;
  grid-template-areas:
    'startDate startDate'
    * [id= '#/properties/startDate' ] {
    grid-area: startDate;
  }

  *[id='#/properties/season'] {
    grid-area: season;
  }
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
  width: 170px;
  margin: 10px 30px 0 10px;
  float: right;
`

export default CreateGrants
