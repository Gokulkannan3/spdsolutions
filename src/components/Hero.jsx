// src/components/Hero.jsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typed from "typed.js"; // npm install typed.js
import lap from '../assets/lap.png'

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const typedRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const bgElementsRef = useRef([]);

  // Typed.js effect
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Web Applications",
        "Mobile Apps",
        "Enterprise Solutions",
        "AI-Powered Tools",
        "Cloud Platforms",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Typed + Content
      gsap.from([typedRef.current, contentRef.current?.children], {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Stats
      gsap.from(statsRef.current?.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Image entrance
      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      });

      // Parallax hero
      gsap.to(heroRef.current, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Floating shapes
      bgElementsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: 80 + i * 25,
          rotation: 8 + i * 4,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7 + i * 0.2,
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-screen bg-black flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-black to-purple-900/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating glows */}
      <div
        ref={(el) => (bgElementsRef.current[0] = el)}
        className="absolute top-20 right-32 w-80 h-80 bg-red-600/20 rounded-full blur-3xl animate-pulse"
      />
      <div
        ref={(el) => (bgElementsRef.current[1] = el)}
        className="absolute bottom-32 left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Content */}
          <div className="space-y-8">
            {/* Title */}
            <div ref={titleRef}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-12">
                <span className="bg-gradient-to-r from-white via-white to-red-500 bg-clip-text text-transparent">
                  Build Your
                </span>
                <br />
                <span className="text-red-500">Digital Future</span>
              </h1>
            </div>

            {/* Typed Effect */}
            <div className="text-2xl sm:text-3xl font-medium text-gray-300">
              We create powerful{" "}
              <span ref={typedRef} className="text-red-500 font-bold"></span>
            </div>

            {/* Paragraphs */}
            <div ref={contentRef} className="space-y-5 text-gray-400 text-base sm:text-lg leading-relaxed">
              <p>
                From concept to deployment, we deliver scalable, secure, and high-performance digital solutions
                tailored to your business goals.
              </p>
              <p>
                Our expert team combines cutting-edge technology with creative innovation to build products
                that drive growth and transform industries.
              </p>
              <p>
                Trusted by startups and enterprises alike, we turn complex challenges into elegant,
                future-ready applications.
              </p>
            </div>
          </div>

          {/* RIGHT: Image with Top Light */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Top Light Glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-red-500/30 via-transparent to-transparent blur-3xl animate-pulse"></div>

              {/* Laptop Image */}
              <div
                ref={imageRef}
                className="relative z-10 w-full max-w-md lg:max-w-lg drop-shadow-2xl"
              >
                <img
                  src={lap} // Replace with your uploaded image path
                  alt="SPD Solutions - Digital Innovation"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  style={{
                    boxShadow: "0 0 80px rgba(239, 68, 68, 0.4)",
                  }}
                />
              </div>

              {/* Bottom subtle glow */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}