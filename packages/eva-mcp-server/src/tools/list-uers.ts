import { z } from "zod";
import { gitlab } from "../gitlab";
import { defineTool } from "../utils/mount-server";

export const listUsersTool = defineTool((server) => {
  server.tool(
    'list-users',
    'List gitlab users',
    {
      name: z.string().optional().describe('The name of the user to search for'),
      count: z.number().optional().describe('The number of users to return').default(10),
    },
    async (args) => {
      const users = await gitlab.Users.all({
        search: args.name,
        perPage: args.count,
      })


      return {
        content: [
          {
            type: 'text',
            text: users.map((user) => user.name).join('\n'),
          }
        ]
      }
    })
})
