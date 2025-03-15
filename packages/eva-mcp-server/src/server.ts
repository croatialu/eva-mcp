import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mountTools } from "./utils/mount-server";
import { listUsersTool, nowTool } from "./tools";
import { listGroupMrTool } from "./tools/list-mr";

export const server = new McpServer({
  name: "eva-mcp-server",
  version: "1.0.0",
});


mountTools(server, [
  listUsersTool,
  nowTool,
  listGroupMrTool
])


