"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const items = footerRef.current?.querySelectorAll(".f-anim")
    gsap.set(items, { opacity: 1, y: 0 })

    const trigger = ScrollTrigger.create({
      trigger: footerRef.current, start: "top 95%", once: true,
      onEnter: () => gsap.from(items, { opacity: 0, y: 24, duration: 0.7, stagger: 0.08, ease: "power2.out", clearProps: "all" }),
    })
    const rect = footerRef.current?.getBoundingClientRect()
    if (rect && rect.top < window.innerHeight)
      gsap.from(items, { opacity: 0, y: 24, duration: 0.7, stagger: 0.08, ease: "power2.out", clearProps: "all" })

    return () => trigger.kill()
  }, [])

  const navLinks = ["Home", "About", "Products", "Contact"]

  const contacts = [
    { label: "WhatsApp", value: "+91 99412 69128", href: "https://wa.me/919941269128" },
    { label: "Email",    value: "gokul8506@gmail.com",  href: "mailto:gokul8506@gmail.com" },
    { label: "Phone",    value: "+91 99412 69128",  href: "tel:+919941269128" },
  ]

  return (
    <footer ref={footerRef} className="relative bg-black overflow-hidden"
      style={{ borderTop: "1px solid #dc262618" }}>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#dc2626,transparent)" }} />

      {/* Big background text */}
      <div className="absolute bottom-0 left-0 right-0 text-center leading-none select-none pointer-events-none overflow-hidden"
        style={{ fontSize: "clamp(60px,12vw,160px)", fontWeight: 900, color: "rgba(220,38,38,0.03)", letterSpacing: "-0.04em" }}>
        SPD SOLUTIONS
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand — spans 5 cols */}
          <div className="f-anim md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-px h-10 bg-red-600" />
              <div>
                <div className="text-white font-black text-2xl tracking-widest leading-none">SPD</div>
                <div className="text-red-500 text-[9px] tracking-[0.4em] uppercase font-mono">Solutions</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              Building innovative digital products for the modern world. From web apps to enterprise platforms — we ship what matters.
            </p>
            {/* Social row */}
            <div className="flex gap-3">
              {[
                { label: "WA", href: "https://wa.me/919941269128" },
                { label: "EM", href: "mailto:gokul8506@gmail.com" },
              ].map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-red-600/20 flex items-center justify-center text-red-600/60 hover:border-red-600 hover:text-red-500 transition-all text-xs font-mono">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links — 3 cols */}
          <div className="f-anim md:col-span-3">
            <div className="text-[9px] text-red-500 tracking-[0.3em] uppercase font-mono mb-6">Navigation</div>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`}
                    className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors group">
                    <span className="w-0 group-hover:w-4 h-px bg-red-600 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="f-anim md:col-span-4">
            <div className="text-[9px] text-red-500 tracking-[0.3em] uppercase font-mono mb-6">Direct Contact</div>
            <div className="space-y-4">
              {contacts.map(c => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block group">
                  <div className="text-[9px] text-gray-600 tracking-[0.2em] uppercase font-mono mb-0.5">{c.label}</div>
                  <div className="text-gray-400 text-sm group-hover:text-white transition-colors">{c.value}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="f-anim flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid #dc262612" }}>
          <p className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} <span className="text-gray-400">SPD Solutions</span> · All rights reserved
          </p>
          <p className="text-red-600/30 text-[9px] tracking-[0.3em] uppercase font-mono">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  )
}