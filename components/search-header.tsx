import { motion } from 'framer-motion'

interface SearchHeaderProps {
  query: string
}

export function SearchHeader({ query }: SearchHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10"
    >
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-semibold">{query}</h1>
      </div>
    </motion.div>
  )
}
