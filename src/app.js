// require 3rd modules
const http = require('http') // http modules
const chalk = require('chalk') // terminal string styling
// require self modules
const autoOpenUrl = require('./utils/autoOpenUrl')
// require file
const config = require('./config')

const server = http.createServer((req, res) => {
  res.end('done')
})

server.listen(config.port, config.host, () => {
  const url = `http://${config.host}:${config.port}`
  process.stdout.write(chalk.green(`server running at ${url}`))
  if (config.autoOpenUrl) autoOpenUrl(url) // auto open url link on browser
})
