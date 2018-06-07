// require modules
const http = require('http') // http modules
const promisify = require('util').promisify
const fs = require('fs')
const stat = promisify(fs.stat)
const readDir = promisify(fs.readdir)
const path = require('path')
const chalk = require('chalk') // terminal string styling
const ejs = require('ejs')
const mime = require('mime-types')
// require self modules
const autoOpenUrl = require('./utils/autoOpenUrl')
const printLog = require('./utils/printLog')
const compress = require('./utils/compress')
const range = require('./utils/range')
const isFresh = require('./utils/isFresh')
// require file
const config = require('./config')
// template
const tplPath = path.join(__dirname, './template/index.tpl.ejs')
const source = fs.readFileSync(tplPath, { encoding: 'UTF-8' })
const template = ejs.compile(source.toString())

const server = http.createServer(async (req, res) => {
  
  printLog(req) // print req and res log to terminal

  const filePath = path.join(config.root, req.url) // !file absolute path
  try {
    const stats = await stat(filePath)

    // test the filePath is file or directory
    if (stats.isFile()) {

      const ext = path.extname(filePath).split('.').pop().toLowerCase()
      const contentType = mime.lookup(ext)
      if (contentType) {
        res.setHeader('Content-Type', contentType)
      } else {
        res.setHeader('Content-Type', 'text/plain')            
      }

      // test isFresh
      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      let readstream = ''
      let fileRange = range(stats.size, req, res) // get part of the file
      if (fileRange.code && fileRange.code === 200) {
        res.statusCode = fileRange.code
        readstream = fs.createReadStream(filePath, { encoding: 'utf8' }) // read file
      } else if (fileRange.code === 206) {
        res.statusCode = fileRange.code
        readstream = fs.createReadStream(filePath, {
          encoding: 'utf8',
          start: fileRange.start,
          end: fileRange.end
        }) // read range content of the file
      }


      // compress using gzip or deflate
      if (ext.match(config.fileToCompress)) {
        readstream = compress(readstream, req, res)
      }

      readstream.pipe(res)

    } else if (stats.isDirectory()) {
      const dir = await readDir(filePath) // read directory
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const data = {
        title: path.basename(filePath) || '/',
        dir: path.relative(process.cwd(), filePath),
        files: dir
      }
      res.end(template(data))
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
