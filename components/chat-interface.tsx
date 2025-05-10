import type { Message } from "@ai-sdk/react"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatInterface({ messages, isLoading }: ChatInterfaceProps) {
  return (
    <div className="p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-2xl">
            <p className="text-purple-800 font-medium text-lg">
              Ask the agent to analyze data, make predictions, or take actions.
            </p>
            <p className="text-pink-700 mt-2">Example: "What are the current stock trends for tech companies?"</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "p-4 rounded-xl shadow-sm",
              message.role === "user"
                ? "bg-gradient-to-r from-purple-100 to-purple-200 ml-8 border-l-4 border-purple-400"
                : "bg-gradient-to-r from-pink-100 to-orange-100 mr-8 border-l-4 border-pink-400",
            )}
          >
            <div className={cn("font-semibold mb-2", message.role === "user" ? "text-purple-700" : "text-pink-700")}>
              {message.role === "user" ? "You" : "Agent"}
            </div>
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        ))
      )}

      {isLoading && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-100 to-orange-100 mr-8 border-l-4 border-pink-400 shadow-sm animate-pulse">
          <div className="font-semibold mb-2 text-pink-700">Agent</div>
          <div className="h-4 bg-white bg-opacity-60 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-white bg-opacity-60 rounded w-1/2"></div>
        </div>
      )}
    </div>
  )
}
