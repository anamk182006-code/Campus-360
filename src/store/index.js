import { create } from 'zustand'
import { USER_ROLES, NOTIFICATION_TYPES } from '../constants'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (userData) => set({ 
    user: userData, 
    isAuthenticated: true 
  }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),
  
  updateProfile: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),
}))

export const useNotificationStore = create((set) => ({
  notifications: [],
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        id: Date.now(),
        type: NOTIFICATION_TYPES.INFO,
        duration: 3000,
        ...notification,
      }
    ]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearNotifications: () => set({ notifications: [] }),
}))

export const useThemeStore = create((set) => ({
  isDark: false,
  
  toggleTheme: () => set((state) => ({
    isDark: !state.isDark
  })),
  
  setTheme: (isDark) => set({ isDark }),
}))

export const useIssueStore = create((set) => ({
  issues: [],
  loading: false,
  
  setIssues: (issues) => set({ issues }),
  
  addIssue: (issue) => set((state) => ({
    issues: [issue, ...state.issues]
  })),
  
  updateIssue: (id, updates) => set((state) => ({
    issues: state.issues.map(issue => 
      issue.id === id ? { ...issue, ...updates } : issue
    )
  })),
  
  deleteIssue: (id) => set((state) => ({
    issues: state.issues.filter(issue => issue.id !== id)
  })),
  
  setLoading: (loading) => set({ loading }),
}))

export const useFilterStore = create((set) => ({
  searchTerm: '',
  selectedStatus: 'all',
  selectedPriority: 'all',
  selectedType: 'all',
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setSelectedPriority: (priority) => set({ selectedPriority: priority }),
  setSelectedType: (type) => set({ selectedType: type }),
  
  resetFilters: () => set({
    searchTerm: '',
    selectedStatus: 'all',
    selectedPriority: 'all',
    selectedType: 'all',
  }),
}))
