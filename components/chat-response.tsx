import { motion } from "framer-motion"
import { CircleIcon } from 'lucide-react'

export function ChatResponse() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-lg p-4 space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <CircleIcon className="w-6 h-6" />
        <h2 className="text-lg font-semibold">Search for it</h2>
      </div>

      <p className="text-gray-700">
        Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing, feeling, tasting, or smelling.
      </p>

      <div className="space-y-4">
        <h3 className="font-semibold">Key Points:</h3>
        <ul className="space-y-2">
          <li>• Sentient beings are able to feel things or sense them.</li>
          <li>• The term is often used in phrases like "sentient beings" and "sentient creatures," emphasizing that things that don't have life don't have feelings.</li>
        </ul>
      </div>
    </motion.div>
  )
}

