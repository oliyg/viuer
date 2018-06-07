const { createGzip, createDeflate } = require('zlib')

module.exports = function (readstream, req, res) {
  const acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return readstream
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip')
    return readstream.pipe(createGzip())
  } else {
    res.setHeader('Content-Encoding', 'deflate')
    return readstream.pipe(createDeflate())
  }
}
