import { listLLMTools, LLMTool } from ".";
import { AskLLMFunction } from "./llm";

/**
 * Request confirmation from the user before executing a tool.
 * Use return type `boolean` for simple confirmation,
 * or `string` to provide additional input to the LLM.
 */
export type RequestConfirmationFunction = (
  tool: LLMTool,
  parsed: unknown
) => Promise<boolean | string>;

export async function startTask(
  prompt: string,
  systemPrompt: string,
  askLLM: AskLLMFunction,
  requestConfirmation?: RequestConfirmationFunction
): Promise<boolean> {
  let llmResponse = await askLLM([], prompt, systemPrompt);

  const MAX_ITERATIONS = 10;
  for (let iterations = 0; iterations < MAX_ITERATIONS; iterations++) {
    let toolFound = false;

    // Try all registered tools' parse methods
    for (const tool of listLLMTools()) {
      const parsed = tool.parse(llmResponse.response);
      if (parsed !== null) {
        toolFound = true;

        if (tool.name === "attempt_completion") {
          return true;
        }

        const confirmed = requestConfirmation
          ? await requestConfirmation(tool, parsed)
          : true;

        if (!confirmed) {
          return false;
        }

        let llmFeedback: string;

        if (typeof confirmed === "boolean") {
          llmFeedback = await tool.execute(parsed);
        } else {
          llmFeedback = confirmed;
        }

        llmResponse = await askLLM(
          llmResponse.chatHistory,
          llmFeedback,
          systemPrompt
        );

        break; // Break out of the tools for loop since a valid tool was found
      }
    }

    if (!toolFound) {
      throw new Error("No tool could parse the response.");
    }
  }

  throw new Error(`Exceeded maximum iterations (${MAX_ITERATIONS}).`);
}
