import { motion, AnimatePresence } from 'framer-motion'
import { forwardRef, useState, useEffect } from 'react'

export const Alert = forwardRef(
  (
    {
      type = 'info',
      title = '',
      message = '',
      closeable = true,
      onClose,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true)

    const typeStyles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-900 dark:text-blue-100',
      success:
        'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-900 dark:text-green-100',
      warning:
        'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-900 dark:text-yellow-100',
      error: 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-900 dark:text-red-100',
    }

    const icons = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      error: '✕',
    }

    const handleClose = () => {
      setIsVisible(false)
      onClose?.()
    }

    if (!isVisible) return null

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`p-4 rounded-lg ${typeStyles[type]} ${className}`}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 text-lg">{icon || icons[type]}</span>
          <div className="flex-1">
            {title && <h4 className="font-semibold mb-1">{title}</h4>}
            {message && <p className="text-sm opacity-90">{message}</p>}
          </div>
          {closeable && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
            >
              ×
            </button>
          )}
        </div>
      </motion.div>
    )
  }
)

Alert.displayName = 'Alert'

export const Toast = forwardRef(
  (
    {
      type = 'info',
      title = '',
      message = '',
      duration = 5000,
      onClose,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, onClose])

    const typeStyles = {
      info: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    }

    const icons = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      error: '✕',
    }

    if (!isVisible) return null

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className={`flex items-start gap-3 p-4 rounded-lg shadow-lg text-white ${typeStyles[type]} ${className}`}
        {...props}
      >
        <span className="flex-shrink-0 text-lg">{icon || icons[type]}</span>
        <div className="flex-1">
          {title && <h4 className="font-semibold">{title}</h4>}
          {message && <p className="text-sm opacity-90">{message}</p>}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      </motion.div>
    )
  }
)

Toast.displayName = 'Toast'

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...toast, id }])
    return id
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}

export const ToastContainer = ({ toasts, onRemove, position = 'bottom-right' }) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2 max-w-sm pointer-events-none`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div key={toast.id} className="pointer-events-auto">
            <Toast
              type={toast.type}
              title={toast.title}
              message={toast.message}
              duration={0}
              onClose={() => onRemove(toast.id)}
              icon={toast.icon}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export const Notification = forwardRef(
  (
    {
      type = 'info',
      title = '',
      message = '',
      actions = [],
      onDismiss,
      className = '',
      ...props
    },
    ref
  ) => {
    const typeStyles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
      success:
        'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
      warning:
        'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800',
      error: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
    }

    const typeTextStyles = {
      info: 'text-blue-900 dark:text-blue-100',
      success: 'text-green-900 dark:text-green-100',
      warning: 'text-yellow-900 dark:text-yellow-100',
      error: 'text-red-900 dark:text-red-100',
    }

    const icons = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      error: '✕',
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`p-4 rounded-lg ${typeStyles[type]} ${className}`}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className={`flex-shrink-0 text-lg ${typeTextStyles[type]}`}>{icons[type]}</span>
            <div>
              {title && (
                <h4 className={`font-semibold mb-1 ${typeTextStyles[type]}`}>{title}</h4>
              )}
              {message && <p className={`text-sm ${typeTextStyles[type]} opacity-90`}>{message}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  action.variant === 'primary'
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {action.label}
              </button>
            ))}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }
)

Notification.displayName = 'Notification'

export const Badge = forwardRef(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      rounded = 'full',
      className = '',
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white',
      primary: 'bg-primary text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    const roundedClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded',
      lg: 'rounded-lg',
      full: 'rounded-full',
    }

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-medium ${variants[variant]} ${sizes[size]} ${roundedClasses[rounded]} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export const Banner = forwardRef(
  (
    {
      type = 'info',
      title = '',
      message = '',
      action,
      onClose,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true)

    const typeStyles = {
      info: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    }

    if (!isVisible) return null

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${typeStyles[type]} text-white p-4 ${className}`}
        {...props}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="font-semibold">{title}</h3>}
            {message && <p className="text-sm opacity-90">{message}</p>}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {action && (
              <button
                onClick={action.onClick}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
              >
                {action.label}
              </button>
            )}
            {onClose && (
              <button
                onClick={() => {
                  setIsVisible(false)
                  onClose()
                }}
                className="text-lg hover:opacity-70 transition-opacity"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }
)

Banner.displayName = 'Banner'

export const Callout = forwardRef(
  (
    {
      children,
      type = 'info',
      title = '',
      className = '',
      ...props
    },
    ref
  ) => {
    const typeStyles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500',
      success: 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500',
      error: 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500',
    }

    const typeTextStyles = {
      info: 'text-blue-900 dark:text-blue-100',
      success: 'text-green-900 dark:text-green-100',
      warning: 'text-yellow-900 dark:text-yellow-100',
      error: 'text-red-900 dark:text-red-100',
    }

    return (
      <div
        ref={ref}
        className={`p-4 rounded-lg ${typeStyles[type]} ${className}`}
        {...props}
      >
        {title && <h4 className={`font-semibold mb-2 ${typeTextStyles[type]}`}>{title}</h4>}
        <div className={`text-sm ${typeTextStyles[type]} opacity-90`}>{children}</div>
      </div>
    )
  }
)

Callout.displayName = 'Callout'
