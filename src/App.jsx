// src/App.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Techstack from "./components/Techstack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Launch from "./components/Launch";

import logo from "./assets/logo.png";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const [showLaunchScreen, setShowLaunchScreen] = useState(true);

  const handleLaunchComplete = () => {
    setShowLaunchScreen(false);
  };

  /* --------------------------------------------------------------
     GSAP scroll animations – run only after launch
  -------------------------------------------------------------- */
  useEffect(() => {
    if (showLaunchScreen) return;

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-bg",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade‑in sections
      gsap.utils.toArray(".section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [showLaunchScreen]);

  return (
    <div ref={containerRef} className="overflow-x-hidden">
      {/* LAUNCH SCREEN – always on top until complete */}
      {showLaunchScreen && (
        <Launch logo={logo} onLaunchComplete={handleLaunchComplete} />
      )}

      {/* MAIN PAGE – hidden while launch runs */}
      {!showLaunchScreen && (
        <>
          <Nav logo={logo} />
          <Hero logo={logo} />
          <About />
          <Products />
          <Techstack />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}