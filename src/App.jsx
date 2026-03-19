// src/App.jsx
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Nav      from "./components/Nav"
import Hero     from "./components/Hero"
import About    from "./components/About"
import Products from "./components/Products"
import Contact  from "./components/Contact"
import Footer   from "./components/Footer"
import Launch from "./components/Launch"

import logo from "./assets/logo.png"
import "./App.css"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const containerRef = useRef(null)
  const [launched, setLaunched] = useState(false)

  const handleLaunchComplete = () => {
    setLaunched(true)
    gsap.from(containerRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" })
  }

  useEffect(() => {
    if (!launched) return
    const ctx = gsap.context(() => {
      gsap.to(".parallax-bg", {
        yPercent: -50, ease: "none",
        scrollTrigger: { trigger: ".parallax-bg", start: "top bottom", end: "bottom top", scrub: true },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [launched])

  return (
    <>
      {!launched && <LaunchScreen onComplete={handleLaunchComplete} />}
      <div ref={containerRef} className="overflow-x-hidden"
        style={{ visibility: launched ? "visible" : "hidden" }}>
        <Nav logo={logo} />
        <Hero logo={logo} />
        <About />
        <Products />
        <Contact />
        <Footer />
      </div>
    </>
  )
}