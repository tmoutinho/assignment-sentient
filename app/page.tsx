'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ChatInput } from '@/components/chat-input'
import { SearchingState } from '@/components/searching-state'
import { StreamingResponse } from '@/components/streaming-response'
import { MobileNavigation } from '@/components/mobile-navigation'
import Logo from '@/lib/icons/Logo'

const MOCK_RESPONSE = `Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing, feeling, tasting, or smelling.

Key Points:
• Sentient beings are able to feel things or sense them.
• The term is often used in phrases like "sentient beings" and "sentient creatures," emphasizing that things that don't have life don't have feelings.

Related Concepts:
• Sentience is an important concept in ethics, particularly in utilitarianism, as it forms a basis for determining which entities deserve moral consideration.
• In Asian religions, the word "sentience" has been used to translate various concepts.
• In science fiction, the word "sentience" is often used to describe the ability of artificial intelligence or other non-human entities to experience consciousness or emotions.`

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [response, setResponse] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const hasContent = isLoading || isStreaming || response

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    setResponse('')
    setHasSearched(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsStreaming(true)
    setResponse(MOCK_RESPONSE)

    await new Promise((resolve) =>
      setTimeout(resolve, MOCK_RESPONSE.length * 30 + 500),
    )
    setIsStreaming(false)
  }

  const suggestedQuestions = [
    "What's the meaning of life?",
    'How do you define love?',
    "What's the meaning of AI?",
  ]

  return (
    <div className="flex h-screen bg-white">
      {!isMobile && <Sidebar />}

      <div className="container mx-auto h-screen relative">
        {hasSearched ? (
          <AnimatePresence mode="wait">
            <div className="h-screen flex flex-col relative">
              <div className="sticky top-0 bg-white z-10 p-4 border-b">
                {inputValue}
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {isLoading && <SearchingState searchQuery={inputValue} />}

                {(isStreaming || (!isLoading && response)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg space-y-4"
                  >
                    <StreamingResponse
                      content={response}
                      isComplete={!isStreaming}
                      question={inputValue}
                    />
                  </motion.div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <ChatInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  placeholder="What is Sentient?"
                  fixed
                />
              </div>
            </div>
          </AnimatePresence>
        ) : (
          <>
            <div className="flex justify-center flex-col items-center px-4 overflow-y-auto pb-24 h-screen">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12"
              >
                <Logo className="w-12 h-12" />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-2xl space-y-4"
              >
                <ChatInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  placeholder="What is Sentient?"
                />

                {!hasContent && (
                  <motion.div
                    className="grid grid-cols-3 mt-4 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-[#808080] border-[#E5E5E5] border-2 bg-[#F4F4F4] h-[70px] rounded-[20px] font-medium text-sm"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </>
        )}

        {isMobile && <MobileNavigation />}
      </div>
    </div>
  )
}
