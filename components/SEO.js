import Head from 'next/head'

const SEO = ({ title, description }) => (
  <Head>
    <title>{title} - Jon Meyers</title>
    <meta name="description" content={description} />
  </Head>
)

export default SEO
