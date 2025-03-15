import { z } from "zod";
import { defineTool } from "../utils/mount-server";

export const nowTool = defineTool((server) => {
  server.tool(
    'now',
    'Get the current time',
    {
      format: z.enum(['iso', 'unix', 'human']).optional().default('iso'),
    }, async (args) => {
      const now = new Date()
      let result: string
      if (args.format === 'iso') {
        result = now.toISOString()
      } else if (args.format === 'unix') {
        result = now.getTime().toString()
      } else {
        result = new Date().toISOString()
      }

      console.log('now', result)

      return {
        content: [
          {
            type: 'text',
            text: result
          }
        ]
      }

    })
})  