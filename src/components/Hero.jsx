"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Typed from "typed.js"

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ logo }) {
  const heroRef   = useRef(null)
  const headRef   = useRef(null)
  const subRef    = useRef(null)
  const typedRef  = useRef(null)
  const ctaRef    = useRef(null)
  const scanRef   = useRef(null)
  const gridRef   = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Web Applications", "Mobile Apps", "Enterprise Solutions", "AI-Powered Tools", "Cloud Platforms"],
      typeSpeed: 55, backSpeed: 35, backDelay: 1800,
      loop: true, showCursor: true, cursorChar: "█",
    })
    return () => typed.destroy()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(scanRef.current, { scaleX: 0, duration: 0.8, ease: "power3.out", transformOrigin: "left" })
        .from(headRef.current,  { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(subRef.current,   { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.5")
        .from(ctaRef.current?.children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.3")

      // Parallax
      gsap.to(heroRef.current, {
        yPercent: 25, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      })

      // Scan line loop
      gsap.to(scanRef.current, {
        y: "100vh", duration: 3, ease: "none", repeat: -1, delay: 1.5,
        onRepeat: () => gsap.set(scanRef.current, { y: 0 }),
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative w-full min-h-screen bg-black flex items-center overflow-hidden">

      {/* Animated grid */}
      <div ref={gridRef} className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#dc2626 1px,transparent 1px),linear-gradient(90deg,#dc2626 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Red scan line */}
      <div ref={scanRef} className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg,transparent,#dc262660,transparent)", top: 0 }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,#dc262620 0%,transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,#dc262615 0%,transparent 70%)", filter: "blur(60px)" }} />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-red-600/40 pointer-events-none" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-red-600/40 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-red-600/40 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-red-600/40 pointer-events-none" />

      {/* Vertical coordinates */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-red-600/30" />
        <span className="text-red-600/40 text-[9px] tracking-[0.3em] rotate-90 whitespace-nowrap font-mono">00°N · 80°E</span>
        <div className="w-px h-24 bg-gradient-to-t from-transparent to-red-600/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-red-600" />
              <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-mono">SPD Solutions · Est. 2024</span>
            </div>

            {/* Heading */}
            <div ref={headRef}>
              <h1 className="font-black leading-[0.92] mb-6" style={{ fontSize: "clamp(40px,6vw,80px)" }}>
                <span className="block text-white">BUILD YOUR</span>
                <span className="block" style={{
                  WebkitTextStroke: "1px #dc2626", color: "transparent",
                  textShadow: "0 0 60px #dc262640",
                }}>DIGITAL</span>
                <span className="block text-white">FUTURE</span>
              </h1>
            </div>

            {/* Typed */}
            <div ref={subRef} className="mb-8">
              <div className="text-gray-400 text-lg font-mono mb-1">We create powerful</div>
              <div className="text-red-500 text-2xl font-bold font-mono min-h-[2rem]">
                <span ref={typedRef} />
              </div>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap hundred:-mt-32 mobile:-mt-44">
              <a href="#products"
                className="group relative px-8 py-3 bg-red-600 text-white font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:bg-red-700"
                style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}>
                <span className="relative z-10">View Products</span>
              </a>
              <a href="#contact"
                className="group px-8 py-3 border border-red-600/50 text-red-500 font-bold text-sm tracking-widest uppercase hover:border-red-500 hover:text-white transition-all"
                style={{ clipPath: "polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)" }}>
                Get In Touch
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-red-600/10">
              {[["6+", "Products"], ["100%", "Custom"], ["24/7", "Support"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-white font-mono">{n}</div>
                  <div className="text-xs text-gray-500 tracking-widest uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Geometric logo frame */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">

              {/* Rotating rings */}
              <div className="absolute inset-0 rounded-full border border-red-600/15" style={{ animation: "spin 20s linear infinite" }} />
              <div className="absolute inset-4 rounded-full border border-dashed border-red-600/10" style={{ animation: "spin 12s linear infinite reverse" }} />
              <div className="absolute inset-8 rounded-full border border-red-600/20" style={{ animation: "spin 8s linear infinite" }} />

              {/* Orbit dot */}
              <div className="absolute inset-0" style={{ animation: "spin 8s linear infinite" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-red-600"
                  style={{ boxShadow: "0 0 12px #dc2626" }} />
              </div>

              {/* Logo in center */}
              <div className="absolute inset-12 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl" style={{ background: "radial-gradient(circle,#dc262630,transparent)", filter: "blur(20px)" }} />
                  {logo && (
                    <img src={logo} alt="SPD Solutions"
                      className="relative z-10 w-32 h-32 object-contain drop-shadow-2xl"
                      style={{ filter: "drop-shadow(0 0 20px #dc262660)" }} />
                  )}
                </div>
              </div>

              {/* Corner blips */}
              {[0,90,180,270].map(deg => (
                <div key={deg} className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
                  <div className="absolute top-0 left-1/2 w-1 h-3 -translate-x-1/2 bg-red-600/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-red-600/40 text-[9px] tracking-[0.3em] uppercase font-mono">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-red-600/40 to-transparent animate-pulse" />
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </section>
  )
}