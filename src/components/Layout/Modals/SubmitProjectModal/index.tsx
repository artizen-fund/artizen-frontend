import { useContext } from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import { useQuery } from '@apollo/client'
import { LOAD_SEASONS } from '@gql'
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
  const { data: loadedSeasonsData } = useQuery(LOAD_SEASONS)

  console.log('modalAttrs', modalAttrs)
  console.log('loadedSeasonsData', loadedSeasonsData)

  const { projectId } = modalAttrs
  return (
    <Wrapper>
      <Headline>Submit Project to Season</Headline>
      <Message>{`project Id to be Submitted: ${projectId}`}</Message>
      <div>Season to be added</div>
      <SchoolItems>
        {loadedSeasonsData?.Seasons.map(season => {
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

          return (
            <ItemWrapper key={season.id}>
              <Item>{season.title}</Item>
              <Item>{status}</Item>
              <Item>{`Starting Date:${season.startingDate} - Ending Date:${season.endingDate}`}</Item>
            </ItemWrapper>
          )
        })}
      </SchoolItems>
    </Wrapper>
  )
}

const SchoolItems = styled.div`
  flex-direction: column;
  overflow: auto;
  height: 100px;
`

const ItemWrapper = styled.div`
  height: 100px;

  display: grid;
  padding: 1rem;
  background: ${rgba(palette.white, 0.2)};
  margin: 0.1rem 0;
  grid-template-columns: 2fr 1fr;
`

const Item = styled.div``

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
  ${typography.title.l3}
`

const Message = styled.p`
  ${typography.body.l2}
`
export default SubmitProjectModal
