// Constants for issue types
export const ISSUE_TYPES = [
  { id: 'electrical', label: 'Electrical', icon: '⚡' },
  { id: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
  { id: 'furniture', label: 'Furniture', icon: '🪑' },
  { id: 'plumbing', label: 'Plumbing', icon: '🚰' },
  { id: 'internet', label: 'Internet', icon: '📡' },
  { id: 'security', label: 'Security', icon: '🔒' },
]

// Priority levels
export const PRIORITY_LEVELS = [
  { id: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800', value: 1 },
  { id: 'medium', label: 'Medium', color: 'bg-warning/10 text-warning', value: 2 },
  { id: 'high', label: 'High', color: 'bg-secondary/10 text-secondary', value: 3 },
]

// Status constants
export const STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
}

export const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-warning/10 text-warning', badge: '🕐' },
  in_progress: { label: 'In Progress', color: 'bg-primary/10 text-primary', badge: '⏳' },
  resolved: { label: 'Resolved', color: 'bg-success/10 text-success', badge: '✓' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800', badge: '✓' },
}

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  STAFF: 'staff',
  ADMIN: 'admin',
}

// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  ISSUES: '/api/issues',
  USERS: '/api/users',
  STAFF: '/api/staff',
  FEEDBACK: '/api/feedback',
  ANALYTICS: '/api/analytics',
}

// Building blocks on campus
export const CAMPUS_BLOCKS = [
  'Block A', 'Block B', 'Block C', 'Block D', 'Block E',
  'Library', 'Auditorium', 'Sports Complex', 'Cafeteria', 'Admin Building'
]

// Departments
export const DEPARTMENTS = [
  'Electrical', 'Maintenance', 'Plumbing', 'Housekeeping', 'IT Support', 'Security'
]

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
}
