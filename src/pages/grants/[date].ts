import styled from 'styled-components'
import { useRouter } from 'next/router'
import {  useQuery } from '@apollo/client'


import { LOAD_GRANTS } from '@gql'
// import {
//   IInsert_GrantsMutation,
//   IInsert_ArtifactsMutation,
//   IInsert_ProjectsMutation,
//   IInsert_ProjectMembersMutation,
// } from '@types'


const GrantPage = () => {
  const {
    push,
    query: { date },
  } = useRouter()

 

  return <div>loading</div>


  

  console.log('sdfsdf', date)
}

export default GrantPage
