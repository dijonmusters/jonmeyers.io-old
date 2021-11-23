import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const isDev = process.env.NODE_ENV === 'development'
const host = isDev ? 'http://localhost:3000' : 'https://jonmeyers.io'

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

export const getOptions = async () =>
  isDev
    ? {
        args: ['--use-gl=egl'],
        executablePath: exePath,
        headless: true,
      }
    : {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }

const handler = async (req, res) => {
  const { title } = req.query

  try {
    const options = await getOptions()
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()

    await page.setViewport({
      width: 1200,
      height: 630,
    })

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

export default handler
