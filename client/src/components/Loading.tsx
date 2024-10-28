
import { motion } from 'framer-motion'
import { Egg, Coffee, Flame, Utensils, Clock } from 'lucide-react'

export default function Loading() {
  const icons = [
    { Icon: Egg, color: 'text-yellow-400' },
    { Icon: Coffee, color: 'text-black' },
    { Icon: Flame, color: 'text-orange-500' },
    { Icon: Utensils, color: 'text-gray-600' },
    { Icon: Clock, color: 'text-blue-500' },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="text-center">
        <motion.div
          className="flex space-x-4 mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {icons.map(({ Icon, color }, index) => (
            <motion.div
              key={index}
              className={`p-4 bg-white rounded-full shadow-lg ${color}`}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                repeat: Infinity,
                repeatDelay: icons.length * 0.15
              }}
            >
              <Icon size={24} />
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="text-xl font-semibold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Cooking up something delicious...
        </motion.p>
      </div>
    </div>
  )
}