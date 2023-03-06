import { useEffect, useState, useContext } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import styled from 'styled-components'
import { INSERT_SEASONS, LOAD_SEASONS } from '@gql'
import { ErrorObject } from 'ajv'
import { useRouter } from 'next/router'
import { Form, Spinner, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/createSeason'
import { LayoutContext } from '@lib'

// create a functional component that takes in a prop of type NewSeasonFormProps
// and returns a JSX element
// save the component in a constant called NewSeasonForm
// use the useMutation hook to mutate the season record in the database
// use the useQuery hook to query the database for the seasons
// set a variable startingDate to the last season's ending date plus one second
// show a spinner component if the loading variable is true

export default function NewSeasonForm(): JSX.Element {
  const { push } = useRouter()
  const { toggleModal } = useContext(LayoutContext)
  const [insertSeason] = useMutation(INSERT_SEASONS)
  const [loadSeason, { loading, data: loadedSeasonsData }] = useLazyQuery(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
  })

  const startingDate = loadedSeasonsData?.Seasons[0]?.endingDate + 1
  const [data, setData] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const saveNewSeason = async () => {
    setProcessing(true)

    //check if there is a season already in the database
    const { data: seasonInDB } = await loadSeason({
      variables: {
        where: {
          startingDate: {
            _gte: data.startingDate,
          },
          endingDate: {
            _neq: data.endingDate,
          },
        },
      },
    })

    console.log('seasonInDB', seasonInDB)

    if (seasonInDB.length > 0) {
      alert('Season within starting data and ending data already exists in the database')
      return
    }

    try {
      const dateFronMutation = await insertSeason({
        variables: { objects: [data] },
      })

      const newSeasonData = dateFronMutation.data.insert_Seasons.returning[0]

      if (!newSeasonData && newSeasonData.length === 0) {
        throw new Error('Error saving new season')
      }

      toggleModal('createSeasonModal')

      push(`/admin/seasons/${newSeasonData.id}`)
    } catch (error) {
      console.error('error saving new season', error)
      setProcessing(false)
      alert(error)
    }
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form
          schema={schema}
          uischema={uischema}
          data={data}
          setData={setData}
          additionalErrors={additionalErrors}
          readonly={processing}
        >
          <StyledButton onClick={() => saveNewSeason()} stretch level={0}>
            {processing ? 'Saving...' : 'Save Draft'}
          </StyledButton>
        </Form>
      )}
    </>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  margin-top: 2em;
`
