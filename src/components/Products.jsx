"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Modal from "./Modal"
import ecom1 from "../assets/ecom1.png"
import ecom2 from "../assets/ecom2.png"
import warehouse1 from "../assets/warehouse.png"
import biller1 from "../assets/biller1.png"

gsap.registerPlugin(ScrollTrigger)

export default function Products() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          markers: false,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })

      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            markers: false,
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power2.out",
        })

        // Hover effect
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -15, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)", duration: 0.3 })
          })
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, boxShadow: "0 0 0 rgba(239, 68, 68, 0)", duration: 0.3 })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const products = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description:
        "Full-featured e-commerce solution with whatsapp integration, inventory management, and advanced analytics dashboard for real-time sales tracking.",
      category: "Web Application",
      image: ecom1,
      screenshots: [ecom1, ecom2, ecom1],
      link: "https://www.madhunishacrackers.com",
      features: [
        "Whatsapp Integration",
        "Inventory Management",
        "Analytics Dashboard",
        "Mobile Responsive",
        "Multi-currency Support",
        "Order Tracking",
      ],
    },
    {
      id: 2,
      name: "Warehouse Manager",
      description:
        "Intelligent inventory management system for warehouse operations with real-time tracking, stock management, and comprehensive reporting capabilities.",
      category: "Enterprise Solution",
      image: warehouse1,
      screenshots: [warehouse1, warehouse1, warehouse1],
      link: "https://www.funwithcrackers.com/",
      features: [
        "Real-time Tracking",
        "Stock Management",
        "Reports & Analytics",
        "Multi-warehouse Support",
        "Barcode Integration",
        "Automated Alerts",
      ],
    },
    {
      id: 3,
      name: "Biller System",
      description:
        "Advanced billing and invoice management system with automated calculations, tax compliance, and professional report generation for financial management.",
      category: "Business Tool",
      image: biller1,
      screenshots: [biller1, biller1, biller1],
      features: [
        "Invoice Generation",
        "Payment Tracking",
        "Tax Calculations",
        "Report Generation",
        "Client Management",
        "Recurring Billing",
      ],
    },
  ]

  return (
    <section id="products" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-red-600/20">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-gray-400 text-lg">Explore our innovative solutions designed to transform businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-gradient-to-br from-gray-900/50 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 cursor-pointer group flex flex-col h-full"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 bg-gray-900 flex-shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600/80 text-white text-xs font-bold rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>

                {/* Features Preview */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs text-red-400 bg-red-600/10 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}
