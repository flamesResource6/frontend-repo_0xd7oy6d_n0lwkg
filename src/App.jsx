import React from 'react'
import Hero3D from './components/Hero3D'
import AuthPanel from './components/AuthPanel'
import Analytics from './components/Analytics'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-30 backdrop-blur bg-slate-950/50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.6)]" />
            <span className="font-semibold tracking-tight">Iridescent</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sky-100/80">
            <a href="#auth" className="hover:text-white">Auth</a>
            <a href="#analytics" className="hover:text-white">Analytics</a>
            <a href="/test" className="hover:text-white">Status</a>
          </nav>
        </div>
      </header>

      <Hero3D />
      <AuthPanel />
      <Analytics />

      <footer className="py-10 text-center text-sky-100/60">
        <p>Futuristic, vibrant, and ready for your SaaS.</p>
      </footer>
    </div>
  )
}

export default App
