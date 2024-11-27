'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ChatInput } from '@/components/chat-input'
import { SearchingState } from '@/components/searching-state'
import { StreamingResponse } from '@/components/streaming-response'
import { MobileNavigation } from '@/components/mobile-navigation'
import Logo from '@/lib/icons/Logo'
import Plus from '@/lib/icons/Plus'
import Currency from '@/lib/icons/Currency'
import { cn } from '@/lib/utils'

const MOCK_RESPONSE = `Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing. feeling, tasting, or smelling.


Key Points:

- Sentient beings are able to feel things or sense them.

- The term is often used in phrases like "sentient beings" and "sentient creatures," emphasizing that things that don't have life don't have feelings.

- Sentient is a formal adjective that can be used in different contexts and languages.

- The word has its roots in Latin, with the earliest known use dating back to the early 1600s.


Examples and Usage:

- Man is a sentient being.

- There was no sign of any sentient life or activity.

- Sentient is used nouns like "being" to describe entities that possess consciousness or the ability to feel.


Related Concepts:

- Sentience is an important concept in ethics, particularly in utilitarianism, as it forms a basis for determining which entities deserve moral consideration.

- In Asian religions, the word "sentience" has been used to translate various concepts. 

- In science fiction, the word "sentience" is often used to describe the ability of artificial intelligence or other non-human entities to experience consciousness or emotions.`

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
      {isMobile ? (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-white border-b border-[#E5E5E5] z-20 h-[65px]">
          <Plus className="w-6 h-6" fill="black" />
          <Currency className="w-9 h-9" />
        </div>
      ) : (
        <Sidebar />
      )}

      <div className="container mx-auto h-screen relative">
        {hasSearched ? (
          <AnimatePresence mode="wait">
            <div
              className={cn(
                'flex flex-col relative',
                isMobile
                  ? 'h-[calc(100vh-120px)] mt-[65px] p-4 w-full'
                  : 'h-screen',
              )}
            >
              <div
                className={cn(
                  'absolute top-0 bg-white z-10 border border-t-0 border-[#E5E5E5] flex items-center',
                  !isMobile
                    ? 'rounded-br-[41.19px] rounded-bl-[41.19px] left-0 right-0 py-[29.43px] px-[49.43px] text-3xl '
                    : 'h-[50px] rounded-br-[20px] rounded-bl-[20px] left-4 right-4 px-5 text-xl',
                )}
              >
                <h2 className="font-semibold text-[#212222]">{inputValue}</h2>
              </div>

              <div
                className={cn(
                  'overflow-y-auto',
                  !isMobile
                    ? 'mt-[120px] mb-[140px] px-[49.43px]'
                    : 'mt-[55px] mb-[140px] px-5',
                )}
              >
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
                      isMobile={isMobile}
                    />
                  </motion.div>
                )}
              </div>

              <div
                className={cn(
                  'absolute  left-0 right-0 p-4 bg-white',
                  !isMobile ? 'bottom-0' : 'bottom-[20px]',
                )}
              >
                <ChatInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  placeholder="What is Sentient?"
                  isMobile={isMobile}
                  fixed
                />
              </div>
            </div>
          </AnimatePresence>
        ) : (
          <>
            <div
              className={cn(
                'flex flex-col items-center px-4 overflow-y-auto pb-24 h-screen',
                !isMobile ? 'justify-center' : 'justify-end',
              )}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(!isMobile ? 'mb-12' : 'mb-5')}
              >
                <Logo className={cn(!isMobile ? 'w-12 h-12' : 'w-20 h-20')} />
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
                  isMobile={isMobile}
                />

                {!hasContent && (
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 mt-4 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setInputValue(question)}
                        className={cn(
                          'text-[#808080] border-[#E5E5E5] border-2 bg-[#F4F4F4]',
                          isMobile
                            ? 'rounded-[5.38px] h-[40.65px] text-[10.75px] font-semibold'
                            : 'rounded-[20px] h-[70px] text-sm font-medium',
                        )}
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
