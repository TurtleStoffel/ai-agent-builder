export type ChatHistory = { role: "user" | "model"; content: string }[];

export interface LLMResponse {
  response: string;
  chatHistory: ChatHistory;
}

export type AskLLMFunction = (
  chatHistory: ChatHistory,
  prompt: string,
  systemPrompt?: string
) => Promise<LLMResponse>;
