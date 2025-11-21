import React, { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Bar({ label, value, max }) {
  const width = max ? Math.round((value / max) * 100) : 0
  return (
    <div className="grid grid-cols-[140px_1fr_60px] items-center gap-3">
      <span className="text-sky-100/80 text-sm">{label}</span>
      <div className="h-3 w-full rounded bg-white/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{ width: `${width}%` }} />
      </div>
      <span className="text-sky-100/60 text-xs text-right">{value}</span>
    </div>
  )
}

export default function Analytics() {
  const [summary, setSummary] = useState({ total: 0, byType: {} })
  const [loading, setLoading] = useState(true)

  const fetchSummary = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/analytics/summary`)
      const data = await res.json()
      setSummary(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSummary() }, [])

  const max = useMemo(() => Math.max(0, ...Object.values(summary.byType)), [summary])

  const seedEvent = async (type) => {
    const token = localStorage.getItem('token')
    await fetch(`${API}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ type, properties: { source: 'demo' } })
    })
    fetchSummary()
  }

  return (
    <section id="analytics" className="relative py-16">
      <div className="max-w-3xl mx-auto bg-slate-800/60 backdrop-blur border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Analytics</h2>
          <div className="flex gap-2">
            {['page_view','click','signup','purchase'].map(t => (
              <button key={t} onClick={()=>seedEvent(t)} className="px-3 py-1.5 rounded-lg bg-sky-500/80 hover:bg-sky-400 text-white text-sm">{t}</button>
            ))}
          </div>
        </div>
        {loading ? (
          <p className="text-sky-100/70">Loading...</p>
        ) : (
          <>
            <p className="text-sky-100/80 mb-4">Total events: <span className="font-semibold">{summary.total}</span></p>
            <div className="space-y-3">
              {Object.entries(summary.byType).length === 0 && (
                <p className="text-sky-100/60">No data yet. Trigger some demo events above.</p>
              )}
              {Object.entries(summary.byType).map(([k,v]) => (
                <Bar key={k} label={k} value={v} max={max} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
