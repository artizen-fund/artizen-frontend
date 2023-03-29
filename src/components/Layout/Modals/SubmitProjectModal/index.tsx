import { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button, Icon } from '@components'
import { rgba, LayoutContext, ARTIZEN_TIMEZONE, useDateHelpers } from '@lib'

import { palette, typography } from '@theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { LOAD_SEASONS, INSERT_SUBMISSION } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { DropDownBlocks } from '../lib/DropDownBlocks'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useRouter } from 'next/router'
import { capitalCase } from 'capital-case'
import { useSeasons } from '@lib'

// load season data from useQuery

const SubmitProjectModal = () => {
  dayjs.extend(utc)
  dayjs.extend(isBetween)
  dayjs.extend(timezone)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(isSameOrBefore)
  const { getSeasonStatus, formatDate, isOpenForSubmissions } = useDateHelpers()
  const { publishSubmissions } = useSeasons()

  const { modalAttrs, toggleModal } = useContext(LayoutContext)
  const { project } = modalAttrs

  const inputRef = useRef<ISeasonFragment[]>([])

  const [processing, setProcessing] = useState(false)
  const [seasonSelected, setSeasonSelection] = useState<ISeasonFragment | null>(null)
  const [loadSeasons, { data: loadedSeasonsData }] = useLazyQuery<ILoadSeasonsQuery>(LOAD_SEASONS)

  const loadActiveSeasons = () => {
    loadSeasons()

    const Seasons =
      loadedSeasonsData !== undefined && loadedSeasonsData?.Seasons.length > 0 ? loadedSeasonsData?.Seasons : []

    return Seasons.filter(({ startingDate, endingDate }) => isOpenForSubmissions(startingDate, endingDate))
  }

  const [submitProjectMutaton] = useMutation(INSERT_SUBMISSION)
  const { reload } = useRouter()

  useEffect(() => {
    console.log('inputRef.current  ', inputRef.current)
    if (inputRef.current.length > 0) return

    const Seasons = loadActiveSeasons()

    const arrayWithoutSubmitedProjects = Seasons.filter(({ submissions }) => {
      const projectSubmited = submissions.find(
        ({ project: projectFromSubmission }) => projectFromSubmission?.id !== project.id,
      )
      return submissions.length > 0 ? projectSubmited : true
    })

    if (arrayWithoutSubmitedProjects.length === 0) return

    inputRef.current = arrayWithoutSubmitedProjects
  }, [inputRef.current, loadedSeasonsData, loadSeasons, project.id])

  const submitProject = async () => {
    // create a new project submission
    // submit the submission to the season with useMutation

    if (!seasonSelected) {
      return
    }

    //publish submissition to blockchain
    const returnData = await publishSubmissions(seasonSelected, project)

    console.log('returnData   ', returnData)

    /*
    const submitProjectR = await submitProjectMutaton({
      variables: {
        objects: [
          {
            projectId: project.id,
            // TODO: this will not work with multiple artifacts and multiple projects submissions
            artifactId: project.artifacts[0].id,
            seasonId: seasonSelected?.id,
          },
        ],
      },
    })

    const { data, errors } = submitProjectR

    if (errors) {
      console.log('errors   ', errors)
      throw new Error(errors[0].message)
    }

    toggleModal()
    reload()
    */
  }

  return (
    <Wrapper>
      <Headline>Submit Project to Season</Headline>

      {inputRef.current.length === 0 && (
        <SchoolItems>
          There are not active seasons, or has this project been submitted to all the available seasons
        </SchoolItems>
      )}

      {inputRef.current.length > 0 && (
        <>
          <div>Search Season to submit the project to:</div>

          <SchoolItems>
            <DropDownBlocks<ISeasonFragment>
              itemSelected={seasonSelected}
              setItemSelected={setSeasonSelection}
              items={inputRef.current}
              align="right"
              structure={[
                {
                  renderer: (item: ISeasonFragment) => `${item.title && capitalCase(item.title)}`,
                },
                {
                  renderer: (item: ISeasonFragment) =>
                    `${capitalCase(getSeasonStatus(item.startingDate, item.endingDate))}`,
                },
                {
                  renderer: (item: ISeasonFragment) =>
                    `Running from: ${formatDate(item.startingDate)} - to: ${formatDate(item.endingDate)}`,
                },
              ]}
            ></DropDownBlocks>
          </SchoolItems>
        </>
      )}

      <Menu>
        <Button
          level={2}
          outline
          onClick={() => {
            setSeasonSelection(null)
            toggleModal('createSeasonModal')
          }}
        >
          Create New Season
        </Button>
        {seasonSelected && (
          <>
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

const Wrapper = styled.div`
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
  padding: 2rem;
  width: calc(100vw - 320px);
  height: 320px;
`

const Headline = styled.h1`
  margin: 1rem 0;
  ${typography.title.l3}
`

export default SubmitProjectModal
