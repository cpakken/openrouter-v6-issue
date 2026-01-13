import { generateText, streamText } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })

const model = openrouter('google/gemini-3-flash-preview', {
  // reasoning: {
  //   enabled: true,
  //   effort: 'medium',
  // },
})

const generate = async () => {
  const result = await generateText({
    model,
    messages: [{ role: 'user', content: 'Hello, how are you?' }],
    onFinish: ({ usage }) => {
      console.dir({ usage })
    },
  })

  console.log({ content: result.content })
}

const stream = async () => {
  const result = streamText({
    model,
    messages: [{ role: 'user', content: 'Hello, how are you?' }],
    onFinish: (finish) => {
      console.log('finish', finish)
    },
    onChunk: (chunk) => {
      console.log('chunk', chunk)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  console.log(await result.content)
}

const run = async () => {
  // await generate()
  await stream()
}

run()
