"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function TechStack() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

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
          rotation: -5 + index * 2.5,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
        })

        // Hover effect
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 20px 40px rgba(239, 68, 68, 0.2)",
            })
          })
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out", boxShadow: "0 0 0 rgba(239, 68, 68, 0)" })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const techStacks = [
    {
      category: "Frontend",
      techs: [
        { name: "React 19", logo: "⚛️" },
        { name: "Vite", logo: "⚡" },
        { name: "Tailwind CSS", logo: "🎨" },
        { name: "React Native", logo: "📱" },
        { name: "Next.js", logo: "▲" },
      ],
      icon: "🎨",
      color: "from-blue-600 to-cyan-600",
      description: "Modern UI frameworks and tools",
    },
    {
      category: "Backend",
      techs: [
        { name: "Node.js", logo: "🟢" },
        { name: "Express.js", logo: "🛣️" },
        { name: "REST APIs", logo: "🔗" },
        { name: "WebSockets", logo: "⚙️" },
      ],
      icon: "⚙️",
      color: "from-green-600 to-emerald-600",
      description: "Robust server-side solutions",
    },
    {
      category: "Cloud & DevOps",
      techs: [
        { name: "AWS", logo: "☁️" },
        { name: "Azure", logo: "💙" },
        { name: "Railway", logo: "🚂" },
        { name: "Docker", logo: "🐳" },
        { name: "CI/CD", logo: "🔄" },
      ],
      icon: "☁️",
      color: "from-purple-600 to-pink-600",
      description: "Scalable cloud infrastructure",
    },
  ]

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-red-600/20"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            Our Tech Stack
          </h2>
          <p className="text-gray-400 text-lg">Cutting-edge technologies for modern solutions</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {techStacks.map((stack, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-gradient-to-br from-gray-900/50 to-black border border-red-600/20 rounded-xl p-8 hover:border-red-600/50 transition-all duration-300 group flex flex-col"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {stack.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{stack.category}</h3>
              <p className="text-gray-400 text-sm mb-6">{stack.description}</p>

              <div className="space-y-3">
                {stack.techs.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 text-gray-300 hover:text-red-500 transition-colors duration-300 p-2 rounded-lg hover:bg-red-600/10"
                  >
                    <span className="text-2xl flex-shrink-0">{tech.logo}</span>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
