import { motion } from "framer-motion"
import { CircleIcon } from 'lucide-react'

interface SearchingStateProps {
  searchQuery: string;
}

export function SearchingState({ searchQuery }: SearchingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-3 text-gray-600"
    >
      <CircleIcon className="w-6 h-6" />
      <span>Searching for {searchQuery}...</span>
    </motion.div>
  )
}

