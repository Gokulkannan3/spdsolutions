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
    { label: "Email",    value: "spdsolutions003@gmail.com",  href: "mailto:spdsolutions003@gmail.com" },
    { label: "Phone",    value: "+91 99412 69128",  href: "tel:+919941269128" },
  ]

  const socials = [
    {
      href: "https://wa.me/919941269128",
      label: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      href: "mailto:spdsolutions003@gmail.com",
      label: "Email",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 001.228 0L20 9.044 20.002 18H4z"/>
        </svg>
      ),
    },
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
              {socials.map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-red-600/20 flex items-center justify-center text-red-600/60 hover:border-red-600 hover:text-red-500 transition-all">
                  {s.icon}
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