import { motion } from 'framer-motion'
import { forwardRef } from 'react'

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      isLoading = false,
      icon: Icon,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-lg',
      secondary:
        'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary shadow-md hover:shadow-lg',
      outline:
        'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
      ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg',
      success:
        'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-md hover:shadow-lg',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-lg',
    }

    const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
      fullWidth ? 'w-full' : ''
    } ${className}`

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={buttonClass}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {Icon && <Icon className="text-lg" />}
            {children}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export const IconButton = forwardRef(
  (
    {
      icon: Icon,
      variant = 'primary',
      size = 'md',
      disabled = false,
      isLoading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'

    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-lg',
      secondary:
        'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary shadow-md hover:shadow-lg',
      outline: 'border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary',
      ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg',
    }

    const sizes = {
      sm: 'p-1.5 text-sm',
      md: 'p-2.5 text-base',
      lg: 'p-3 text-lg',
      xl: 'p-4 text-xl',
    }

    const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        disabled={disabled || isLoading}
        className={buttonClass}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
        ) : (
          Icon && <Icon />
        )}
      </motion.button>
    )
  }
)

IconButton.displayName = 'IconButton'

export const ButtonGroup = ({ children, className = '' }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {children}
    </div>
  )
}

export const LinkButton = forwardRef(
  (
    {
      children,
      href,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
      primary: 'text-primary hover:text-primary-dark underline-offset-4 hover:underline',
      secondary: 'text-secondary hover:text-secondary-dark underline-offset-4 hover:underline',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-primary hover:bg-primary/10',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const linkClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <motion.a
        ref={ref}
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={linkClass}
        {...props}
      >
        {Icon && <Icon className="text-lg" />}
        {children}
      </motion.a>
    )
  }
)

LinkButton.displayName = 'LinkButton'
