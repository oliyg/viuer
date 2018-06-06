// require modules
const chalk = require('chalk') // terminal string styling

module.exports = function(req) {
  process.stdout.write(`\n${chalk.red(req.method)} ${chalk.green('>>>')} request: ${req.url}\n user-agent: ${req.headers['user-agent']}\n`)
}
