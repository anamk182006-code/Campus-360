import { motion } from 'framer-motion'
import { forwardRef } from 'react'

export const Card = forwardRef(
  (
    {
      children,
      className = '',
      hover = false,
      border = false,
      shadow = true,
      padding = true,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-white dark:bg-dark-card rounded-lg transition-all duration-300'
    const shadowStyles = shadow ? 'shadow-md hover:shadow-lg' : ''
    const borderStyles = border ? 'border border-gray-200 dark:border-dark-border' : ''
    const paddingStyles = padding ? 'p-6' : ''
    const hoverStyles = hover ? 'hover:scale-105' : ''

    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { scale: 1.02 } : {}}
        className={`${baseStyles} ${shadowStyles} ${borderStyles} ${paddingStyles} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 pb-4 border-b border-gray-200 dark:border-dark-border ${className}`} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${className}`} {...props}>
    {children}
  </h3>
)

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${className}`} {...props}>
    {children}
  </p>
)

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-6 pt-4 border-t border-gray-200 dark:border-dark-border flex gap-3 ${className}`} {...props}>
    {children}
  </div>
)

export const Form = forwardRef(
  ({ children, onSubmit, className = '', ...props }, ref) => (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
      {...props}
    >
      {children}
    </form>
  )
)

Form.displayName = 'Form'

export const FormGroup = ({ children, className = '', ...props }) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {children}
  </div>
)

export const FormLabel = forwardRef(
  ({ children, required = false, className = '', ...props }, ref) => (
    <label
      ref={ref}
      className={`block text-sm font-medium text-gray-900 dark:text-white ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
)

FormLabel.displayName = 'FormLabel'

export const FormInput = forwardRef(
  (
    {
      type = 'text',
      placeholder = '',
      error = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none dark:bg-dark-input dark:text-white'
    const borderStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-300 dark:border-dark-border focus:border-primary focus:ring-primary/20'
    const disabledStyles = disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
      : ''

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${borderStyles} ${disabledStyles} ${className}`}
        {...props}
      />
    )
  }
)

FormInput.displayName = 'FormInput'

export const FormTextarea = forwardRef(
  (
    {
      placeholder = '',
      error = false,
      disabled = false,
      rows = 4,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none resize-none dark:bg-dark-input dark:text-white'
    const borderStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-300 dark:border-dark-border focus:border-primary focus:ring-primary/20'
    const disabledStyles = disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
      : ''

    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`${baseStyles} ${borderStyles} ${disabledStyles} ${className}`}
        {...props}
      />
    )
  }
)

FormTextarea.displayName = 'FormTextarea'

export const FormSelect = forwardRef(
  (
    {
      options = [],
      placeholder = 'Select an option',
      error = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none dark:bg-dark-input dark:text-white'
    const borderStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-300 dark:border-dark-border focus:border-primary focus:ring-primary/20'
    const disabledStyles = disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
      : ''

    return (
      <select
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${borderStyles} ${disabledStyles} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)

FormSelect.displayName = 'FormSelect'

export const FormCheckbox = forwardRef(
  ({ label = '', error = false, disabled = false, className = '', ...props }, ref) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={`w-5 h-5 rounded border-2 transition-all ${
          error
            ? 'border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 focus:ring-primary/20'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />
      {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  )
)

FormCheckbox.displayName = 'FormCheckbox'

export const FormRadio = forwardRef(
  ({ label = '', error = false, disabled = false, className = '', ...props }, ref) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        ref={ref}
        type="radio"
        disabled={disabled}
        className={`w-5 h-5 rounded-full border-2 transition-all ${
          error
            ? 'border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 focus:ring-primary/20'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />
      {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  )
)

FormRadio.displayName = 'FormRadio'

export const FormError = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-red-500 flex items-center gap-1 ${className}`} {...props}>
    <span className="inline-block">⚠</span>
    {children}
  </p>
)

export const FormSuccess = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-green-500 flex items-center gap-1 ${className}`} {...props}>
    <span className="inline-block">✓</span>
    {children}
  </p>
)

export const FormHelperText = ({ children, className = '', ...props }) => (
  <p className={`text-xs text-gray-500 dark:text-gray-400 ${className}`} {...props}>
    {children}
  </p>
)
