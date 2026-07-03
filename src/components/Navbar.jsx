import { useNavigate } from 'react-router-dom'
import { FiBell, FiMenu, FiX, FiLogOut, FiMoon, FiSun } from 'react-icons/fi'
import { useAuthStore, useNotificationStore, useThemeStore } from '../store'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { notifications } = useNotificationStore()
  const { isDark, toggleTheme } = useThemeStore()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border sticky top-0 z-40 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-lg text-primary hidden sm:block">Campus 360</span>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex gap-6">
            {user?.role === 'student' && (
              <>
                <NavLink onClick={() => navigate('/dashboard')} label="Dashboard" />
                <NavLink onClick={() => navigate('/report')} label="Report Issue" />
                <NavLink onClick={() => navigate('/my-reports')} label="My Reports" />
              </>
            )}
            {user?.role === 'staff' && (
              <>
                <NavLink onClick={() => navigate('/dashboard')} label="Dashboard" />
                <NavLink onClick={() => navigate('/tasks')} label="Tasks" />
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <NavLink onClick={() => navigate('/admin')} label="Dashboard" />
                <NavLink onClick={() => navigate('/analytics')} label="Analytics" />
                <NavLink onClick={() => navigate('/staff-management')} label="Staff" />
              </>
            )}
          </div>

          {/* Right - Icons and Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition"
            >
              <FiBell className="text-xl text-gray-600 dark:text-gray-300" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-pulse" />
              )}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition"
            >
              {isDark ? (
                <FiSun className="text-xl text-yellow-500" />
              ) : (
                <FiMoon className="text-xl text-gray-600" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
            >
              {showMenu ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>

            {/* User Menu */}
            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-dark-border">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition"
              >
                <FiLogOut className="text-xl text-secondary" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-dark-border py-4"
          >
            <div className="space-y-2">
              <MobileNavLink onClick={() => navigate('/dashboard')} label="Dashboard" />
              <MobileNavLink onClick={() => navigate('/report')} label="Report Issue" />
              <MobileNavLink onClick={() => navigate('/my-reports')} label="My Reports" />
              <MobileNavLink onClick={handleLogout} label="Logout" />
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-medium text-sm"
    >
      {label}
    </button>
  )
}

function MobileNavLink({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded transition"
    >
      {label}
    </button>
  )
}
