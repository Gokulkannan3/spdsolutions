"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"

export default function Nav({ logo }) {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState("home")
  const navRef      = useRef(null)
  const mobileRef   = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    )

    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ["home","about","products","contact"]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) { setActive(id); break }
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!mobileRef.current) return
    gsap.to(mobileRef.current, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.35,
      ease: "power2.inOut",
    })
  }, [isOpen])

  const navItems = [
    { label: "Home",     href: "#home"     },
    { label: "About",    href: "#about"    },
    { label: "Products", href: "#products" },
    { label: "Contact",  href: "#contact"  },
  ]

  const scroll = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "#dc262630" : "transparent"}`,
      }}>

      {/* Top progress line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#dc2626,transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" onClick={e => scroll(e, "#home")}
            className="flex items-center gap-3 group">
            {logo && <img src={logo} alt="SPD" className="h-9 w-auto bg-white" style={{ filter: "drop-shadow(0 0 6px #dc262660)" }} />}
            <div>
              <div className="text-white font-black tracking-widest text-sm leading-none">SPD</div>
              <div className="text-red-500 text-[9px] tracking-[0.25em] uppercase leading-none mt-0.5">Solutions</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.replace("#","")
              return (
                <a key={item.label} href={item.href}
                  onClick={e => scroll(e, item.href)}
                  className="relative px-4 py-2 text-sm font-mono tracking-widest uppercase transition-colors duration-200 group"
                  style={{ color: isActive ? "#fff" : "#666" }}>
                  {isActive && (
                    <span className="absolute inset-0 border border-red-600/30 rounded-sm"
                      style={{ background: "#dc262608" }} />
                  )}
                  <span className="relative">{item.label}</span>
                  {!isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </a>
              )
            })}
          </div>

          {/* CTA */}
          <a href="#contact" onClick={e => scroll(e,"#contact")}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 border border-red-600/50 text-red-500 text-xs tracking-widest uppercase font-mono hover:bg-red-600/10 hover:border-red-500 transition-all">
            Hire Us
            <span className="text-red-600">›</span>
          </a>

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 group">
            <span className={`w-6 h-px bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`} />
            <span className={`h-px bg-red-600 transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div ref={mobileRef} className="md:hidden overflow-hidden h-0 opacity-0">
          <div className="py-4 border-t border-red-600/10 space-y-1">
            {navItems.map(item => (
              <a key={item.label} href={item.href} onClick={e => scroll(e, item.href)}
                className="flex items-center gap-3 px-2 py-3 text-gray-400 hover:text-white text-sm font-mono tracking-widest uppercase transition-colors group">
                <span className="w-3 h-px bg-red-600/40 group-hover:w-6 group-hover:bg-red-600 transition-all duration-300" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}