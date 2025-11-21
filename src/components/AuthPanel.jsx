import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AuthPanel() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const res = await fetch(`${API}/auth/${mode === 'login' ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Request failed')
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setMessage(`Welcome ${data.email}`)
    } catch (err) {
      setMessage(err.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setMessage('Logged out')
  }

  return (
    <section id="auth" className="relative py-16">
      <div className="max-w-xl mx-auto bg-slate-800/60 backdrop-blur border border-white/10 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Authentication</h2>
          <div className="inline-flex p-1 rounded-xl bg-white/10">
            <button onClick={() => setMode('login')} className={`px-3 py-1.5 rounded-lg text-sm ${mode==='login'?'bg-white text-slate-900':'text-white'}`}>Login</button>
            <button onClick={() => setMode('register')} className={`px-3 py-1.5 rounded-lg text-sm ${mode==='register'?'bg-white text-slate-900':'text-white'}`}>Register</button>
          </div>
        </div>

        {token ? (
          <div className="space-y-4">
            <p className="text-sky-200/90">You are logged in.</p>
            <div className="flex gap-3">
              <button onClick={logout} className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-400 text-white">Logout</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-sky-100 mb-1">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="you@company.com" className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
            </div>
            <div>
              <label className="block text-sm text-sky-100 mb-1">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder="••••••••" className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
            </div>
            <button className="w-full px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white">{mode==='login'?'Login':'Create account'}</button>
          </form>
        )}
        {message && <p className="mt-4 text-sm text-sky-200/80">{message}</p>}
      </div>
    </section>
  )
}
