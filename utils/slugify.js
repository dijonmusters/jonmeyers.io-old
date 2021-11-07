import npmSlugify from 'slugify'

const slugify = (words) =>
  npmSlugify(words, { lower: true }).replace(/[.]/g, '-')

export default slugify
