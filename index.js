var path = require('path')
var dirname = path.dirname
var loaderUtils = require('loader-utils')
var nodeResolve = require('resolve').sync
var bem = require('pug-bem')

module.exports = function (source) {
  var modulePaths = {}
  modulePaths.pug = require.resolve('pug')
  modulePaths.runtime = nodeResolve('pug-runtime', {
    basedir: dirname(modulePaths.pug)
  })

  var pug = require(modulePaths.pug)
  var req = loaderUtils.getRemainingRequest(this).replace(/^!/, '')
  var query = loaderUtils.getOptions(this) || {}

  var loaderContext = this

  run()
  function run() {
    var options = Object.assign(
      {
        filename: req,
        doctype: query.doctype || 'html',
        pretty: query.pretty,
        self: query.self,
        compileDebug: loaderContext.debug || false,
        globals: ['require'].concat(query.globals || []),
        name: 'template',
        inlineRuntimeFunctions: false,
        filters: query.filters,
        plugins: [bem].concat(query.plugins || [])
      },
      query
    )

    bem.b = query.b || bem.b
    bem.e = query.e || bem.e
    bem.m = query.m || bem.m

    try {
      var tmplFunc = pug.compileClient(source, options)
    } catch (e) {
      loaderContext.callback(e)
      return
    }
    var runtime =
      'var pug = require(' +
      loaderUtils.stringifyRequest(
        loaderContext,
        '!' + modulePaths.runtime
      ) +
      ');\n\n'
    loaderContext.callback(
      null,
      runtime + tmplFunc.toString() + ';\nmodule.exports = template;'
    )
  }
}
