import Logo from '@/lib/icons/Logo'
import { motion } from 'framer-motion'

interface LoadingStateProps {
  query: string
}

export function LoadingState({ query }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 text-gray-600 p-4"
    >
      <Logo className="w-5 h-5" />
      <span>Searching for {query.toLowerCase()}...</span>
    </motion.div>
  )
}
