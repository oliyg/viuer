// require modules
const http = require('http') // http modules
const promisify = require('util').promisify
const fs = require('fs')
const stat = promisify(fs.stat)
const readDir = promisify(fs.readdir)
const path = require('path')
const chalk = require('chalk') // terminal string styling
// require self modules
const autoOpenUrl = require('./utils/autoOpenUrl')
const printLog = require('./utils/printLog')
// require file
const config = require('./config')

const server = http.createServer(async (req, res) => {
  
  printLog(req) // print req and res log to terminal

  const filePath = path.join(config.root, req.url)
  try {
    const stats = await stat(filePath)

    // test the filePath is file or directory
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(filePath, { encoding: 'utf8' }).pipe(res) // read file
    } else if (stats.isDirectory()) {
      const dir = await readDir(filePath) // read directory
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(dir.join('\n'))
    }

  } catch (error) {
    process.stdout.write(chalk.red(error))
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('not found')
  }
})

server.listen(config.port, config.host, () => {
  const url = `http://${config.host}:${config.port}`
  process.stdout.write(`server running at ${chalk.green(url)}`)
  if (config.autoOpenUrl) autoOpenUrl(url) // auto open url link on browser
})
