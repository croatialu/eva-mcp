import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { server as mcpServer } from './server'

import http from 'node:http'

const transports = new Map<string, SSEServerTransport>()

const server = http.createServer(async (req, res) => {
  const [path, queryString] = req.url?.split('?') || []

  if (path === '/sse') {
    const transport = new SSEServerTransport(`/messages`, res)
    transports.set(transport.sessionId, transport)
    console.log('SSE Connected ' + transport.sessionId)

    res.on('close', () => {
      transports.delete(transport.sessionId)
    })

    await mcpServer.connect(transport)
  }



  if (path === '/messages') {
    console.log(req.method, 'method')
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.end('Method Not Allowed')
      return
    }

    const query = new URLSearchParams(queryString)
    const clientId = query.get('sessionId')

    console.log('Message from ' + clientId)

    if (!clientId || typeof clientId !== 'string') {
      res.statusCode = 400
      res.end('Bad Request')
      return
    }



    const transport = transports.get(clientId)
    if (!transport) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }


    console.log('Message from ' + clientId)
    await transport.handlePostMessage(req, res)

    
  }


})


server.listen(3000, () => {
  console.log('Server is running on port 3000')
})


