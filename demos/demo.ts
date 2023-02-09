import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { BingChat } from '../src'

dotenv.config()

/**
 * Demo CLI for testing basic functionality.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  const api = new BingChat({ cookie: process.env.BING_COOKIE })

  const prompt = 'What are today’s top stories in the United States?'

  const res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
