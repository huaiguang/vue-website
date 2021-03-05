module.exports = {
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'angular-html-parser',
        wrapAttributes: false,
        sortAttributes: false,
      },
    },
  ],
}
