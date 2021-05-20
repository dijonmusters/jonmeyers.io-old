const { getRedirectStatus } = require('next/dist/lib/load-custom-routes')

module.exports = {
  async redirects() {
    return [
      {
        source: '/og',
        destination: '/api/cache-og-image',
        permanent: false,
      },
      // public articles from old url structure
      {
        source: '/blog/build-a-saas-platform-with-stripe',
        destination:
          '/series/build-a-saas-platform-with-next-js-prisma-auth0-and-stripe',
        permanent: true,
      },
      {
        source:
          '/blog/build-a-saas-platform-with-stripe/tech-stack-and-initial-project-setup',
        destination: '/blog/tech-stack-and-initial-project-setup',
        permanent: true,
      },
      {
        source:
          '/blog/build-a-saas-platform-with-stripe/hosting-on-vercel-automatic-deploys-with-github-and-configuring-custom-domains',
        destination:
          '/blog/hosting-on-vercel-automatic-deploys-with-github-and-configuring-custom-domains',
        permanent: true,
      },
      {
        source:
          '/blog/build-a-saas-platform-with-stripe/authentication-with-auth0-and-nextjs',
        destination: '/blog/authentication-with-auth0-and-next-js',
        permanent: true,
      },
      {
        source:
          '/blog/build-a-saas-platform-with-stripe/social-login-with-github-and-auth0-rules',
        destination: '/blog/social-login-with-github-and-auth0-rules',
        permanent: true,
      },
      {
        source:
          '/blog/build-a-saas-platform-with-stripe/processing-payments-with-stripe-and-webhooks',
        destination: '/blog/processing-payments-with-stripe-and-webhooks',
        permanent: true,
      },
      {
        source:
          '/blog/build-a-saas-platform-with-stripe/implementing-subscriptions-with-stripe',
        destination: '/blog/implementing-subscriptions-with-stripe',
        permanent: true,
      },
    ]
  },
}
