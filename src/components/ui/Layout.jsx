import { Outlet, NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/browse',     label: 'Browse'     },
  { to: '/review',     label: 'Review'     },
  { to: '/playground', label: 'Playground' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-surface-700 bg-surface-900/90 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 h-13 flex items-center justify-between" style={{ height: '52px' }}>

          {/* Logo — always links home */}
          <Link to="/" className="text-lg font-bold tracking-tight select-none shrink-0">
            <span className="text-dsa-500">Tech</span>
            <span className="text-ml-500"> Cheats</span>
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
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
