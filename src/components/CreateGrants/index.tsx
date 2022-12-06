import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { uploadToCloudinary } from '@lib'
import { CREATE_GRANTS, LOAD_GRANTS, CREATE_ARTIFACTS } from '@gql'
import { Form, Button } from '@components'
import { breakpoint, typography } from '@theme'
import { useRouter } from 'next/router'

import { schema, uischema, initialState, FormState } from '@forms/createGrants'

//TODO: startingDate is set by publishing function
//TODO: closingDate is set by ending function

const CreateGrants = () => {
  const {
    push,
    query: { id },
  } = useRouter()

  const [createGrant] = useMutation(CREATE_GRANTS)
  const [createArtifactsInDB] = useMutation(CREATE_ARTIFACTS)
  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery(LOAD_GRANTS, {
    skip: id === undefined || id === 'new',
    variables: {
      where: {
        date: {
          _eq: id,
        },
      },
    },
  })

  const [data, setData] = useState<FormState>({})

  const [processing, setProcessing] = useState(false)

  if (errorLoadingGrant) {
    return <div>Error loading grant</div>
  }

  const saveChanges = async ({ grant, artifacts, project, projectMembers }) => {
    console.log('variables from form', project)
    // const newGrantVars = {
    //   grantVar: {
    //     status: 'draft',
    //     season: grant.season,
    //     date: grant.date,
    //   },
    // }
    if (artifacts && artifacts.length > 0) {
      const artifactDBId = await createArtifactDB(artifacts)
    }

    // console.log('newGrantVars  ', newGrantVars)

    // const createdGrantData = await createGrant({
    //   variables: newGrantVars,
    // })

    // console.log('createGrantData     ', createdGrantData)

    // const date: string | null = createdGrantData.data?.insert_Grants_one?.date

    // console.log('date       ', date)

    // date && push(`/admin/grants/${date}`)

    return

    // if (!loggedInUser) return
    // setProcessing(true)
    // await updateUser({ variables: { ...loggedInUser, ...data } })
    // setProcessing(false)
  }

  //TODO: This should be break down into smaller units
  const createArtifactDB = async artifactsData => {
    // check there is 3 values in array

    TODO: console.log('artifactsData ', artifactsData)

    const artifactsDBCreationReturn = await createArtifactsInDB({
      variables: {
        objects: artifactsData,
      },
    })

    console.log('artifactsDBCreationReturn ', artifactsDBCreationReturn)

    if (
      artifactsDBCreationReturn.data?.insert_Artifacts?.returning ||
      artifactsDBCreationReturn.data?.insert_Artifacts?.returning.length === 0
    ) {
      throw new Error('error creating artifacts in DB')
    }

    return artifactsDBCreationReturn.data?.insert_Artifacts?.returning[0].id

    // console.log('cloudinaryResponse ', cloudinaryResponse)
    // return cloudinaryResponse.secure_url
  }

  // const createArtifacts = async artifactsData => {
  //   Object.keys(artifactsData).forEach(async (key, index) => {
  //     console.log('artifactsData ', artifactsData[key])
  //     console.log('key ', key)
  //     // myObject[key] *= 2

  //     // const link = await createArtifact(key, artifactsData[key])

  //     // console.log('link ', link)
  //   })
  // }

  // const mapVar = data => {

  //   return data
  // }

  return (
    <FormWrapper>
      <Form {...{ schema, uischema, initialState, data, setData }} readonly={processing}>
        <StyledButton disabled={processing || loading} onClick={() => saveChanges(data)} stretch level={0}>
          {loading ? 'Saving...' : 'Save Draft'}
        </StyledButton>
        <FooterWrapper>
          <StyledButton disabled={true} stretch onClick={() => {}} level={0}>
            Publish Grant
          </StyledButton>
          <StyledButton disabled={true} onClick={() => {}} stretch level={0}>
            End Grant
          </StyledButton>
        </FooterWrapper>
      </Form>
    </FormWrapper>
  )
}

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
  padding: 100px;
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

const NotificationsBanner = styled.div`
  grid-area: socialLinksBanner;
  margin-top: 20px;
  ${typography.label.l1}
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
  width: 170px;
  margin: 10px 30px 0 10px;
  float: right;
`

export default CreateGrants
