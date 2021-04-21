const { getRedirectStatus } = require('next/dist/lib/load-custom-routes')

module.exports = {
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/blog',
      //   permanent: false,
      // },
      {
        source: '/og',
        destination: '/api/generate-og-image',
        permanent: true,
      },
    ]
  },
}
