const {exec} = require('child_process')

module.exports = function autoRun(url) {
  if (process.platform === 'win32') {
    exec(`start ${url}`)
  } else if (process.platform === 'darwin') {
    exec(`open ${url}`)
  }
}
