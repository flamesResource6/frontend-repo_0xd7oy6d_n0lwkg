import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero3D() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/90" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
          Build a modern SaaS in minutes
        </h1>
        <p className="mt-6 text-lg md:text-xl text-sky-100/90">
          Auth, analytics, and a 3D interactive hero — all ready to go.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#auth" className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition">
            Get started
          </a>
          <a href="#analytics" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur transition">
            View analytics
          </a>
        </div>
      </div>
    </section>
  )
}
