import axios from 'axios'

const handler = async (req, res) => {
  const { email } = req.body
  const url = `${process.env.CONVERTKIT_API_URL}/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`

  try {
    await axios.post(url, {
      email,
      api_key: process.env.CONVERTKIT_API_KEY,
    })

    res.send(
      "I've sent you an email 📧 Go confirm to hear about my egghead course!"
    )
  } catch (e) {
    console.log(e)
    res.send(e.message)
  }
}

export default handler
