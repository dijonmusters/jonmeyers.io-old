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
      // even newer URL structure
      {
        source: '/courses',
        destination: '/videos',
        permanent: false,
      },
      {
        source:
          '/series/build-a-saas-platform-with-next-js-prisma-auth0-and-stripe',
        destination:
          '/blog-series/build-a-saas-platform-with-next-js-prisma-auth0-and-stripe',
        permanent: true,
      },
      {
        source: '/lessons/simple-caching-with-local-storage',
        destination: '/videos/simple-caching-with-local-storage',
        permanent: true,
      },
      {
        source: '/lessons/using-custom-hooks-in-react-to-reduce-complexity',
        destination: '/videos/using-custom-hooks-in-react-to-reduce-complexity',
        permanent: true,
      },
      {
        source:
          '/courses/build-an-e-commerce-platform-in-25-days-using-next-js-netlify-and-stripe',
        destination:
          '/video-series/build-an-e-commerce-platform-in-25-days-using-next-js-netlify-and-stripe',
        permanent: true,
      },
      {
        source: '/lessons/course-introduction',
        destination: '/videos/course-introduction',
        permanent: true,
      },
      {
        source: '/lessons/what-is-a-component',
        destination: '/videos/what-is-a-component',
        permanent: true,
      },
      {
        source: '/lessons/what-is-state',
        destination: '/videos/what-is-state',
        permanent: true,
      },
      {
        source: '/lessons/what-are-props',
        destination: '/videos/what-are-props',
        permanent: true,
      },
      {
        source: '/lessons/what-are-side-effects',
        destination: '/videos/what-are-side-effects',
        permanent: true,
      },
      {
        source: '/lessons/create-pages-with-next-js',
        destination: '/videos/create-pages-with-next-js',
        permanent: true,
      },
      {
        source: '/lessons/routing-in-next-js',
        destination: '/videos/routing-in-next-js',
        permanent: true,
      },
      {
        source: '/lessons/dynamic-routes-in-next-js',
        destination: '/videos/dynamic-routes-in-next-js',
        permanent: true,
      },
      {
        source: '/lessons/hosting-on-netlify',
        destination: '/videos/hosting-on-netlify',
        permanent: true,
      },
      {
        source: '/lessons/preview-deploys-in-netlify',
        destination: '/videos/preview-deploys-in-netlify',
        permanent: true,
      },
      {
        source: '/lessons/fetching-data-with-next-js',
        destination: '/videos/fetching-data-with-next-js',
        permanent: true,
      },
      {
        source: '/lessons/static-generation-with-getstaticprops',
        destination: '/videos/static-generation-with-getstaticprops',
        permanent: true,
      },
      {
        source: '/lessons/create-static-product-list',
        destination: '/videos/create-static-product-list',
        permanent: true,
      },
      {
        source: '/lessons/create-product-detail-pages',
        destination: '/videos/create-product-detail-pages',
        permanent: true,
      },
      {
        source: '/lessons/configure-styled-components',
        destination: '/videos/configure-styled-components',
        permanent: true,
      },
      {
        source: '/lessons/styling-components-with-styled-components',
        destination: '/videos/styling-components-with-styled-components',
        permanent: true,
      },
      {
        source: '/lessons/create-a-shopping-cart',
        destination: '/videos/create-a-shopping-cart',
        permanent: true,
      },
      {
        source: '/lessons/create-a-global-cart',
        destination: '/videos/create-a-global-cart',
        permanent: true,
      },
      {
        source: '/lessons/styling-the-cart',
        destination: '/videos/styling-the-cart',
        permanent: true,
      },
      {
        source: '/lessons/create-a-checkout-page',
        destination: '/videos/create-a-checkout-page',
        permanent: true,
      },
      {
        source: '/lessons/netlify-functions',
        destination: '/videos/netlify-functions',
        permanent: true,
      },
      {
        source: '/lessons/configure-stripe',
        destination: '/videos/configure-stripe',
        permanent: true,
      },
      {
        source: '/lessons/netlify-secrets',
        destination: '/videos/netlify-secrets',
        permanent: true,
      },
      {
        source: '/lessons/charge-a-card-with-stripe',
        destination: '/videos/charge-a-card-with-stripe',
        permanent: true,
      },
      {
        source: '/lessons/wrapping-up',
        destination: '/videos/wrapping-up',
        permanent: true,
      },
    ]
  },
  experimental: {
    styledComponents: true,
  },
}
