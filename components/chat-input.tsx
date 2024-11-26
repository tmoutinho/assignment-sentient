'use client'

import { Card } from './ui/card'
import RoundedPlus from '@/lib/icons/RoundedPlus'
import RoundedEnter from '@/lib/icons/RoundedEnter'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ChatInputProps {
  inputValue: string
  setInputValue: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  placeholder?: string
  fixed?: boolean
}

export function ChatInput({
  inputValue,
  setInputValue,
  onSubmit,
  isLoading,
  placeholder = 'Ask me anything...',
  fixed = false,
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSubmit()
    }
  }

  return (
    <motion.div
      initial={fixed ? { opacity: 0, y: 100 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={fixed ? 'fixed bottom-0 left-0 right-0 p-4 bg-white z-10' : ''}
    >
      <Card className="p-3 bg-[#F1F1F1] rounded-[40.92px]">
        <form
          onSubmit={handleSubmit}
          className="flex px-5 pb-3 flex-col bg-white border-2 border-[#D7D7D7] rounded-[24.55px] h-[125.73px]"
        >
          <input
            placeholder={placeholder}
            className="flex-1 py-2 focus:outline-none bg-transparent placeholder:text-[#808080] text-[#212222] font-medium text-xl leading-[57.08px] tracking-[-0.02em] resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <RoundedPlus className="w-5 h-5" />
                <span className="text-[#9C9C9C]">Attach</span>
              </div>

              <div className="rounded-full bg-[#F6F6F6] flex items-center gap-0.5 p-1">
                <div className="text-sm text-[#212222] font-semibold tracking-[-0.02em] rounded-full border-2 border-[#EBEBEB] bg-white px-4">
                  4s - mini
                </div>
                <div className="text-sm text-[#AEAEAE] px-2 hidden md:block">
                  s1 - preview
                </div>
              </div>
            </div>

            <button type="submit">
              <RoundedEnter
                className={cn(
                  'w-8 h-8',
                  inputValue !== '' && '[&_circle]:fill-[#f1f1f1]',
                )}
              />
            </button>
          </div>
        </form>
      </Card>
    </motion.div>
  )
}
