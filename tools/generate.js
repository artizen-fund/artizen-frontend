const { generateTemplateFiles } = require('generate-template-files')

const config = require('../package.json')

alert('todo before merge: fill in Test and Stories with default data')

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
])
