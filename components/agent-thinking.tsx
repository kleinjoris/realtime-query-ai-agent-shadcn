"use client"

import type { Message } from "@ai-sdk/react"
import { useState } from "react"

interface AgentThinkingProps {
  messages: Message[]
}

export function AgentThinking({ messages }: AgentThinkingProps) {
  const [expanded, setExpanded] = useState(false)

  // Get the last assistant message for thinking visualization
  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant")

  if (!lastAssistantMessage) return null

  // Simulate the agent's thinking process
  const thinking = [
    {
      step: "Query Analysis",
      content: "Analyzing user query for intent and required data sources.",
      color: "from-purple-100 to-purple-200",
      borderColor: "border-purple-300",
      textColor: "text-purple-700",
    },
    {
      step: "Data Retrieval",
      content: "Retrieving relevant documents and real-time data from selected sources.",
      color: "from-pink-100 to-pink-200",
      borderColor: "border-pink-300",
      textColor: "text-pink-700",
    },
    {
      step: "Reasoning",
      content: "Applying multi-step reasoning to synthesize information and form conclusions.",
      color: "from-orange-100 to-orange-200",
      borderColor: "border-orange-300",
      textColor: "text-orange-700",
    },
    {
      step: "Action Planning",
      content: "Determining if actions are needed based on user request and available tools.",
      color: "from-amber-100 to-amber-200",
      borderColor: "border-amber-300",
      textColor: "text-amber-700",
    },
    {
      step: "Response Generation",
      content: "Formulating a comprehensive response with relevant insights and visualizations.",
      color: "from-teal-100 to-teal-200",
      borderColor: "border-teal-300",
      textColor: "text-teal-700",
    },
  ]

  return (
    <div className="space-y-3">
      {thinking.slice(0, expanded ? thinking.length : 2).map((step, index) => (
        <div
          key={index}
          className={`text-sm rounded-xl p-3 border shadow-sm bg-gradient-to-r ${step.color} ${step.borderColor}`}
        >
          <div className={`font-medium ${step.textColor}`}>{step.step}</div>
          <div className="text-gray-700">{step.content}</div>
        </div>
      ))}

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm"
      >
        {expanded ? "Show Less" : "Show More Steps"}
      </button>
    </div>
  )
}
