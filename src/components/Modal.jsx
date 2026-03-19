"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function Modal({ product, onClose }) {
  const backdropRef = useRef(null)
  const panelRef    = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(panelRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.1"
      )

    const onKey = (e) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, { x: "100%", opacity: 0, duration: 0.4, ease: "power3.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.2")
  }

  const prev = () => setCurrentImageIndex(i => i === 0 ? product.screenshots.length - 1 : i - 1)
  const next = () => setCurrentImageIndex(i => i === product.screenshots.length - 1 ? 0 : i + 1)

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div ref={backdropRef} className="absolute inset-0 cursor-pointer"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
        onClick={handleClose} />

      {/* Side panel */}
      <div ref={panelRef}
        className="relative ml-auto w-full max-w-2xl h-full overflow-y-auto"
        style={{ background: "#050505", borderLeft: "1px solid #dc262620" }}
        onClick={e => e.stopPropagation()}>

        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5"
          style={{ background: "#050505", borderBottom: "1px solid #dc262615" }}>
          <div>
            <div className="text-[9px] text-red-500 tracking-[0.3em] uppercase font-mono mb-1">{product.category}</div>
            <h2 className="text-white font-black text-xl tracking-tight">{product.name}</h2>
          </div>
          <button onClick={handleClose}
            className="w-9 h-9 border border-red-600/20 flex items-center justify-center text-gray-500 hover:text-white hover:border-red-600/60 transition-all group">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6">

          {/* Image carousel */}
          {product.screenshots && product.screenshots.length > 0 && (
            <div className="mb-8">
              <div className="relative overflow-hidden" style={{ height: 280, background: "#0a0a0a", border: "1px solid #dc262615" }}>
                <img
                  src={product.screenshots[currentImageIndex]}
                  alt={`${product.name} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  style={{ transition: "opacity 0.3s ease" }}
                />
                {/* Scan line overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)" }} />
                {/* Counter */}
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/50 px-2 py-0.5"
                  style={{ background: "rgba(0,0,0,0.7)", border: "1px solid #dc262620" }}>
                  {currentImageIndex + 1} / {product.screenshots.length}
                </div>

                {product.screenshots.length > 1 && (
                  <>
                    <button onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                      style={{ background: "rgba(0,0,0,0.6)", border: "1px solid #dc262630" }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                      style={{ background: "rgba(0,0,0,0.6)", border: "1px solid #dc262630" }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {product.screenshots.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {product.screenshots.map((s, i) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)}
                      className="flex-shrink-0 transition-all duration-200"
                      style={{
                        width: 56, height: 40,
                        border: `1px solid ${i === currentImageIndex ? "#dc2626" : "#dc262620"}`,
                        opacity: i === currentImageIndex ? 1 : 0.5,
                      }}>
                      <img src={s} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8 pb-8"
            style={{ borderBottom: "1px solid #dc262610" }}>
            {product.description}
          </p>

          {/* Features */}
          {product.features && (
            <div className="mb-8">
              <div className="text-[9px] text-red-500 tracking-[0.3em] uppercase font-mono mb-4">Key Features</div>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 group">
                    <span className="w-1 h-1 bg-red-600 flex-shrink-0" />
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-6" style={{ borderTop: "1px solid #dc262610" }}>
            {product.link && (
              <a href={product.link} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 text-white text-xs font-mono tracking-widest uppercase hover:bg-red-700 transition-colors"
                style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}>
                Visit Live Site
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            <button onClick={handleClose}
              className={`flex items-center justify-center gap-2 py-3 text-xs font-mono tracking-widest uppercase text-gray-400 hover:text-white border border-red-600/20 hover:border-red-600/60 transition-all ${product.link ? "px-6" : "flex-1"}`}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}