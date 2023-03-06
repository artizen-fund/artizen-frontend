import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { Icon } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useQuery, useMutation } from '@apollo/client'
import { LOAD_SEASONS, INSERT_SUBMISSION } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

// load season data from useQuery

const SubmitProjectModal = () => {
  dayjs.extend(utc)
  dayjs.extend(isBetween)
  dayjs.extend(timezone)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(isSameOrBefore)
  const { modalAttrs } = useContext(LayoutContext)
  const [seasonSelected, setSeasonSelected] = useState<ISeasonFragment | null>(null)
  const { data: loadedSeasonsData } = useQuery<ILoadSeasonsQuery>(LOAD_SEASONS)
  const [submitProjectMutaton] = useMutation(INSERT_SUBMISSION)

  console.log('modalAttrs', modalAttrs)
  console.log('loadedSeasonsData', loadedSeasonsData)

  const { projectId } = modalAttrs

  console.log('seasonIdselected  ', seasonSelected)

  const submitProject = () => {
    // create a new project submission
    // submit the submission to the season with useMutation

    submitProjectMutaton({
      variables: {
        objects: [
          {
            projectId,
            seasonId: seasonSelected?.id,
          },
        ],
      },
    })
  }

  return (
    <Wrapper>
      <Headline>Submit Project to Season</Headline>

      <div>Search Season to submit the project to:</div>
      <SchoolItems>
        {loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
          const localTimeToPST = dayjs().tz('America/Toronto')
          const startingDate = dayjs('2023-01-03').tz('America/Toronto', true)
          const endingDate = dayjs('2023-02-03').tz('America/Toronto', true)
          const isBetween = localTimeToPST.isBetween(startingDate, endingDate, 'hour')
          const isSameOrBefore = localTimeToPST.isSameOrBefore(endingDate, 'hour')

          const status = isBetween ? 'Running' : isSameOrBefore ? 'Comming' : 'Closed'

          console.log('local time', dayjs().format('YYYY-MM-DD HH:mm:ss'))
          console.log('local localTimeToPST', localTimeToPST.format('YYYY-MM-DD HH:mm:ss'))
          console.log('startingDate  ', startingDate.format('YYYY-MM-DD HH:mm:ss'))
          console.log('isBetween  ', isBetween)
          console.log('status  ', status)

          if (seasonSelected?.id === season.id) {
            return (
              <ItemWrapper key={season.id}>
                <Item className="selected">{season.title}</Item>
                <Item className="doubleHeight selected">Selected</Item>
                <Item className="selected">{`Starting Date:${season.startingDate} - Ending Date:${season.endingDate}`}</Item>
              </ItemWrapper>
            )
          }
          if (!seasonSelected) {
            return (
              <ItemWrapper key={season.id} onClick={() => setSeasonSelected(season)}>
                <Item>{season.title}</Item>
                <Item className="doubleHeight">{status}</Item>
                <Item>{`Starting Date:${season.startingDate} - Ending Date:${season.endingDate}`}</Item>
              </ItemWrapper>
            )
          }
        })}
      </SchoolItems>

      <Menu>
        <Button level={2} outline onClick={() => setSeasonSelected(null)}>
          Create New Season
        </Button>
        {seasonSelected && (
          <>
            <Button level={2} outline onClick={() => setSeasonSelected(null)}>
              Unselect
            </Button>

            <Button level={2} onClick={submitProject}>
              Submit Project
            </Button>
          </>
        )}
      </Menu>
    </Wrapper>
  )
}

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

const ItemWrapper = styled.div`
  align-items: center;
  height: 100px;
  display: grid;
  padding: 1rem;
  background: ${rgba(palette.white, 0.2)};
  margin: 0.1rem 0;
  grid-auto-rows: 1fr;
  grid-template-columns: 2fr 1fr;

  .selected {
    color: ${rgba(palette.algae, 1)};
  }

  .doubleHeight {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
    font-size: 1.5rem;
    text-align: right;
  }
`

const Item = styled.div`
  span {
    font-size: 0.2rem;
  }
`

const Wrapper = styled.div`
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
  padding: 2rem;
  width: calc(100vw - 320px);
  height: calc(100vh - 320px);
`

const Headline = styled.h1`
  margin: 1rem 0;
  ${typography.title.l3}
`

const Message = styled.p`
  ${typography.body.l2}
`
export default SubmitProjectModal
