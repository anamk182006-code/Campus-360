import { motion } from 'framer-motion'
import { FiHome, FiFileText, FiBarChart3, FiUsers, FiSettings, FiChevronDown } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store'
import { useState } from 'react'

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()
  const [expandedMenu, setExpandedMenu] = useState(null)

  const studentMenuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiFileText, label: 'Report Issue', path: '/report' },
    { icon: FiFileText, label: 'My Reports', path: '/my-reports' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ]

  const staffMenuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiFileText, label: 'Tasks', path: '/tasks' },
    { icon: FiFileText, label: 'Assigned', path: '/assigned' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ]

  const adminMenuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/admin' },
    { icon: FiBarChart3, label: 'Analytics', path: '/analytics' },
    { icon: FiUsers, label: 'Staff Management', path: '/staff-management' },
    { icon: FiFileText, label: 'All Reports', path: '/all-reports' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ]

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return studentMenuItems
      case 'staff':
        return staffMenuItems
      case 'admin':
        return adminMenuItems
      default:
        return []
    }
  }

  const menuItems = getMenuItems()
  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border z-40 md:relative md:top-0 md:h-screen md:translate-x-0 overflow-y-auto"
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              isActive={isActive(item.path)}
              onClick={() => {
                navigate(item.path)
                setIsOpen(false)
              }}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-dark-border">
          <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

function SidebarItem({ item, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 4 }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive
          ? 'bg-primary text-white shadow-lg'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
      }`}
    >
      <Icon className="text-lg flex-shrink-0" />
      <span className="font-medium text-sm">{item.label}</span>
      {isHovered && isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="ml-auto w-1 h-6 bg-white rounded-full"
        />
      )}
    </motion.button>
  )
}
