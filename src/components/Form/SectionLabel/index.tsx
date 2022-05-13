// NOTE: This does nothing, I haven't figured out where the renderer defines label components yet.

import styled from 'styled-components'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { rankWith, schemaMatches } from '@jsonforms/core'

export const SectionLabel = (props: any) => {
  return <Wrapper>derp</Wrapper>
}

const Wrapper = styled.h1``

export const sectionLabelTester = rankWith(
  3,
  schemaMatches(schema => {
    return schema.type === 'label'
  }),
)

export default withJsonFormsControlProps(SectionLabel)
