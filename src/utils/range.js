/**
 * @param {*} totalSize total size of the file 
 * @param {*} req request
 * @param {*} res response
 * @returns {*} return { code, start?, end? }
 */

module.exports = function (totalSize, req, res) {
  // get header
  const range = req.headers['range']
  if (!range) return { code: 200 }
  
  // get the range
  const rangeSize = range.match(/bytes=(\d*)-(\d*)/)
  const start = rangeSize[1]  
  const end = rangeSize[2]

  if (start < 0 || start > totalSize || end > totalSize || end < 0 || start > end) return { code: 200 } // test the range

  // set header
  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length', end - start)

  return {
    code: 206,
    start: parseInt(start),
    end: parseInt(end)
  }
}
