import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Clipboard, ThumbsUp, ThumbsDown } from 'lucide-react'

interface StreamingResponseProps {
  content: string;
  isComplete: boolean;
  question: string;
}

export function StreamingResponse({ content, isComplete, question }: StreamingResponseProps) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        if (currentIndex < content.length) {
          setDisplayedContent(prev => prev + content[currentIndex])
          setCurrentIndex(prev => prev + 1)
        } else {
          clearInterval(interval)
        }
      }, 30)

      return () => clearInterval(interval)
    } else {
      setDisplayedContent(content)
    }
  }, [content, currentIndex, isComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">{question}</h2>
      <div className="prose max-w-none text-gray-600">
        {displayedContent}
      </div>
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 pt-2"
        >
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Clipboard className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <ThumbsUp className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <ThumbsDown className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

