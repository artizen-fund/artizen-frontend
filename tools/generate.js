const { generateTemplateFiles } = require('generate-template-files')

const config = require('../package.json')

generateTemplateFiles([
  {
    option: 'Generic Component',
    defaultCase: '(pascalCase)',
    entry: { folderPath: './tools/templates/component/' },
    stringReplacers: [{ question: 'Component name (ex.SomethingCool)', slot: '__name__' }],
    output: {
      path: './src/components/__name__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
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
      path: './public/glyphs/__name__(camelCase)',
      pathAndFileNameDefaultCase: '(camelCase)',
    },
  },
])
