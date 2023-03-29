import { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button, Icon } from '@components'
import { rgba, LayoutContext, useDateHelpers } from '@lib'

import { palette, typography } from '@theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { LOAD_SEASONS, INSERT_SUBMISSION, UPDATE_ARTIFACTS } from '@gql'
import {
  ILoadSeasonsQuery,
  ISeasonFragment,
  IUpdate_Artifacts_ManyMutation,
  IMutation_RootUpdate_Artifacts_ManyArgs,
} from '@types'
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
  const [loadSeasons, { data: loadedSeasonsData }] = useLazyQuery(LOAD_SEASONS)
  const [insertSubmissionMutaton] = useMutation(INSERT_SUBMISSION)
  const [updateArtifactMutaton] = useMutation<IUpdate_Artifacts_ManyMutation>(UPDATE_ARTIFACTS)
  const { reload } = useRouter()

  const loadActiveSeasons = () => {
    loadSeasons({
      variables: {
        where: { submissions: { projectId: { _neq: project.id } } },
      },
    })

    const Seasons =
      loadedSeasonsData !== undefined && loadedSeasonsData?.Seasons.length > 0 ? loadedSeasonsData?.Seasons : []

    return Seasons.filter(({ startingDate, endingDate }: ISeasonFragment): boolean =>
      isOpenForSubmissions(startingDate, endingDate),
    )
  }

  useEffect(() => {
    console.log('inputRef.current  ', inputRef.current)
    if (inputRef.current.length > 0) return

    const Seasons = loadActiveSeasons()

    const arrayWithoutSubmitedProjects = Seasons.filter(({ submissions }: ISeasonFragment) => {
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

    setProcessing(true)

    //publish submissition to blockchain
    const returnData = await publishSubmissions(seasonSelected, project)

    if (!returnData?.artifactID) {
      return new Error('Error publishing submission to blockchain')
    }

    console.log('returnData   ', returnData)

    const { errors: updateArtifactError } = await updateArtifactMutaton({
      variables: {
        updates: [
          {
            where: { id: { _eq: project.artifacts[0].id } },
            _set: { token: returnData.artifactID.toString() },
          },
        ],
      },
    })

    if (updateArtifactError) {
      console.log('updateArtifactError   ', updateArtifactError)
      throw new Error(`updateArtifactMutaton ${updateArtifactError[0].message} `)
    }

    const { errors: insertSubmissionError } = await insertSubmissionMutaton({
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

    if (insertSubmissionError) {
      console.log('errors   ', insertSubmissionError)
      throw new Error(`updateArtifactMutaton ${insertSubmissionError[0].message} `)
    }
    setProcessing(false)
    toggleModal()
  }

  return (
    <Wrapper>
      <Headline>Submit Project to Season</Headline>
      {!processing && (
        <>
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
        </>
      )}
      {processing && <div>Publising... </div>}
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
