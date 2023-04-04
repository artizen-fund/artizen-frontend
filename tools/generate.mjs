import fs from 'fs'
import { generateTemplateFiles } from 'generate-template-files'

generateTemplateFiles([
  {
    option: 'Generic Component',
    defaultCase: '(pascalCase)',
    entry: { folderPath: './tools/templates/component/index.tsx' },
    stringReplacers: [{ question: 'Component name (ex.SomethingCool)', slot: '__name__' }],
    output: {
      path: './src/components/__name__(pascalCase).tsx',
      pathAndFileNameDefaultCase: '(pascalCase)',
    },
    onComplete: ({ stringReplacers }) => {
      let newLine = `export { default as __name__ } from './__name__'\n`
      stringReplacers.forEach(({ slot, slotValue }) => {
        newLine = newLine.replaceAll(slot, slotValue)
      })
      fs.appendFile(`./src/components/index.ts`, newLine, err => {
        if (err) throw err
      })
    },
  },
  {
    option: 'Form Component',
    defaultCase: '(pascalCase)',
    entry: { folderPath: './tools/templates/formComponent/' },
    stringReplacers: [{ question: 'Component name (ex.SomeForm)', slot: '__name__' }],
    output: {
      path: './src/components/__name__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
    },
  },
  {
    option: 'Icon Set',
    defaultCase: '(camelCase)',
    entry: { folderPath: './tools/templates/iconSet/' },
    stringReplacers: [{ question: 'Icon Set name (ex. currencyEuro)', slot: '__name__' }],
    output: {
      path: './public/assets/glyphs/__name__(camelCase)',
      pathAndFileNameDefaultCase: '(camelCase)',
    },
  },
])
