"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Modal from "./Modal"
import ecom1 from "../assets/ecom1.png"
import ecom2 from "../assets/track.jpeg"
import warehouse1 from "../assets/god1.jpeg"
import warehouse2 from "../assets/god2.png"
import warehouse3 from "../assets/god3.jpeg"
import biller1 from "../assets/biller1.png"
import larri1 from "../assets/l1.jpeg"
import larri2 from "../assets/l2.jpeg"
import larri3 from "../assets/l3.jpeg"
// import portfolio1 from "../assets/portfolio1.png"
// import attendance1 from "../assets/attendance1.png"

gsap.registerPlugin(ScrollTrigger)

export default function Products() {
  const sectionRef  = useRef(null)
  const headRef     = useRef(null)
  const gridRef     = useRef(null)
  const cardsRef    = useRef([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    const els = [headRef.current, gridRef.current].filter(Boolean)
    gsap.set(els, { opacity: 1, y: 0 })

    const animate = () => {
      gsap.from(els, { opacity: 0, y: 50, duration: 0.9, stagger: 0.15, ease: "power3.out", clearProps: "all" })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, { opacity: 0, y: 60, duration: 0.7, delay: i * 0.08, ease: "power2.out", clearProps: "all" })
      })
    }

    const trigger = ScrollTrigger.create({ trigger: sectionRef.current, start: "top 80%", once: true, onEnter: animate })
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect && rect.top < window.innerHeight) animate()
    return () => trigger.kill()
  }, [])

  const products = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Full-featured e-commerce solution with WhatsApp integration, inventory management, and advanced analytics for real-time sales tracking.",
      category: "Web Application",
      index: "01",
      image: ecom1,
      screenshots: [ecom1, ecom2],
      link: "https://www.madhunishacrackers.com",
      features: ["WhatsApp Integration","Inventory Management","Analytics Dashboard","Mobile Responsive","Multi-currency Support","Order Tracking"],
    },
    {
      id: 2,
      name: "Warehouse Manager",
      description: "Intelligent inventory management system for warehouse operations with real-time tracking, stock management, and comprehensive reporting.",
      category: "Enterprise Solution",
      index: "02",
      image: warehouse1,
      screenshots: [warehouse1, warehouse2, warehouse3],
      features: ["Real-time Tracking","Stock Management","Reports & Analytics","Multi-warehouse Support","Barcode Integration","Automated Alerts"],
    },
    {
      id: 3,
      name: "Lorry",
      description: "Smart shipment and logistics platform with live transport tracking, real-time GPS updates, and end-to-end delivery management.",
      category: "Logistics Platform",
      index: "03",
      image: larri1,
      screenshots: [larri1, larri2, larri3],
      features: ["Live GPS Tracking","Shipment Management","Driver Assignment","Route Optimization","Delivery Alerts","Trip History & Reports"],
    },
    {
      id: 4,
      name: "Biller System",
      description: "Advanced billing and invoice management with automated calculations, tax compliance, and professional report generation.",
      category: "Business Tool",
      index: "04",
      image: biller1,
      screenshots: [biller1],
      features: ["Invoice Generation","Payment Tracking","Tax Calculations","Report Generation","Client Management","Recurring Billing"],
    },
    {
      id: 5,
      name: "Portfolio Sites",
      description: "Beautifully crafted personal portfolio websites with smooth animations, responsive design, and customizable sections.",
      category: "Web Design",
      index: "05",
      image: null,
      screenshots: [],
      features: ["Custom Animations","Fully Responsive","Project Showcase","Contact Integration","SEO Optimized","Fast Performance"],
    },
    {
      id: 6,
      name: "Attendance System",
      description: "Smart employee attendance platform with image capture check-in, automated salary calculations, and detailed timesheet reports.",
      category: "HR & Payroll",
      index: "06",
      image: null,
      screenshots: [],
      features: ["Image Capture Check-in","Salary Calculation","Work Hour Timesheet","Late & Overtime Tracking","Monthly Payroll Reports","Employee Dashboard"],
    },
  ]

  const placeholderIcon = (name) => {
    if (name === "Portfolio Sites") return (
      <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: "#0a0a0a" }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-600 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
        <span className="text-red-600/60 text-xs tracking-[0.25em] uppercase font-mono">Portfolio</span>
      </div>
    )
    if (name === "Attendance System") return (
      <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: "#0a0a0a" }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-600 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        <span className="text-red-600/60 text-xs tracking-[0.25em] uppercase font-mono">Attendance</span>
      </div>
    )
    return (
      <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: "#0a0a0a" }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-600 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        <span className="text-red-600/60 text-xs tracking-[0.25em] uppercase font-mono">Logistics</span>
      </div>
    )
  }

  return (
    <section id="products" ref={sectionRef} className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-red-600/10 overflow-hidden">

      {/* Watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[160px] font-black leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ color: "rgba(220,38,38,0.025)", letterSpacing: "-0.05em" }}>
        PRODUCTS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headRef} className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-red-600" />
              <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-mono">02 / Products</span>
            </div>
            <h2 className="font-black leading-none" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
              <span className="text-white block">Our</span>
              <span className="block" style={{ WebkitTextStroke: "1px #dc2626", color: "transparent" }}>Solutions</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-gray-600 text-xs font-mono tracking-widest">
              {products.length} products
            </div>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          style={{ background: "#dc262608" }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => cardsRef.current[index] = el}
              className="relative bg-black group cursor-pointer overflow-hidden"
              style={{ minHeight: 380 }}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image area */}
              <div className="relative h-48 overflow-hidden">
                {product.image
                  ? <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: "brightness(0.7) saturate(0.8)" }} />
                  : placeholderIcon(product.name)
                }
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Index number */}
                <div className="absolute top-4 left-4 font-black text-5xl leading-none select-none pointer-events-none"
                  style={{ color: "rgba(220,38,38,0.15)", fontFamily: "monospace" }}>
                  {product.index}
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-mono px-2 py-1 border border-red-600/40 text-red-500"
                    style={{ background: "rgba(0,0,0,0.6)" }}>
                    {product.category}
                  </span>
                </div>

                {/* Hover scan line */}
                <div className="absolute left-0 right-0 h-px bg-red-600/60 transition-all duration-500 ease-in-out"
                  style={{ top: hoveredId === product.id ? "100%" : "-4px" }} />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow gap-2" style={{ minHeight: 200 }}>
                {/* Corner accent on hover */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-0 border-r-0 transition-all duration-300 group-hover:border-t-[32px] group-hover:border-r-[32px]"
                  style={{ borderColor: "transparent #dc2626 transparent transparent" }} />

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-black text-lg leading-tight group-hover:text-red-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <span className="text-red-600/30 font-mono text-xs ml-2 mt-1 flex-shrink-0">{product.index}</span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow group-hover:text-gray-400 transition-colors">
                  {product.description}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] text-red-600/70 border border-red-600/20 px-2 py-0.5 font-mono tracking-wide group-hover:border-red-600/40 group-hover:text-red-500 transition-all">
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-xs text-gray-500 font-mono tracking-widest uppercase group-hover:text-red-500 transition-colors">
                    <span>View Details</span>
                    <span className="w-0 group-hover:w-6 h-px bg-red-600 transition-all duration-300" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600">›</span>
                  </button>
                  {product.link && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" title="Live" />
                  )}
                </div>
              </div>

              {/* Bottom border that fills on hover */}
              <div className="absolute bottom-0 left-0 h-px bg-red-600 transition-all duration-500 ease-out"
                style={{ width: hoveredId === product.id ? "100%" : "0%" }} />
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}