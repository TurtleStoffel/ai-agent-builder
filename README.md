# 🤖 AI Agent Builder
Many AI Agents are based on tool calling, where the agent uses a large language model (LLM) to decide which tools to call and how to use them. This package exposes several types and utility functions to help you build such agents.

## Exposed Types and Functions

### Tool Registry
- `registerLLMTool(tool: LLMTool)`: Register a new tool for use by the agent.
- `listLLMTools(): LLMTool[]`: List all registered tools.

### Tool Definition
- `LLMToolParameter`: Describes a parameter for a tool (name, description, required).
- `LLMTool<InputParameters>`: Interface for defining a tool, including its name, prompt, parameters, examples, parse, and execute methods.

### LLM Utilities
- `ChatHistory`: Type representing the chat history between user and model.
- `LLMResponse`: Interface for the response from an LLM, including the response string and chat history.
- `AskLLMFunction`: Type for a function that sends prompts and chat history to an LLM and returns a response.

### Task Orchestration
- `startTask(...)`: Orchestrates a task by interacting with the LLM and registered tools.
- `RequestConfirmationFunction`: Type for a function to confirm tool execution with the user.

---

For more details, see the source files in the package or the TypeScript type definitions.
