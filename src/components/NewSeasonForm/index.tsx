import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_SEASON } from '@gql'
import { LOAD_SEASONS } from '@gql'
import { DirectiveInfo } from '@apollo/client/utilities'
// import { Season } from '../../types'
// import { FormState, initialState, uischema } from './forms/createSeason' // <--- This is the new import
// import { JsonForms } from '@jsonforms/react'
// import { materialRenderers } from '@jsonforms/material-renderers'
// import { materialCells } from '@jsonforms/material-cell'
// import { JsonFormsDispatch } from '@jsonforms/core'
// import { useAuth } from '../../context/auth'

export default function NewSeasonForm() {
  //   const { user } = useAuth()
  //   const [createSeason] = useMutation(CREATE_SEASON)
  //   //   const [formState, setFormState] = useState<FormState>(initialState)
  //   const [seasons, setSeasons] = useState([])

  //   const { data, loading, error } = useQuery(LOAD_SEASONS, {
  //     variables: {
  //       limit: 10,
  //       offset: 0,
  //     },
  //   })

  //   const handleSubmit = async () => {
  //     const { data } = await createSeason({
  //       variables: {
  //         season: {
  //           startingDate: formState.season.startingDate,
  //           endingDate: formState.season.endingDate,
  //           title: formState.season.title,
  //         },
  //       },
  //     })
  //     // setSeasons([...seasons, data.createSeason])
  //   }

  //   return (
  //     <div>
  //       <JsonForms
  //         schema={schema}
  //         uischema={uischema}
  //         data={formState}
  //         renderers={materialRenderers}
  //         cells={materialCells}
  //         onChange={({ data, errors }: JsonFormsDispatch) => setFormState(data as FormState)}
  //       />
  //       <button onClick={handleSubmit}>Submit</button>
  //     </div>
  //   )

  return <div>hello</div>
}
