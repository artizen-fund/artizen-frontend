import { IArtifactFragment, IProjectFragment } from '@types'

const composeArtifactDescription = (
  artifactName: string,
  project: IProjectFragment,
  artifact: IArtifactFragment,
  allProjectMembersString: string,
) =>
  `**${artifactName} minted by ${project.title}**
  
**About**: ${project.logline}
  
**Impact**: ${project.impactTags}
  
**Lead Creator**: ${allProjectMembersString}
  
This Artifact is in the [public domain](https://creativecommons.org/publicdomain/zero/1.0/)

**Supported by the [Artizen Prize](https://www.artizen.fund/) for human creativity**
`

export default composeArtifactDescription
