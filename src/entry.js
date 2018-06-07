const chalk = require('chalk')
const yargs = require('yargs')
const Server = require('./app')

const argv = yargs
  .usage(`
=================================================================
== ${chalk.inverse('Viuer [option], type --help option to show help infomation.')} ==
=================================================================
  `)
  .example('viuer -p 8080 --host=127.0.0.1 -r ./ -o true', 'set port to 8080 and hostname is 127.0.0.1, set server host in current dir and open browser automatically.')
  .option('p', {
    alias: 'port',
    description: 'server port',
    default: 8080
  })
  .option('h', {
    alias: 'host',
    description: 'server host',
    default: '127.0.0.1'
  })
  .option('r', {
    alias: 'root',
    description: 'root path',
    default: process.cwd()
  })
  .option('o', {
    alias: 'autoOpenUrl',
    description: 'toggle auto open browser',
    default: false,
    boolean: true
  })
  .option('g', {
    alias: 'compress',
    description: 'toggle compress',
    default: true,
    boolean: true
  })
  .option('c', {
    alias: 'cacheMode',
    description: 'toggle cache',
    default: true,
    boolean: true
  })
  .epilog(`
message me: billyangg@qq.com
my github: https://github.com/oliyg
    `)
  .help() // 自动生成帮助信息
  .argv

const server = new Server(argv)
server.start()
