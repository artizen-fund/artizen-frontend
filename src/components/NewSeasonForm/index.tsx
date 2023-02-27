import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { INSERT_SEASONS, LOAD_SEASONS } from '@gql'
import { ErrorObject } from 'ajv'
import { Form, Spinner, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/createSeason'

// create a functional component that takes in a prop of type NewSeasonFormProps
// and returns a JSX element
// save the component in a constant called NewSeasonForm
// use the useMutation hook to mutate the season record in the database
// use the useQuery hook to query the database for the seasons
// set a variable startingDate to the last season's ending date plus one second
// show a spinner component if the loading variable is true

export default function NewSeasonForm(): JSX.Element {
  const [insertSeason] = useMutation(INSERT_SEASONS)
  const { loading, data: loadedSeasonsData } = useQuery(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      order_by: [
        {
          startingDate: 'desc_nulls_last',
        },
      ],
    },
  })

  const startingDate = loadedSeasonsData?.Seasons[0]?.endingDate + 1
  const [data, setData] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const saveNewSeason = async () => {
    setProcessing(true)
    try {
      console.log('season data', data)
      const dateFronMutation = await insertSeason({
        variables: { objects: [data] },
      })
      console.log('dateFronMutation  ', dateFronMutation)
      //push(`/admin/seasons/${newSeasonDate}`)
    } catch (error) {
      console.log('error saving new season', error)
      setProcessing(false)
      alert(error)
    }
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form {...{ schema, uischema, data, setData, additionalErrors }} readonly={processing}>
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
