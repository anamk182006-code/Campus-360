import { motion, AnimatePresence } from 'framer-motion'
import { forwardRef, useState } from 'react'

export const Modal = forwardRef(
  (
    {
      isOpen = false,
      onClose,
      children,
      title = '',
      closeButton = true,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-md',
      lg: 'w-full max-w-lg',
      xl: 'w-full max-w-xl',
      '2xl': 'w-full max-w-2xl',
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className={`${sizes[size]} bg-white dark:bg-dark-card rounded-lg shadow-xl ${className}`}
                {...props}
              >
                {(title || closeButton) && (
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-border">
                    {title && <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>}
                    {closeButton && (
                      <button
                        onClick={onClose}
                        className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}
                <div className="p-6">{children}</div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

Modal.displayName = 'Modal'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  }
}

export const Dialog = forwardRef(
  (
    {
      isOpen = false,
      onClose,
      onConfirm,
      title = '',
      message = '',
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      type = 'info',
      className = '',
      ...props
    },
    ref
  ) => {
    const iconStyles = {
      info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      error: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    }

    const icons = {
      info: 'ℹ',
      warning: '⚠',
      error: '✕',
      success: '✓',
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className={`w-full max-w-sm bg-white dark:bg-dark-card rounded-lg shadow-xl ${className}`}
                {...props}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl ${iconStyles[type]}`}>
                      {icons[type]}
                    </div>
                    <div className="flex-1">
                      {title && (
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {title}
                        </h3>
                      )}
                      {message && (
                        <p className="text-gray-600 dark:text-gray-400">{message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3 justify-end">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {cancelText}
                    </button>
                    <button
                      onClick={() => {
                        onConfirm?.()
                        onClose()
                      }}
                      className={`px-4 py-2 rounded-lg text-white transition-colors font-medium ${
                        type === 'error'
                          ? 'bg-red-500 hover:bg-red-600'
                          : type === 'warning'
                          ? 'bg-yellow-500 hover:bg-yellow-600'
                          : type === 'success'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      {confirmText}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

Dialog.displayName = 'Dialog'

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}

export const Drawer = forwardRef(
  (
    {
      isOpen = false,
      onClose,
      children,
      title = '',
      position = 'right',
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: position === 'right' || position === 'left' ? 'w-64' : 'h-64',
      md: position === 'right' || position === 'left' ? 'w-80' : 'h-80',
      lg: position === 'right' || position === 'left' ? 'w-96' : 'h-96',
      full: 'w-full h-full',
    }

    const positionClasses = {
      right: 'right-0 top-0 h-full',
      left: 'left-0 top-0 h-full',
      top: 'top-0 left-0 w-full',
      bottom: 'bottom-0 left-0 w-full',
    }

    const slideVariants = {
      right: { initial: { x: 400 }, animate: { x: 0 }, exit: { x: 400 } },
      left: { initial: { x: -400 }, animate: { x: 0 }, exit: { x: -400 } },
      top: { initial: { y: -400 }, animate: { y: 0 }, exit: { y: -400 } },
      bottom: { initial: { y: 400 }, animate: { y: 0 }, exit: { y: 400 } },
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              ref={ref}
              initial={slideVariants[position].initial}
              animate={slideVariants[position].animate}
              exit={slideVariants[position].exit}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed ${positionClasses[position]} ${sizes[size]} bg-white dark:bg-dark-card shadow-lg z-50 flex flex-col ${className}`}
              {...props}
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-border">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

Drawer.displayName = 'Drawer'

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  }
}

export const Tooltip = forwardRef(
  (
    {
      children,
      content = '',
      position = 'top',
      delay = 0,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false)

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => setTimeout(() => setIsVisible(true), delay)}
        onMouseLeave={() => setIsVisible(false)}
        {...props}
      >
        {children}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`absolute ${positionClasses[position]} px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap z-50 ${className}`}
            >
              {content}
              <div
                className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 ${
                  position === 'top'
                    ? 'top-full left-1/2 -translate-x-1/2 -mt-1'
                    : position === 'bottom'
                    ? 'bottom-full left-1/2 -translate-x-1/2 mb-0'
                    : position === 'left'
                    ? 'left-full top-1/2 -translate-y-1/2 ml-0'
                    : 'right-full top-1/2 -translate-y-1/2 mr-0'
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export const Popover = forwardRef(
  (
    {
      children,
      content = '',
      position = 'bottom',
      trigger = 'click',
      className = '',
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => trigger === 'hover' && setIsOpen(true)}
        onMouseLeave={() => trigger === 'hover' && setIsOpen(false)}
        {...props}
      >
        <div
          onClick={() => trigger === 'click' && setIsOpen(!isOpen)}
          className="cursor-pointer"
        >
          {children}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className={`absolute ${positionClasses[position]} bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-lg z-50 ${className}`}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Popover.displayName = 'Popover'
