import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'u3w4h9it',
  dataset: 'production',
  useCdn: false,
})
