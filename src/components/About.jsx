"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const aboutRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)
  const statsItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top center",
          end: "top center",
          markers: false,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })

      // Content animation
      gsap.from(contentRef.current?.children, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top center",
          end: "top center",
          markers: false,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })

      gsap.from(statsItemsRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top center",
          markers: false,
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out",
      })

      statsItemsRef.current.forEach((item) => {
        const numberEl = item?.querySelector(".stat-number")
        if (numberEl) {
          const endValue = Number.parseInt(numberEl.getAttribute("data-value") || "0")
          gsap.from(
            { value: 0 },
            {
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top center",
                markers: false,
              },
              value: endValue,
              duration: 2,
              ease: "power2.out",
              onUpdate: function () {
                numberEl.textContent = Math.floor(this.targets()[0].value)
              },
            },
          )
        }
      })
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-red-600/20">
      <div className="mx-auto">
        <div ref={headingRef} className="">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            About SPD Solutions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400"></div>
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              SPD Solutions is a dynamic software development company dedicated to creating world-class web applications
              and software solutions. We specialize in building scalable, innovative digital products that drive
              business growth.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our team of experienced developers combines cutting-edge technology with creative problem-solving to
              deliver exceptional results for businesses of all sizes.
            </p>
            <div className="space-y-4 mt-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-300 pt-1">Custom Web Applications</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-300 pt-1">Mobile App Development</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-300 pt-1">Enterprise Solutions</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-600/20 to-black border border-red-600/30 rounded-lg p-8 h-full flex flex-col justify-start">
              <h3 className="text-2xl font-bold text-white mb-4">Founder</h3>
              <p className="text-lg font-semibold text-red-500 mb-2">Gokul Kannan</p>
              <p className="text-gray-300 mb-4">CSE Graduate, Chennai Institute of Technology</p>
              <p className="text-gray-400">
                Passionate about building innovative solutions and leading a team of talented developers to create
                exceptional digital experiences.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-600/20 to-black border border-red-600/30 rounded-lg p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.368 1.563 4.619l1.68-1.68a1 1 0 011.414 0l3.141 3.141a1 1 0 010 1.414l-1.68 1.68c1.251.978 2.871 1.563 4.619 1.563.319 0 .624-.044.924-.102l.773 1.548a1 1 0 011.06.54l.436.741A1 1 0 0118 17.153V19a1 1 0 01-1 1h-2C9.716 20 3 13.284 3 5V3z" />
                  </svg>
                  <p className="text-gray-300">+91 99412 69128</p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <p className="text-gray-300">gokul8506@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
