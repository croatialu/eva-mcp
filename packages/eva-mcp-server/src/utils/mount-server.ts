import type { McpServer, } from "@modelcontextprotocol/sdk/server/mcp";
import type { ToolCreator } from "../types";

export const mountTools = (server: McpServer, tools: ((server: McpServer) => void)[]) => {
  tools.forEach((tool) => tool(server))
}

export const defineTool = (fn: ToolCreator): ToolCreator => {
  return fn
} 