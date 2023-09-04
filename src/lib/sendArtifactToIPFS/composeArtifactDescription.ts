import { IArtifactFragment, IProjectFragment } from '@types'
import { capitalize } from 'lodash'

const composeArtifactDescription = (
  artifactName: string,
  project: IProjectFragment,
  allProjectMembersString: string,
) => {
  //"title": "How will your project impact the world?"

  const impact = project.metadata.filter((item: any) => item.title === 'How will your project impact the world?')

  console.log('impact', impact[0].value)

  return `**${artifactName}**

**Project**: ${capitalize(project.title)}
  
**About**: ${project.logline}
  
**Impact**: ${impact[0].value}
  
**Lead Creator**: ${allProjectMembersString}
  
This Artifact is in the [public domain](https://creativecommons.org/publicdomain/zero/1.0/)

**Supported by the [Artizen Fund](https://www.artizen.fund/) for human creativity**
`
}

export default composeArtifactDescription
