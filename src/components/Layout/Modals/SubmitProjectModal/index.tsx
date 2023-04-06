import { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button, Icon } from '@components'
import { rgba, LayoutContext, useDateHelpers, useSeasons } from '@lib'

import { palette, typography } from '@theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { LOAD_SEASONS, INSERT_SUBMISSION, UPDATE_ARTIFACTS } from '@gql'
import { ISeasonFragment, IUpdate_Artifacts_ManyMutation } from '@types'
import { DropDownBlocks } from '../lib/DropDownBlocks'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useRouter } from 'next/router'
import { capitalCase } from 'capital-case'

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
  const [processTxt, setProcessTxt] = useState<string>('Submit')
  const [seasonSelected, setSeasonSelection] = useState<ISeasonFragment | null>(null)
  const [loadSeasons, { data: loadedSeasonsData }] = useLazyQuery(LOAD_SEASONS)
  const [insertSubmissionMutaton] = useMutation(INSERT_SUBMISSION)
  const [updateArtifactMutaton] = useMutation<IUpdate_Artifacts_ManyMutation>(UPDATE_ARTIFACTS)
  const { reload } = useRouter()

  const loadActiveSeasons = () => {
    loadSeasons({
      variables: {
        //TODO: review why this filter does not work
        where: { submissions: { projectId: { _neq: project.id } } },
      },
    })

    const Seasons =
      loadedSeasonsData !== undefined && loadedSeasonsData?.Seasons.length > 0 ? loadedSeasonsData?.Seasons : []

    return Seasons.filter(
      ({ startingDate, endingDate, submissions }: ISeasonFragment): boolean =>
        isOpenForSubmissions(startingDate, endingDate) &&
        submissions.filter(({ projectId }) => projectId === project.id).length === 0,
    )
  }

  useEffect(() => {
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
    setProcessTxt('Submitting...')

    //publish submissition to blockchain
    const returnData = await publishSubmissions(seasonSelected, project)

    if (!returnData?.artifactID) {
      setProcessTxt('Error publishing submission to blockchain, start again')
      return
    }

    setProcessTxt(
      `Submission published to blockchain, adding TokenID to Artifact in DB with ID: ${project.artifacts[0].id} `,
    )

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
      setProcessTxt(
        `Error updateing the Artifact in DB, Note Artifact is minted in blockchain with tokenId: ${returnData.artifactID}, Artifact ID in DB is ${project.artifacts[0].id}, add tokenId manually to DB record`,
      )
      return
    }

    setProcessTxt(
      `Artifact updated, Adding new submission to DB with projectId: ${project.id}, artifactId: ${project.artifacts[0].id}, seasonId: ${seasonSelected?.id} `,
    )

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
      setProcessTxt(`Error adding the submission to DB with this error: ${insertSubmissionError[0].message}`)
      return
    }

    setProcessTxt('Submission published to blockchain and record added to DB, closing modal')

    setProcessing(false)
    toggleModal()

    reload()
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
      {processing && <div>{processTxt}</div>}
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
