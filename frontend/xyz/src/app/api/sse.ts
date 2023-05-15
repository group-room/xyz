import 'path/to/event-source-polyfill/src/eventsource.min.js'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function SSE (req: NextApiRequest, res: NextApiResponse)  {
  
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const sendSseMessage = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // SSE로 전송할 데이터를 주기적으로 업데이트
  setInterval(() => {
    const message = { time: new Date().toISOString() }
    sendSseMessage(message)
  }, 1000)
}
