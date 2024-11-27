import { motion } from 'framer-motion'
import Logo from '@/lib/icons/Logo'

interface SearchingStateProps {
  searchQuery: string
}

export function SearchingState({ searchQuery }: SearchingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-3 text-gray-600"
    >
      <Logo className="w-6 h-6" />
      <span className="font-semibold animate-shimmer bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 bg-[length:200%_100%] bg-clip-text text-transparent">
        Searching for {searchQuery}...
      </span>
    </motion.div>
  )
}
