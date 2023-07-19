import { useState, useContext } from 'react'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { INSERT_SEASONS, LOAD_SEASONS } from '@gql'
import { ErrorObject } from 'ajv'
import { useRouter } from 'next/router'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/createSeason'
import { LayoutContext, ARTIZEN_TIMEZONE, useSeasons, useContracts, useDateHelpers } from '@lib'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'

export default function NewSeasonForm(): JSX.Element {
  dayjs.extend(timezone)
  dayjs.extend(utc)
  dayjs.extend(isSameOrBefore)
  const { getTimeUnix } = useDateHelpers()

  const { push } = useRouter()
  const { toggleModal } = useContext(LayoutContext)
  const [insertSeason] = useMutation(INSERT_SEASONS)
  const [loadSeason, { loading }] = useLazyQuery(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
  })
  const [data, setData] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  console.log('startingDate', data.startingDate)

  const startingDate = `${data.startingDate}T09:01:00`
  const endingDate = `${data.endingDate}T09:00:00`

  // const { publishSeason } = useSeasons()
  const { execute: publishSeason } = useContracts({
    args: [getTimeUnix(startingDate), getTimeUnix(endingDate)],
    functionName: 'createSeason',
    eventName: 'SeasonCreated',
  })

  const checkIfEndingDateIsAfterStartingDate = (from: string, to: string) => {
    const fromTime = dayjs.tz(from, ARTIZEN_TIMEZONE)
    const toTime = dayjs.tz(to, ARTIZEN_TIMEZONE)

    if (fromTime.isSameOrBefore(toTime)) {
      setAdditionalErrors([])
    } else {
      setAdditionalErrors([
        {
          instancePath: '/endingDate',
          message: 'Ending date must be after starting date',
          schemaPath: '#/properties/endingDate',
          keyword: '',
          params: {},
        },
      ])
    }
  }

  const checkIfThereIsSeasonDate = async (from: string, to: string) => {
    console.log('checkIfThereIsSeasonDate  ', from, to)
    const { data: seasonInDB, error } = await loadSeason({
      variables: {
        where: {
          _or: [
            { _and: [{ startingDate: { _gte: from } }, { startingDate: { _lt: to } }] },
            { _and: [{ endingDate: { _gt: from } }, { endingDate: { _lte: to } }] },
          ],
        },
      },
    })

    if (error) {
      alert('Error loading season in checkIfThereIsSeasonDate')
    }

    if (seasonInDB.Seasons.length > 0) {
      setAdditionalErrors([
        {
          instancePath: '/startingDate',
          message: 'There is a season running at this time',
          schemaPath: '#/properties/startingDate',
          keyword: '',
          params: {},
        },
      ])
    } else {
      console.log('gets here')
      setAdditionalErrors([])
    }
  }

  interface IOutcomeReturn {
    args: any
  }

  const saveNewSeason = async () => {
    if (!data.startingDate || !data.endingDate) {
      return
    }

    setProcessing(true)

    const { error, outcome } = await publishSeason?.()

    if (error) {
      console.log(`Error publishing season to blockchain ${error}`)
      alert(`Error publishing season to blockchain ${error}`)
      toggleModal('createSeasonModal')
    }

    console.log('publishedSeason', outcome?.[0].args.seasonID.toString())

    const newSeasonId = outcome?.[0].args.seasonID.toString()

    //get the new season id from blockchain and save it into the database
    // const newSeasonId = publishedSeason.events[0].args[0].toString()

    const dateFronMutation = await insertSeason({
      variables: {
        objects: [
          {
            title: data.title,
            startingDate,
            endingDate,
            index: Number(newSeasonId),
          },
        ],
      },
    })

    const newSeasonData = dateFronMutation.data.insert_Seasons.returning[0]

    if (!newSeasonData && newSeasonData.length === 0) {
      throw new Error('Error saving new season')
    }

    toggleModal('createSeasonModal')

    push(`/admin/seasons/${newSeasonData.id}`)
  }
  return (
    <Form
      schema={schema}
      uischema={uischema}
      data={data}
      setData={async temData => {
        if (temData.startingDate && temData.endingDate) {
          await checkIfThereIsSeasonDate(temData.startingDate, temData.endingDate)
          checkIfEndingDateIsAfterStartingDate(temData.startingDate, temData.endingDate)
        }

        setData(temData)
      }}
      additionalErrors={additionalErrors}
      readonly={processing}
    >
      <StyledButton onClick={saveNewSeason} stretch level={2}>
        {processing ? 'Publishing...' : 'Published'}
      </StyledButton>
    </Form>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  margin-top: 2em;
`
