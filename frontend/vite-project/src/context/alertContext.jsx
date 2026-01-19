import { createContext, useContext, useState } from 'react'
import { Check, X, AlertCircle } from 'lucide-react' // Tambahkan AlertCircle untuk error
import { motion, AnimatePresence } from 'motion/react' // AnimatePresence penting untuk animasi keluar

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    headingMessage: '',
    type: 'success', // default ke success
  })

  const showAlert = (
    message,
    type = 'success',
    headingMessage = 'Notification'
  ) => {
    setAlert({ show: true, message, type, headingMessage })
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }))
    }, 4000)
  }

  const isFailed = alert.type === 'failed'
  const themeClass = isFailed
    ? {
        bg: 'bg-red-400/20',
        border: 'border-red-400',
        text: 'text-red-600',
        sub: 'text-red-500',
        icon: <AlertCircle className="text-red-400" />,
      }
    : {
        bg: 'bg-blue-400/20',
        border: 'border-blue-400',
        text: 'text-blue-600',
        sub: 'text-blue-500',
        icon: <Check className="text-blue-400" />,
      }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <AnimatePresence>
        {alert.show && (
          <motion.div
            layout
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed flex ${themeClass.bg} z-[999] top-6 right-10 
                      gap-x-3 p-3 border ${themeClass.border} rounded-md backdrop-blur-md shadow-lg`}
          >
            <div className="h-full">{themeClass.icon}</div>
            <div className="min-w-[150px]">
              <p
                className={`text-[.8rem] font-bold ${themeClass.text} leading-none mb-1`}
              >
                {alert.headingMessage}
              </p>
              <p className={`text-[.7rem] ${themeClass.sub} font-medium`}>
                {alert.message}
              </p>
            </div>
            <button
              onClick={() => setAlert((prev) => ({ ...prev, show: false }))}
            >
              <X size={14} className={themeClass.sub} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)
