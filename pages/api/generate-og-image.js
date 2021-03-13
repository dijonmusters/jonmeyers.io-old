import puppeteer from 'puppeteer'

// easy switching for dev
const host = 'http://localhost:3000'
// const host = 'FILL_THIS_IN'

module.exports = async (req, res) => {
  // TODO: add redirect so /og comes to /api/create-og
  const { title } = req.query

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${host}/og-image?title=${title}`)
    const logo = await page.$('#og-image')
    const box = await logo.boundingBox()
    const { x, y, width, height } = box
    const image = await page.screenshot({
      clip: { x, y, width, height },
    })
    await browser.close()
    res.setHeader('Content-Type', 'image/png')
    res.send(image)
  } catch (error) {
    console.log(error)
  }
}
