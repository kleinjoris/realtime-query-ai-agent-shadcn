"use client"

import type { Dispatch, SetStateAction } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AgentControlsProps {
  activeDataSource: string
  setActiveDataSource: Dispatch<SetStateAction<string>>
  showThinking: boolean
  setShowThinking: Dispatch<SetStateAction<boolean>>
}

export function AgentControls({
  activeDataSource,
  setActiveDataSource,
  showThinking,
  setShowThinking,
}: AgentControlsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
        <Switch
          id="show-thinking"
          checked={showThinking}
          onCheckedChange={setShowThinking}
          className="data-[state=checked]:bg-purple-500"
        />
        <Label htmlFor="show-thinking" className="text-purple-800 font-medium">
          Show Agent Thinking
        </Label>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-pink-100 to-orange-100 border border-pink-200">
        <Label className="block mb-3 text-pink-800 font-medium">Data Source</Label>
        <RadioGroup value={activeDataSource} onValueChange={setActiveDataSource} className="space-y-2">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
            <RadioGroupItem value="stocks" id="stocks" className="text-purple-600 border-purple-400" />
            <Label htmlFor="stocks" className="text-purple-800">
              Stock Market Data
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
            <RadioGroupItem value="weather" id="weather" className="text-pink-600 border-pink-400" />
            <Label htmlFor="weather" className="text-pink-800">
              Weather Forecasts
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
            <RadioGroupItem value="news" id="news" className="text-orange-600 border-orange-400" />
            <Label htmlFor="news" className="text-orange-800">
              News Headlines
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
