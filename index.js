const pug = require('pug')
const bem = require('pug-bem')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const options = Object.assign({
    filename: this.resourcePath,
    doctype: 'html',
    plugins: [bem],
    compileDebug: this.debug || false
  }, loaderUtils.getOptions(this))

  bem.e = options.e || bem.e
  bem.m = options.m || bem.m

  const template = pug.compile(source, options)
  template.dependencies.forEach(this.addDependency)
  return template(options.data || {})
}