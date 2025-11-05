"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.from(footerRef.current?.children, {
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    })
  }, [])

  return (
    <footer ref={footerRef} className="bg-black border-t border-red-600/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">SPD Solutions</h3>
            <p className="text-gray-400">Building innovative digital solutions for the modern world.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Products", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-red-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">
              <a href="tel:+919941269128" className="hover:text-red-500 transition-colors">
                +91 99412 69128
              </a>
            </p>
            <p className="text-gray-400 text-sm">
              <a href="mailto:gokul8506@gmail.com" className="hover:text-red-500 transition-colors">
                gokul8506@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-red-600/20 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 SPD Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
