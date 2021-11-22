import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const handler = async (req, res) => {
  const { title } = req.query
  try {
    const imageUrl = cloudinary.url(
      `${process.env.CLOUDINARY_IMAGE_VERSION}/og-images/img-1.png`,
      {
        sign_url: true,
        custom_pre_function: {
          function_type: 'remote',
          source: `https://jonmeyers.io/api/generate-og-image?title=${title}`,
        },
      }
    )
    res.setHeader('Location', imageUrl)
    res.status(302).end()
  } catch (e) {
    console.log(e)
  }
}

export default handler
