"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
export default function Modal({ product, onClose }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out",
      })
    })

    // Close modal on Escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)

    return () => {
      ctx.revert()
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.screenshots.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.screenshots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="sticky top-0 flex justify-between items-center p-6 bg-black/50 backdrop-blur-sm border-b border-red-600/20 z-10">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="px-3 py-1 bg-red-600/80 text-white text-xs font-bold rounded-full">
              {product.category}
            </span>
          </div>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">{product.description}</p>

          {/* Image carousel */}
          <div className="relative mb-8">
            <div className="relative h-96 bg-black rounded-lg overflow-hidden border border-red-600/20">
              <img
                src={product.screenshots[currentImageIndex] || "/placeholder.svg"}
                alt={`${product.name} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation buttons */}
            {product.screenshots.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors shadow-lg"
                  aria-label="Previous screenshot"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors shadow-lg"
                  aria-label="Next screenshot"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-gray-300 text-sm">
              {currentImageIndex + 1} / {product.screenshots.length}
            </div>
          </div>

          {/* Thumbnails */}
          {product.screenshots.length > 1 && (
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {product.screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${
                    currentImageIndex === index ? "border-red-600 scale-105" : "border-gray-600 hover:border-red-400"
                  }`}
                  aria-label={`View screenshot ${index + 1}`}
                >
                  <img
                    src={screenshot || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Features List */}
          {product.features && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-300">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-center"
            >
              Visit Live Site
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-red-600 text-red-500 font-bold rounded-lg hover:bg-red-600/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
