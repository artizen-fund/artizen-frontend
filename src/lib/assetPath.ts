/* ex. set up an image bucket that mirrors https://lab.artizen.fund/assets at https://artizen-assets.somecdn.net
 * NEXT_PUBLIC_ASSET_PATH=https://artizen-assets.somecdn.net
 * svgAssetPath('/assets/glyphs/smileyface.svg') // https://artizen-assets.somecdn.net/glyphs/smileyface.svg
 */

export const assetPath = (assetPath: string) => {
  // note: we are not asserting this envVar, as it can be null/undefined in dev and testing environments
  const cdnPath = process.env.NEXT_PUBLIC_ASSET_PATH
  return cdnPath ? cdnPath + assetPath.replace(/assets\//, '') : assetPath
}
