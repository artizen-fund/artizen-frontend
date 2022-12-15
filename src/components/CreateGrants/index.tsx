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
import moment from 'moment-timezone'

//TODO: startingDate is set by publishing function
//TODO: closingDate is set by ending function

const CreateGrants = () => {
  const {
    query: { id },
  } = useRouter()
  const { publish, endGrant } = useGrant()
  const [processing, setProcessing] = useState<boolean>()

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    skip: id === undefined || id === 'new',
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  })

  if (errorLoadingGrant) {
    console.error('errorLoadingGrant ', errorLoadingGrant)
    return <div>Error loading grant</div>
  }

  console.log(
    'loadedGrantData?.Grants[0]  ',
    moment.tz('America/Los_Angeles').isBefore(moment.tz(loadedGrantData?.Grants[0].closingDate, 'America/Los_Angeles')),
  )

  const grant = loadedGrantData?.Grants[0]
  const isGrantDraft = grant?.status === 'draft'
  const isGrantPublished = grant?.status === 'publised'
  const isGrantTimeRunning = moment().isBefore(moment.tz(loadedGrantData?.Grants[0].closingDate, 'America/Los_Angeles'))
  const canGrantBeEnded = isGrantPublished && !isGrantTimeRunning

  console.log('isGrantTimeRunning  ', isGrantTimeRunning)

  return (
    <FormWrapper>
      {!loading && !loadedGrantData && <NewGrantForm />}
      {!loading && loadedGrantData && (
        <>
          <GrantLayout grant={loadedGrantData.Grants[0]} />
          <FooterWrapper>
            {
              <StyledButton
                stretch
                disable={true}
                onClick={async () => {
                  setProcessing(true)
                  await publish(loadedGrantData.Grants[0])
                  setProcessing(false)
                }}
                level={0}
              >
                {processing ? 'Processing' : 'Publish'}
              </StyledButton>
            }
            {/* {!canGrantBeEnded && <div>Grant Status: Running is open and cannot be ended yet</div>} */}
            <StyledButton
              stretch
              onClick={async () => {
                setProcessing(true)
                endGrant(Number(grant?.blockchainId), grant?.submission?.project?.walletAddress || '')
                setProcessing(true)
              }}
              level={0}
            >
              {processing ? 'Processing' : 'End'}
            </StyledButton>
            Only end grants that their time is finished
          </FooterWrapper>
        </>
      )}
    </FormWrapper>
  )
}

const GrantContentWrapper = styled.div`
  display: block;
`

const FooterWrapper = styled.div`
  margin: 50px auto 0 0;
`

/*
grid-template-areas: `firstname lastname, email email, submit submit`

const Email = styled.div`
  grid-area: email;
`
*/

const FormWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
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
`

export default CreateGrants
