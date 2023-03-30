import composeArtifactDescription from './composeArtifactDescription'
import { mockProject, mockArtifact } from './mockData'

describe('composeArtifactDescription', () => {
  it('composes a description based on the artifact data', () => {
    const result = composeArtifactDescription(mockProject, mockArtifact, 'Herp Derp, Doop Bonk, Boop Bark')
    expect(result).toContain(`**${mockArtifact.name} minted`)
    expect(result).toContain(`"${mockProject.title}"**`)
    expect(result).toContain(`*${mockArtifact.edition} Edition`)
  })
})
