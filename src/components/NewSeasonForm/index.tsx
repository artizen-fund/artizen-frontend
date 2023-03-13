import { useEffect, useState, useContext } from 'react'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { INSERT_SEASONS, LOAD_SEASONS } from '@gql'
import { ErrorObject } from 'ajv'
import { useRouter } from 'next/router'
import { Form, Spinner, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/createSeason'
import { LayoutContext, ARTIZEN_TIMEZONE } from '@lib'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export default function NewSeasonForm(): JSX.Element {
  dayjs.extend(timezone)
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const { push } = useRouter()
  const { toggleModal } = useContext(LayoutContext)
  const [insertSeason] = useMutation(INSERT_SEASONS)
  const [loadSeason, { loading }] = useLazyQuery(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
  })

  // useEffect(() => {
  //   const loadData = async () => {
  //     const { data } = await loadSeason({
  //       variables: {
  //         orderby: {
  //           endingDate: 'desc',
  //         },
  //         limit: 1,
  //       },
  //     })

  //     console.log('loadData', data)

  //     if (data.Seasons.length > 0) {
  //       const lastSeasonEndingTime = dayjs(data.Seasons[0].endingDate)

  //       setData({
  //         startingDate: lastSeasonEndingTime.format('YYYY-MM-DD'),
  //         endingDate: lastSeasonEndingTime.add(28, 'day').format('YYYY-MM-DD'),
  //         title: '',
  //       })
  //     }
  //   }

  //   loadData()
  // }, [])

  console.log('ARTIZEN_TIMEZONE  ', ARTIZEN_TIMEZONE)

  // const startingDate = loadedSeasonsData?.Seasons[0]?.endingDate + 1
  const [data, setData] = useState<FormState>(initialState)

  const [processing, setProcessing] = useState(false)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const saveNewSeason = async () => {
    setProcessing(true)

    const newStartingDate = `${data.startingDate}T09:01:00`
    const newEndingDate = `${data.endingDate}T09:00:00`

    //check if there is a season already in the database
    const { data: seasonInDB, error } = await loadSeason({
      variables: {
        where: {
          endingDate: {
            _gt: newStartingDate,
          },
        },
      },
    })

    console.log('error ', error)

    console.log('seasonInDB', seasonInDB)

    if (seasonInDB && seasonInDB.Seasons.length > 0) {
      console.log('gets to alert')
      alert('This season date conflicts with another season')
      setProcessing(false)
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
          <StyledButton onClick={saveNewSeason} stretch level={2}>
            {processing ? 'Saving...' : 'Save'}
          </StyledButton>
        </Form>
      )}
    </>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  margin-top: 2em;
`
