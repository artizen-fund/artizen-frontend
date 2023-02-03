import { IArtifactFragment, IProjectFragment } from '@types'

export default (project: IProjectFragment, artifact: IArtifactFragment, allProjectMembersString: string) =>
  `**${artifact.name} minted by "${project.title}"**
*${artifact.edition} Edition 1/1*
  
**About**: ${project.logline}
  
**Impact**: ${project.impact}
  
**Team**: ${allProjectMembersString}
  
This Artifact is in the [public domain](https://creativecommons.org/publicdomain/zero/1.0/).

**Supported by the [Artizen Fund](https://www.artizen.fund/) for human creativity**
`
