const config = require('../config')
/**
 * @param {*} stats file stats, need to check stats.mtime
 * @param {*} res response
 */
const fresh = (stats, res) => {
  const { lastModified, ETag, expires, CacheControl, maxAge } = config.cache
    
  // * last-modified and etag settings
  if (lastModified) { // if lastModified function is on
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
  }
  if (ETag) { // if ETag function is on
    res.setHeader('ETag', + new Date(stats.mtime))
  }
  if (CacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  }
  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge)).toUTCString())
  }
}

module.exports = function(stats, req, res) {
  
  const ifModifiedSince = req.headers['if-modified-since']
  const ifNoneMatch = req.headers['if-none-match']

  fresh(stats, res) // refresh

  // * Last-Modified
  if (!ifModifiedSince) {
    return false
  }
  if (ifModifiedSince && ifModifiedSince !== res.getHeader('Last-Modified')) {
    return false
  }

  // * ETag
  if (!ifNoneMatch) {
    return false
  }
  if (ifNoneMatch && ifNoneMatch !== res.getHeader('ETag') + '') { // need to convert number to string
    return false
  }

  return true
}
