"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // GSAP entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  // Optional: Animate mobile menu open/close
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
        paddingTop: isOpen ? "1rem" : "0",
        paddingBottom: isOpen ? "1rem" : "0",
        overflow: "hidden",
      });
    }
  }, [isOpen]);

  const navItems = ["Home", "About", "Products", "Tech Stack", "Contact"];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu on click
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md z-50 border-b border-red-600/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SPD-removebg-preview-tD54mk5MRPg2Usx4fPR1iVXSHE3uj4.png"
              alt="SPD Solutions"
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold text-white hidden sm:block">
              SPD Solutions
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={(e) => scrollToSection(e, `#${item.toLowerCase().replace(" ", "-")}`)}
                className="text-gray-300 hover:text-red-500 transition-colors duration-300 font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-red-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden h-0 opacity-0 border-t border-red-600/20"
        >
          <div className="py-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={(e) => scrollToSection(e, `#${item.toLowerCase().replace(" ", "-")}`)}
                className="block px-4 py-3 text-gray-300 hover:text-red-500 hover:bg-red-600/10 transition-all duration-200 rounded-md mx-2"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}