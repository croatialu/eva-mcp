import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export interface ToolCreator {
  (server: McpServer): void
}
