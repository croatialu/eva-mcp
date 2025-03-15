import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { server } from "./server";

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});