import { z } from "zod"
import { defineTool } from "../utils/mount-server"
import { gitlab } from "../gitlab"




export const listGroupMrTool = defineTool((server) => {
  server.tool(
    'list-group-mr',
    'List group gitlab merge requests',
    {
      groupName: z.string().describe('The name of the group to list merge requests for'),
      mrStatus: z.enum(['opened', 'closed', 'merged', 'locked']).optional().default('opened'),
    },
    async (args) => {

      const group = await gitlab.Groups.all({ search: args.groupName })

      if (group.length === 0) {
        return {
          content: [{ type: 'text', text: 'Group not found' }]
        }
      }

      const projects = await gitlab.Projects.all({
        search: args.groupName,
        searchNamespaces: true,
      })



      if (projects.length === 0) {
        return {
          content: [{ type: 'text', text: 'Projects not found' }]
        }
      }

      const allMrs = (await Promise.all(projects.map(async (project) => {
        const mr = await gitlab.MergeRequests.all({ projectId: project.id, state: args.mrStatus })
        return mr
      }))).flat()


      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(allMrs, null, 2)
          }
        ]
      }
    }
  )
})
