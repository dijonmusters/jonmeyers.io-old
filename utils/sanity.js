import sanityClient from '@sanity/client'

export const projectId = 'u3w4h9it'
export const dataset = 'production'

export const client = sanityClient({
  projectId,
  dataset,
  useCdn: false,
})
