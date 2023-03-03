import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import * as validateLib from 'wallet-address-validator'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { typography, palette } from '@theme'
import { LOAD_GRANTS } from '@gql'
import { ILoadGrantsQuery } from '@types'
import { Form, Button, Spinner } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/createProjects'
import { ARTIZEN_TIMEZONE, rgba } from '@lib'
import { validateProjectMembers, useSaveProject, getGrantDates } from './lib'

const NewProjectForm = () => {
  const { insertProject, insertMembers, insertGrant } = useSaveProject()
  const { push } = useRouter()

  const [generalData, setGeneralData] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  // const { loading, data: loadedGrantData } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
  //   variables: {
  //     order_by: [{ closingDate: 'desc_nulls_last' }],
  //     limit: 1,
  //   },
  // })

  // useEffect(() => {
  //   // if (!loadedGrantData) return
  //   // set initialState
  //   // const startingDateBase = loadedGrantData.Grants[0]?.closingDate || moment.tz(ARTIZEN_TIMEZONE)
  //   // const [startingDate] = getGrantDates(moment(startingDateBase), 1)
  //   // setData({
  //   //   ...initialState,
  //   //   grant: {
  //   //     ...initialState.grant,
  //   //     startingDate,
  //   //   },
  //   // })
  // }, [loadedGrantData])

  // useEffect(() => {
  //   if (!debouncedData) return

  //   // set additional form validators here
  //   const errors: Array<ErrorObject> = []
  //   if (!validateLib.validate(debouncedData.project.walletAddress, 'ETH')) {
  //     errors.push({
  //       instancePath: '/project/walletAddress',
  //       message: 'Invalid blockchain address',
  //       schemaPath: '#/properties/project/properties/walletAddress',
  //       keyword: '',
  //       params: {},
  //     })
  //   }
  //   setAdditionalErrors(errors)
  // }, [debouncedData])

  const saveNewProject = async () => {
    // if (!data || !validateProjectMembers(data.projectMembers)) return
    setProcessing(true)

    console.log(' generalData: ', generalData)

    // try {
    //   const projectId = await insertProject(data.project)
    //   await insertMembers(data.projectMembers, projectId)
    //   const newGrantDate = await insertGrant(data, projectId)
    //   push(`/admin/grants/${newGrantDate}`)
    // } catch (error) {
    //   setProcessing(false)
    //   alert(error)
    // }
  }

  return (
    <Wrapper>
      <h1>New Project</h1>
      <WrapperForm>
        <Form
          data={generalData}
          setData={setGeneralData}
          {...{ schema, uischema, additionalErrors }}
          readonly={processing}
        >
          <StyledButton onClick={() => saveNewProject()} stretch level={0}>
            {processing ? 'Saving...' : 'Save Draft'}
          </StyledButton>
        </Form>
      </WrapperForm>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const WrapperForm = styled.div`
  display: grid;
  margin: 20px auto;
  // width: 100%;
  // gap: 15px;

  grid-template-columns: 100%;
  grid-template-rows: auto;

  .vertical-layout,
  .vertical-layout-item,
  .group-layout,
  .group-layout-item {
    margin: 20px 0;
  }

  // legend {
  //   margin-top: 30px;
  //   ${typography.label.l3}
  // }

  // .array-table-layout {
  //   grid-column: 1 / span 12;
  // }

  // legend {
  //   grid-column: 1 / span 12;
  // }

  // .horizontal-layout {
  //   display: contents;
  //   .horizontal-layout-1 {
  //     display: contents;
  //     > * {
  //       grid-column-end: span 12;
  //     }
  //   }
  //   .horizontal-layout-2 {
  //     display: contents;
  //     > * {
  //       grid-column-end: span 6;
  //     }
  //   }
  //   .horizontal-layout-3 {
  //     display: contents;
  //     > * {
  //       grid-column-end: span 4;
  //     }
  //   }
  //   .horizontal-layout-4 {
  //     display: contents;
  //     > * {
  //       grid-column-end: span 3;
  //     }
  //   }
  //   .horizontal-layout-6 {
  //     display: contents;
  //     > * {
  //       grid-column-end: span 2;
  //     }
  //   }
  }

  // .array-table-layout {
  //   header {
  //     display: flex;
  //     justify-content: space-between;
  //     cursor: pointer;
  //   }
  //   tr {
  //     display: flex;
  //     position: relative;
  //   }
  //   td,
  //   th {
  //     flex: 2;
  //     padding: 0px 0px 10px 0px;
  //     text-align: left;
  //   }
  //   td:nth-child(8),
  //   th:nth-child(8) {
  //     flex: 1;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //   }
  //   td:nth-child(7) {
  //     padding: 5px;
  //     background-color: rgba(255, 255, 255, 0.1);
  //     color: white;
  //     font-weight: 300;
  //     font-size: 9px;
  //     pointer-events: none;
  //   }
    // button {
    //   color: black;
    //   border: 1px solid black;
    //   @media (prefers-color-scheme: dark) {
    //     border: 1px solid white;
    //     color: white;
    //   }
    //   padding: 4px 20px;
    //   border-radius: 9999px;
    //   cursor: pointer;
    //   font-style: normal;
    //   font-weight: 700;
    //   text-align: center;
    //   letter-spacing: 0.5px;
    //   ${typography.label.l2}
    //   transition: transform 0.15s ease-in-out;
    //   &:hover {
    //     transform: scale(1.1);
    //   }
    // }
    // input {
    //   border: 1px solid ${rgba(palette.stone)};
    //   width: 100%;
    //   padding: 18px 0px 18px 8px;
    //   @media (prefers-color-scheme: dark) {
    //     border: 1px solid ${rgba(palette.stone)};
    //     color: ${rgba(palette.slate)};
    //     background: ${rgba(palette.moon)};
    //   }
    // }
  }

  *[aria-label='Delete'] {
    color: red;
    padding: 0 6px;
  }
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-column: 1 / span 12;
  margin-top: 20px;
`

export default NewProjectForm