module.exports = {
  host: '127.0.0.1',
  port: 8080,
  root: process.cwd(),
  autoOpenUrl: false,
  fileToCompress: /(html|txt|js|css|json|md)$/, // gzip and deflate
  // Caching
  cache: {
    lastModified: true,
    ETag: true,
    expires: true,
    CacheControl: true,
    maxAge: 10 * 60 * 1000
  }
}
