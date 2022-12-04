import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_GRANTS } from '@gql'
import { Form, Button } from '@components'
import { breakpoint, typography } from '@theme'

import { schema, uischema, initialState, FormState } from '@forms/createGrants'

const PST_DIFFERENCE = '+08.00'

const CreateGrants = () => {
  const [createGrant, { data: newGrantData, loading, error: errorCreatingGrant }] = useMutation(CREATE_GRANTS)

  console.log('errorCreatingGrant ', errorCreatingGrant)

  const [data, setData] = useState<FormState>({})

  const [processing, setProcessing] = useState(false)
  // todo: replace processing with [loading] from useMutation

  const saveChanges = async ({ grant }) => {
    console.log('variables from form', grant)
    const newGrantVars = {
      grantVar: {
        status: 'draft',
        season: grant.season,
        startDate: `${grant.startingDate} ${PST_DIFFERENCE}`,
      },
    }

    console.log('newGrantVars  ', newGrantVars)

    await createGrant({
      variables: newGrantVars,
    })

    console.log('grantVariable ', newGrantVars)
    // if (!loggedInUser) return
    // setProcessing(true)
    // await updateUser({ variables: { ...loggedInUser, ...data } })
    // setProcessing(false)
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
