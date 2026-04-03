import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import cheatsheets from '../data/cheatsheets/index.js'

const accentMap = {
  orange:  { bg: 'bg-orange-500/10',  border: 'border-orange-500/30',  text: 'text-orange-400',  btn: 'bg-orange-500 hover:bg-orange-400' },
  blue:    { bg: 'bg-blue-500/10',    border: 'border-blue-500/30',    text: 'text-blue-400',    btn: 'bg-blue-500 hover:bg-blue-400' },
  yellow:  { bg: 'bg-yellow-500/10',  border: 'border-yellow-500/30',  text: 'text-yellow-400',  btn: 'bg-yellow-500 hover:bg-yellow-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', btn: 'bg-emerald-500 hover:bg-emerald-400' },
  violet:  { bg: 'bg-violet-500/10',  border: 'border-violet-500/30',  text: 'text-violet-400',  btn: 'bg-violet-500 hover:bg-violet-400' },
  rose:    { bg: 'bg-rose-500/10',    border: 'border-rose-500/30',    text: 'text-rose-400',    btn: 'bg-rose-500 hover:bg-rose-400' },
}

export default function CheatSheets() {
  return (
    <div className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-3">Cheat Sheets</h1>
          <p className="text-gray-400 text-lg">Quick syntax reference for everyday development</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatsheets.map((sheet, i) => {
            const a = accentMap[sheet.color] ?? accentMap.blue
            return (
              <motion.div
                key={sheet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <Link
                  to={`/cheatsheets/${sheet.id}`}
                  className={`group flex flex-col h-full rounded-2xl border ${a.border} ${a.bg} p-6 hover:scale-[1.02] transition-transform duration-200`}
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-3xl select-none`}>{sheet.icon}</span>
                    <h2 className={`text-xl font-bold ${a.text}`}>{sheet.title}</h2>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm flex-1 leading-relaxed mb-4">
                    {sheet.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500">
                      {sheet.sections.length} sections &middot;{' '}
                      {sheet.sections.reduce((n, s) => n + s.items.length, 0)} items
                    </span>
                    <span className={`text-xs font-semibold ${a.text} group-hover:translate-x-1 transition-transform duration-150 inline-block`}>
                      View →
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
