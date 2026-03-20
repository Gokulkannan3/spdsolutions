"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const colLeft    = useRef(null)
  const colRight   = useRef(null)
  const statsRef   = useRef(null)

  useEffect(() => {
    const els = [headRef.current, colLeft.current, colRight.current, statsRef.current].filter(Boolean)
    gsap.set(els, { opacity: 1, y: 0 })

    const animate = () => {
      gsap.from(els, { opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power2.out", clearProps: "all" })
    }

    const trigger = ScrollTrigger.create({ trigger: sectionRef.current, start: "top 80%", once: true, onEnter: animate })
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect && rect.top < window.innerHeight) animate()

    return () => trigger.kill()
  }, [])

  const skills = ["Custom Web Apps", "Mobile Development", "Enterprise Solutions", "Cloud Architecture", "API Design", "UI/UX Engineering"]

  return (
    <section id="about" ref={sectionRef} className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-red-600/10 overflow-hidden hundred:mt-12 mobile:mt-20">

      {/* Background text watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[180px] font-black text-red-600/[0.03] leading-none select-none pointer-events-none whitespace-nowrap">
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div ref={headRef} className="flex items-center gap-4 mb-16">
          <div className="w-12 h-px bg-red-600" />
          <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-mono">01 / About</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">

          {/* LEFT */}
          <div ref={colLeft}>
            <h2 className="font-black leading-tight mb-8" style={{ fontSize: "clamp(32px,4vw,56px)" }}>
              <span className="text-white block">We Build</span>
              <span className="block" style={{ WebkitTextStroke: "1px #dc2626", color: "transparent" }}>Digital</span>
              <span className="text-white block">Futures</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              SPD Solutions is a dynamic software development company dedicated to creating world-class web applications
              and software solutions that drive real business growth.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              Our team combines cutting-edge technology with creative problem-solving to deliver exceptional
              results for businesses of all sizes — from startups to enterprise.
            </p>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-2 group">
                  <span className="w-1 h-1 rounded-full bg-red-600 group-hover:w-3 transition-all duration-300" />
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div ref={colRight} className="space-y-4">

            {/* Founder card */}
            <div className="relative border border-red-600/20 p-6 group hover:border-red-600/50 transition-all duration-300"
              style={{ clipPath: "polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)" }}>
              <div className="absolute top-0 right-0 w-16 h-px bg-red-600" />
              <div className="absolute top-0 right-0 w-px h-16 bg-red-600" />

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-red-600/30 font-black text-red-600 text-xl font-mono"
                  style={{ background: "#dc262610" }}>
                  GK
                </div>
                <div>
                  <div className="text-xs text-red-500 tracking-[0.2em] uppercase font-mono mb-1">Founder & CEO</div>
                  <div className="text-white font-bold text-lg mb-1">Gokul Kannan</div>
                  <div className="text-gray-500 text-sm">CSE Graduate · Chennai Institute of Technology</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Passionate about building innovative solutions and leading a team of talented developers to create
                exceptional digital experiences.
              </p>
            </div>

            {/* Contact card */}
            <div className="border border-red-600/10 p-6 hover:border-red-600/30 transition-all"
              style={{ background: "#dc262605" }}>
              <div className="text-xs text-red-500 tracking-[0.2em] uppercase font-mono mb-4">Direct Contact</div>
              <div className="space-y-3">
                <a href="tel:+919941269128" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                  <span className="w-7 h-7 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:border-red-600 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.368 1.563 4.619l1.68-1.68a1 1 0 011.414 0l3.141 3.141a1 1 0 010 1.414l-1.68 1.68c1.251.978 2.871 1.563 4.619 1.563.319 0 .624-.044.924-.102l.773 1.548a1 1 0 011.06.54l.436.741A1 1 0 0118 17.153V19a1 1 0 01-1 1h-2C9.716 20 3 13.284 3 5V3z"/>
                    </svg>
                  </span>
                  <span className="font-mono text-sm">+91 99412 69128</span>
                </a>
                <a href="mailto:spdsolutions003@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                  <span className="w-7 h-7 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:border-red-600 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </span>
                  <span className="font-mono text-sm">spdsolutions003@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-3 gap-px border border-red-600/10" style={{ background: "#dc262610" }}>
          {[["6+", "Products Shipped"], ["100%", "Custom Built"], ["24/7", "Support Available"]].map(([n, l]) => (
            <div key={l} className="bg-black px-8 py-6 text-center group hover:bg-red-600/5 transition-colors">
              <div className="text-4xl font-black text-white font-mono mb-1 group-hover:text-red-500 transition-colors">{n}</div>
              <div className="text-xs text-gray-500 tracking-[0.2em] uppercase">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}