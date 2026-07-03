// Format date to readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Format time ago
export const timeAgo = (date) => {
  const now = new Date()
  const secondsPast = (now - new Date(date)) / 1000

  if (secondsPast < 60) return 'just now'
  if (secondsPast < 3600) return `${Math.floor(secondsPast / 60)}m ago`
  if (secondsPast < 86400) return `${Math.floor(secondsPast / 3600)}h ago`
  if (secondsPast < 604800) return `${Math.floor(secondsPast / 86400)}d ago`
  
  return formatDate(date)
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get color by priority
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'text-blue-600 bg-blue-50',
    medium: 'text-warning bg-warning/10',
    high: 'text-secondary bg-secondary/10',
  }
  return colors[priority] || colors.low
}

// Get color by status
export const getStatusColor = (status) => {
  const colors = {
    pending: 'text-warning bg-warning/10',
    in_progress: 'text-primary bg-primary/10',
    resolved: 'text-success bg-success/10',
    closed: 'text-gray-600 bg-gray-100',
  }
  return colors[status] || colors.pending
}

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Truncate text
export const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

// Format numbers with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Calculate percentage
export const calculatePercentage = (value, total) => {
  return total === 0 ? 0 : Math.round((value / total) * 100)
}
