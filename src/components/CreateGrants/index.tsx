import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { uploadToCloudinary } from '@lib'
import { CREATE_GRANTS, LOAD_GRANTS } from '@gql'
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
    console.log('variables from form', artifacts)
    // const newGrantVars = {
    //   grantVar: {
    //     status: 'draft',
    //     season: grant.season,
    //     date: grant.date,
    //   },
    // }

    // const artifactsWeb2Data = await createArtifacts(artifacts)

    // 2022-12-04T20:08:18.913Z

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
  const createArtifact = async (target: string, imageFile: File) => {
    const cloudinaryResponse = await uploadToCloudinary(imageFile)
    console.log('cloudinaryResponse ', cloudinaryResponse)
    // return cloudinaryResponse.secure_url
  }

  const createArtifacts = async artifactsData => {
    Object.keys(artifactsData).forEach(async (key, index) => {
      console.log('artifactsData ', artifactsData[key])
      console.log('key ', key)
      // myObject[key] *= 2

      // const link = await createArtifact(key, artifactsData[key])

      console.log('link ', link)
    })
  }

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

const FormWrapper = styled.div`
  padding: 100px;
  .group-layout legend {
    font-size: 30px;
  }
  .group-layout {
    margin: 40px 0;
  }

  // display: grid;
  // justify-items: stretch;
  // gap: 10px;
  // grid-template-areas:
  //   'startDate startDate'
  //   'season season'
  //   @media only screen and (min-width: ${breakpoint.desktop}px) {
  //   gap: 16px;
  // }
  // .vertical-layout,
  // .vertical-layout-item {
  //   display: contents;
  // }
  * [id='#/properties/startDate'] {
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
