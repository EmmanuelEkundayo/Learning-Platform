import { Outlet, NavLink, Link } from 'react-router-dom'
import SupportModal from './SupportModal'

const NAV_LINKS = [
  { to: '/browse',       label: 'Browse'       },
  { to: '/projects',     label: 'Projects'     },
  { to: '/roadmaps',     label: 'Roadmaps'     },
  { to: '/review',       label: 'Review'       },
  { to: '/playground',   label: 'Playground'   },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/notes',        label: 'Notes'        },
  { to: '/leaderboard',  label: 'Leaderboard'  },
]

import SearchPalette from './SearchPalette.jsx'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../../store/authStore.js'
import { useProgressStore } from '../../store/progressStore.js'

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const userEmail = useAuthStore(s => s.userEmail)
  const userName = useAuthStore(s => s.userName)
  const dismissModal = useProgressStore(s => s.dismissSupportModal)
  const leaderboardPromptPending = useProgressStore(s => s.leaderboard_prompt_pending)
  const setLeaderboardOptIn = useProgressStore(s => s.setLeaderboardOptIn)

  useEffect(() => {
    async function checkStatus() {
      if (!userEmail) return
      try {
        const res = await fetch(`/api/support-status?email=${encodeURIComponent(userEmail)}`)
        const data = await res.json()
        if (data.completed) {
          localStorage.setItem('completed_support', 'true')
          dismissModal()
        }
      } catch (err) {
        console.error('Failed to check support status', err)
      }
    }
    checkStatus()

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [userEmail, dismissModal])

  useEffect(() => {
    if (leaderboardPromptPending) {
      toast((t) => (
        <div className="flex flex-col gap-3 p-1">
          <div className="space-y-1">
            <p className="font-bold text-sm text-white">
              You've completed 10 concepts! 🎉
            </p>
            <p className="text-xs text-gray-400">
              Join the public leaderboard to track your rank.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id)
                // This will trigger the sync and opted_in: true
                setLeaderboardOptIn(true, { 
                  name: userName || 'Learner',
                  email: userEmail,
                  occupation: 'Learner'
                })
              }}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg font-bold hover:bg-blue-500 transition-colors"
            >
              Join
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id)
                setLeaderboardOptIn(false)
              }}
              className="flex-1 px-3 py-2 bg-surface-700 text-gray-300 text-xs rounded-lg font-bold hover:bg-surface-600"
            >
              No thanks
            </button>
          </div>
        </div>
      ), { 
        duration: 20000, 
        position: 'bottom-right',
        style: {
          background: '#171717',
          color: '#fff',
          border: '1px solid #262626',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }
      })
    }
  }, [leaderboardPromptPending, setLeaderboardOptIn, userName, userEmail])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-surface-700 bg-surface-900/90 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 h-13 flex items-center justify-between" style={{ height: '52px' }}>

          {/* Logo — always links home */}
          <Link to="/" className="text-lg font-bold tracking-tight select-none shrink-0">
            <span className="text-dsa-500">Learn</span>
            <span className="text-ml-500"> Blazingly Fast</span>
          </Link>

          {/* Primary nav */}
          <div className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-700 text-white'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-surface-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-surface-800 transition-colors ml-1"
              title="Search (Cmd+K)"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <SupportModal />
        <Outlet />
      </main>

      <footer className="border-t border-surface-700 py-4 text-center text-xs text-gray-600">
        Built with ♥ by Emma, 2026
      </footer>
    </div>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6.5" cy="6.5" r="4.5" />
      <path d="M10 10l3 3" strokeLinecap="round" />
    </svg>
  )
}
