"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { AgentThinking } from "@/components/agent-thinking"
import { ChatInterface } from "@/components/chat-interface"
import { DataVisualizer } from "@/components/data-visualizer"
import { AgentControls } from "@/components/agent-controls"

export default function Home() {
  const [showThinking, setShowThinking] = useState(true)
  const [activeDataSource, setActiveDataSource] = useState("stocks")

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/agent",
    body: {
      dataSource: activeDataSource,
    },
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Intelligent Agent System
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="flex-1 overflow-auto mb-4 border rounded-2xl shadow-lg bg-white p-2">
              <ChatInterface messages={messages} isLoading={isLoading} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask the agent to analyze data, make predictions, or take actions..."
                className="flex-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-300 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-70 transition-all"
              >
                Send
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-bold mb-4 text-purple-700">Agent Controls</h2>
              <AgentControls
                activeDataSource={activeDataSource}
                setActiveDataSource={setActiveDataSource}
                showThinking={showThinking}
                setShowThinking={setShowThinking}
              />
            </div>

            {showThinking && messages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
                <h2 className="text-xl font-bold mb-4 text-pink-700">Agent Thinking</h2>
                <AgentThinking messages={messages} />
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h2 className="text-xl font-bold mb-4 text-orange-700">Data Visualization</h2>
              <DataVisualizer dataSource={activeDataSource} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
