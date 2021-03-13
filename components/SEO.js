import Head from 'next/head'
import { useRouter } from 'next/router'

const host = 'https://jonmeyers.io'

const SEO = ({ title, description }) => {
  const router = useRouter()
  const path = router.asPath

  return (
    <Head>
      {/* SEO */}
      <title>{title} - Jon Meyers</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* OG */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${host}/api/generate-og-image?title=${title}`}
      />
      <meta property="og:url" content={`${host}/${path}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content="jonmeyers.io" />
      <meta name="twitter:image:alt" content={title} />

      {/* FAVICON */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}

export default SEO
