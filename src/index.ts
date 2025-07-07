export interface LLMToolParameter {
  name: string;
  description: string;
  required?: boolean;
}

export interface LLMTool<InputParameters = unknown> {
  name: string;
  prompt: string;
  parameters: LLMToolParameter[];
  examples: string;

  /**
   * Parses the input and returns InputParameters if this tool was called, or null otherwise.
   */
  parse: (input: string) => InputParameters | null;

  /**
   * Execute the tool with the parsed input.
   *
   * @returns The response from the tool that should be returned to the LLM.
   */
  execute: (parsed: InputParameters) => string | Promise<string>;
}
