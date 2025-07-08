import { LLMTool } from ".";

const toolRegistry = new Map<string, LLMTool>();

export function registerLLMTool(tool: LLMTool) {
  if (toolRegistry.has(tool.name)) {
    throw new Error(`Tool with name '${tool.name}' already registered.`);
  }
  toolRegistry.set(tool.name, tool);
}

export function listLLMTools(): LLMTool[] {
  return Array.from(toolRegistry.values());
}
