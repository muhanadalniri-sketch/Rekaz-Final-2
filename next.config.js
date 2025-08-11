
const withPWA = require('next-pwa')({
  dest:'public',
  disable: process.env.NODE_ENV==='development',
  register:true, skipWaiting:true,
  fallbacks: { document: '/offline' }
})
module.exports = withPWA({ reactStrictMode:true, images:{unoptimized:true} })
