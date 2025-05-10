import { streamText, tool } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Mock data retrieval functions
async function getStockData() {
  return [
    { symbol: "AAPL", price: 182.52, change: +1.2 },
    { symbol: "MSFT", price: 415.32, change: -0.5 },
    { symbol: "GOOGL", price: 173.63, change: +0.8 },
    { symbol: "AMZN", price: 178.22, change: +1.5 },
    { symbol: "META", price: 474.99, change: +2.1 },
  ]
}

async function getWeatherData() {
  return [
    { city: "New York", temp: 72, condition: "Sunny" },
    { city: "London", temp: 65, condition: "Cloudy" },
    { city: "Tokyo", temp: 80, condition: "Rainy" },
    { city: "Sydney", temp: 68, condition: "Partly Cloudy" },
  ]
}

async function getNewsHeadlines() {
  return [
    { title: "Tech Stocks Rally Amid AI Advancements", source: "Financial Times" },
    { title: "New Climate Policy Announced", source: "Reuters" },
    { title: "Healthcare Innovation Summit Next Week", source: "Bloomberg" },
  ]
}

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages, dataSource } = await req.json()

  // Get the last user message
  const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()

  if (!lastUserMessage) {
    return new Response("No user message found", { status: 400 })
  }

  // Option 1: Using AI SDK directly with tools
  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are an intelligent agent that can query, reason, and act over real-time data.
You have access to various data sources and can perform analysis on them.
Always provide thoughtful, detailed responses based on the available data.
When appropriate, suggest actions the user might want to take based on your analysis.`,
    messages,
    tools: {
      getStockData: tool({
        description: "Get current stock market data for major tech companies",
        parameters: z.object({}),
        execute: async () => {
          return await getStockData()
        },
      }),
      getWeatherData: tool({
        description: "Get current weather data for major cities",
        parameters: z.object({}),
        execute: async () => {
          return await getWeatherData()
        },
      }),
      getNewsHeadlines: tool({
        description: "Get latest news headlines",
        parameters: z.object({}),
        execute: async () => {
          return await getNewsHeadlines()
        },
      }),
    },
    maxSteps: 5,
  })

  return result.toDataStreamResponse()

  // Option 2: Using LlamaIndex (commented out but available as an alternative)
  /*
  const llm = new OpenAI({ model: 'gpt-4o' });
  const chatEngine = new SimpleChatEngine({ llm });
  
  const stream = await chatEngine.chat({
    message: lastUserMessage.content,
    chatHistory: messages.slice(0, -1).map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
    stream: true,
  });
  
  return LlamaIndexAdapter.toDataStreamResponse(stream);
  */
}
