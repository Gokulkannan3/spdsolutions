"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" })
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState("")
  const [focused, setFocused]   = useState(null)

  useEffect(() => {
    const els = [headRef.current, leftRef.current, rightRef.current].filter(Boolean)
    gsap.set(els, { opacity: 1, y: 0 })

    const animate = () => {
      gsap.from(els, { opacity: 0, y: 40, duration: 0.8, stagger: 0.12, ease: "power2.out", clearProps: "all" })
    }

    const trigger = ScrollTrigger.create({ trigger: sectionRef.current, start: "top 80%", once: true, onEnter: animate })
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect && rect.top < window.innerHeight) animate()
    return () => trigger.kill()
  }, [])

  const validate = () => {
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.name.trim() || formData.name.trim().length < 2) return "Name must be at least 2 characters"
    if (!formData.email.trim() || !emailRx.test(formData.email)) return "Please enter a valid email"
    if (!formData.phone.trim() || formData.phone.length !== 10) return "Please enter a valid 10-digit phone number"
    return ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10)
      setFormData(prev => ({ ...prev, phone: digits }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true); setError("")
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setFormData({ name: "", phone: "", email: "", message: "" })
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(data.message || "Failed to send. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? "#dc2626" : "#dc262625"}`,
    color: "#fff",
    padding: "10px 0",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  })

  const labelStyle = {
    display: "block",
    fontSize: 9,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#dc2626",
    fontFamily: "monospace",
    marginBottom: 4,
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-red-600/10 overflow-hidden">

      {/* Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[160px] font-black leading-none select-none pointer-events-none"
        style={{ color: "rgba(220,38,38,0.025)", fontFamily: "monospace" }}>
        CONTACT
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headRef} className="flex items-center gap-4 mb-16">
          <div className="w-12 h-px bg-red-600" />
          <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-mono">03 / Contact</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">

          {/* LEFT — intro + direct contact */}
          <div ref={leftRef}>
            <h2 className="font-black leading-none mb-6" style={{ fontSize: "clamp(36px,4.5vw,60px)" }}>
              <span className="text-white block">Let's</span>
              <span className="block" style={{ WebkitTextStroke: "1px #dc2626", color: "transparent" }}>Build</span>
              <span className="text-white block">Together</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-12 max-w-sm">
              Ready to start your next project? Tell us what you need and we'll get back to you within 24 hours.
            </p>

            {/* Direct contacts */}
            <div className="space-y-6">
              {[
                {
                  label: "Phone",
                  value: "+91 99412 69128",
                  href: "tel:+919941269128",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.368 1.563 4.619l1.68-1.68a1 1 0 011.414 0l3.141 3.141a1 1 0 010 1.414l-1.68 1.68c1.251.978 2.871 1.563 4.619 1.563.319 0 .624-.044.924-.102l.773 1.548a1 1 0 011.06.54l.436.741A1 1 0 0118 17.153V19a1 1 0 01-1 1h-2C9.716 20 3 13.284 3 5V3z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  value: "gokul8506@gmail.com",
                  href: "mailto:gokul8506@gmail.com",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  value: "Chat with us",
                  href: "https://wa.me/919941269128",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  ),
                },
              ].map((c) => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group">
                  <div className="w-10 h-10 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-200 flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[9px] text-red-500/60 tracking-[0.2em] uppercase font-mono">{c.label}</div>
                    <div className="text-gray-300 text-sm group-hover:text-white transition-colors">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="space-y-8">

              {success && (
                <div className="flex items-center gap-3 p-4 text-sm"
                  style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Message sent. We'll be in touch soon.
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 p-4 text-sm"
                  style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.2)", color: "#f87171" }}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input name="name" type="text" value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    placeholder="Your name" style={inputStyle("name")} />
                </div>
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input name="phone" type="tel" value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                    placeholder="10-digit number" maxLength={10} inputMode="numeric" style={inputStyle("phone")} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  placeholder="your@email.com" style={inputStyle("email")} />
              </div>

              <div>
                <label style={labelStyle}>Message (optional)</label>
                <textarea name="message" rows={4} value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  placeholder="Tell us about your project"
                  style={{ ...inputStyle("message"), resize: "none" }} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                style={{
                  background: loading ? "#7f1d1d" : "#dc2626",
                  clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
                }}>
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending
                  </>
                ) : (
                  <>Send Message <span style={{ letterSpacing: 0 }}>›</span></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}