"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

// ─────────────────────────────────────────────
// Full-screen SVG scene components
// ─────────────────────────────────────────────

function SceneServer() {
  return (
    <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      {/* Background glow */}
      <defs>
        <radialGradient id="sg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="ledg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#sg)"/>

      {/* Main server rack chassis */}
      <rect x="240" y="60" width="320" height="380" rx="6" fill="#060606" stroke="#dc2626" strokeWidth="1.5"/>
      {/* Rack side rails */}
      <rect x="240" y="60" width="20" height="380" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5"/>
      <rect x="540" y="60" width="20" height="380" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5"/>

      {/* Server units — 7 rows */}
      {[0,1,2,3,4,5,6].map(i => {
        const y = 80 + i * 50
        const isActive = i < 5
        return (
          <g key={i}>
            <rect x="265" y={y} width="270" height="40" rx="2" fill={isActive ? "#0f0000" : "#080808"} stroke={isActive ? "#dc262640" : "#111"} strokeWidth="0.8"/>
            {/* Unit label */}
            <text x="278" y={y + 15} fontSize="7" fill={isActive ? "#dc262680" : "#222"} fontFamily="monospace">U{(i+1).toString().padStart(2,"0")}</text>
            {/* Bar graph activity */}
            {isActive && [0,1,2,3,4,5].map(b => (
              <rect key={b} x={290 + b * 12} y={y + 10} width="8" height={5 + (b * 3) % 18}
                fill={`#dc2626${30 + b * 10}`} rx="1"
                style={{ transformOrigin: `${290 + b * 12 + 4}px ${y + 35}px`, transform: "scaleY(-1)" }}/>
            ))}
            {/* Status LEDs */}
            <circle cx="500" cy={y + 12} r="3" fill={isActive ? "#22c55e" : "#111"}
              style={isActive ? { animation: `blink ${0.8 + i * 0.2}s step-end infinite` } : {}}/>
            <circle cx="515" cy={y + 12} r="3" fill={isActive && i % 2 === 0 ? "#dc2626" : "#111"}
              style={isActive && i % 2 === 0 ? { animation: "blink 1.2s step-end infinite" } : {}}/>
            <circle cx="530" cy={y + 12} r="3" fill={isActive && i === 0 ? "#f59e0b" : "#111"}/>
            {/* Port row */}
            {[0,1,2,3,4,5,6,7].map(p => (
              <rect key={p} x={286 + p * 14} y={y + 24} width="10" height="8" rx="1"
                fill={isActive && p < 6 ? "#0d0d0d" : "#080808"} stroke={isActive && p < 6 ? "#dc262630" : "#0d0d0d"} strokeWidth="0.5"/>
            ))}
          </g>
        )
      })}

      {/* Cable management on the right */}
      {[0,1,2,3,4].map(i => (
        <path key={i} d={`M 560 ${100 + i * 50} Q 600 ${110 + i * 50} 620 ${120 + i * 50}`}
          fill="none" stroke={`#dc2626${20 + i * 5}`} strokeWidth="3" strokeLinecap="round"/>
      ))}

      {/* Power supply at bottom */}
      <rect x="265" y="410" width="130" height="20" rx="2" fill="#0a0000" stroke="#dc262640" strokeWidth="0.8"/>
      <text x="278" y="423" fontSize="6" fill="#dc262660" fontFamily="monospace">PSU-1 ● 750W</text>
      <rect x="405" y="410" width="130" height="20" rx="2" fill="#0a0000" stroke="#dc262440" strokeWidth="0.8"/>
      <text x="418" y="423" fontSize="6" fill="#dc262660" fontFamily="monospace">PSU-2 ● 750W</text>

      {/* Floating data labels */}
      <text x="100" y="140" fontSize="9" fill="#dc262660" fontFamily="monospace">CPU: 42%</text>
      <text x="100" y="158" fontSize="9" fill="#dc262640" fontFamily="monospace">RAM: 18.4 GB</text>
      <text x="100" y="176" fontSize="9" fill="#dc262630" fontFamily="monospace">TEMP: 38°C</text>
      <line x1="180" y1="155" x2="262" y2="175" stroke="#dc262620" strokeWidth="0.5" strokeDasharray="3 3"/>

      <text x="570" y="200" fontSize="9" fill="#dc262660" fontFamily="monospace">NET: 1.2 Gb/s</text>
      <text x="570" y="218" fontSize="9" fill="#dc262640" fontFamily="monospace">PKT: 48.2k/s</text>
      <line x1="568" y1="208" x2="560" y2="225" stroke="#dc262620" strokeWidth="0.5" strokeDasharray="3 3"/>
    </svg>
  )
}

function SceneDatabase() {
  return (
    <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="dg" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#dg)"/>

      {/* 3 database cylinders side by side */}
      {[0,1,2].map(i => {
        const cx = 180 + i * 220
        const isActive = i < 3
        const h = 150 + i * 20
        const color = ["#dc2626","#ef4444","#f87171"][i]
        return (
          <g key={i}>
            {/* Body */}
            <rect x={cx - 60} y={180 - h/2} width="120" height={h} fill={`${color}08`} stroke={`${color}30`} strokeWidth="1"/>
            {/* Top ellipse */}
            <ellipse cx={cx} cy={180 - h/2} rx="60" ry="12" fill={`${color}18`} stroke={color} strokeWidth="1"/>
            {/* Bottom ellipse */}
            <ellipse cx={cx} cy={180 + h/2} rx="60" ry="12" fill={`${color}12`} stroke={`${color}50`} strokeWidth="0.8"/>
            {/* Horizontal bands */}
            {[1,2,3].map(b => (
              <line key={b} x1={cx - 60} y1={180 - h/2 + b * (h/4)} x2={cx + 60} y2={180 - h/2 + b * (h/4)}
                stroke={`${color}20`} strokeWidth="0.5"/>
            ))}
            {/* Reflection */}
            <ellipse cx={cx - 20} cy={180 - h/2} rx="20" ry="4" fill={`${color}30`} stroke="none"/>
            {/* Label */}
            <text x={cx} y={180 + h/2 + 28} textAnchor="middle" fontSize="9" fill={`${color}80`} fontFamily="monospace">DB-{i+1}</text>
            <text x={cx} y={180 + h/2 + 42} textAnchor="middle" fontSize="7" fill={`${color}50`} fontFamily="monospace">{["PRIMARY","REPLICA","ARCHIVE"][i]}</text>
            {/* Status dot */}
            <circle cx={cx + 50} cy={180 - h/2 + 8} r="4" fill={color}
              style={{ animation: `blink ${0.9 + i * 0.3}s step-end infinite` }}/>
          </g>
        )
      })}

      {/* Connection lines between DBs */}
      <line x1="240" y1="195" x2="340" y2="195" stroke="#ef444430" strokeWidth="1.5" strokeDasharray="6 4"/>
      <line x1="460" y1="195" x2="560" y2="195" stroke="#ef444430" strokeWidth="1.5" strokeDasharray="6 4"/>

      {/* Query flow arrows */}
      <path d="M 400 330 L 400 370 L 300 370" fill="none" stroke="#ef444440" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#arr)"/>

      {/* Floating stats */}
      <text x="60" y="300" fontSize="9" fill="#ef444460" fontFamily="monospace">QUERIES: 1.2k/s</text>
      <text x="60" y="316" fontSize="9" fill="#ef444440" fontFamily="monospace">INDEX HIT: 98.4%</text>
      <text x="620" y="300" fontSize="9" fill="#ef444460" fontFamily="monospace">REPL LAG: 2ms</text>
      <text x="620" y="316" fontSize="9" fill="#ef444440" fontFamily="monospace">SYNC: LIVE</text>
    </svg>
  )
}

function SceneProducts() {
  return (
    <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="pg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#pg)"/>

      {/* 6 product cards in 3x2 grid */}
      {[
        { label: "E-Commerce",  sub: "Web App",       x: 120, y: 80  },
        { label: "Warehouse",   sub: "Enterprise",    x: 340, y: 80  },
        { label: "Lorry",       sub: "Logistics",     x: 560, y: 80  },
        { label: "Biller",      sub: "Business",      x: 120, y: 260 },
        { label: "Portfolio",   sub: "Web Design",    x: 340, y: 260 },
        { label: "Attendance",  sub: "HR & Payroll",  x: 560, y: 260 },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width="180" height="120" rx="3"
            fill={`#f8717108`} stroke={`#f8717130`} strokeWidth="1"/>
          {/* Image area */}
          <rect x={p.x + 8} y={p.y + 8} width="164" height="60" rx="2" fill="#0a0a0a" stroke="#f8717118" strokeWidth="0.5"/>
          {/* Placeholder lines */}
          {[0,1,2].map(l => (
            <line key={l} x1={p.x + 16} y1={p.y + 22 + l * 12} x2={p.x + 80 + l * 15} y2={p.y + 22 + l * 12}
              stroke="#f8717125" strokeWidth="1.5" strokeLinecap="round"/>
          ))}
          {/* Corner tag */}
          <rect x={p.x + 110} y={p.y + 12} width="58" height="14" rx="2" fill="#f8717120" stroke="#f8717140" strokeWidth="0.5"/>
          <text x={p.x + 116} y={p.y + 22} fontSize="6" fill="#f8717180" fontFamily="monospace">{p.sub}</text>
          {/* Title */}
          <text x={p.x + 8} y={p.y + 88} fontSize="9" fill="#f87171" fontFamily="monospace" fontWeight="bold">{p.label}</text>
          {/* Feature dots */}
          {[0,1,2].map(d => (
            <circle key={d} cx={p.x + 12 + d * 16} cy={p.y + 104} r="2.5"
              fill={d === 0 ? "#dc2626" : "#f8717130"} stroke="#f8717120" strokeWidth="0.5"/>
          ))}
          {/* Active indicator */}
          <circle cx={p.x + 170} cy={p.y + 10} r="3" fill="#22c55e"
            style={{ animation: `blink ${0.8 + i * 0.15}s step-end infinite` }}/>
        </g>
      ))}
    </svg>
  )
}

function SceneBiller() {
  return (
    <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg2)"/>

      {/* CPU die */}
      <rect x="280" y="100" width="240" height="240" rx="4" fill="#060606" stroke="#dc2626" strokeWidth="1.5"/>
      {/* Inner die */}
      <rect x="310" y="130" width="180" height="180" rx="2" fill="#0a0000" stroke="#dc262640" strokeWidth="1"/>
      {/* Core grid 3x3 */}
      {[0,1,2].map(row => [0,1,2].map(col => (
        <rect key={`${row}-${col}`}
          x={320 + col * 56} y={140 + row * 56} width="44" height="44" rx="2"
          fill={`#dc2626${8 + (row * 3 + col) * 3}`}
          stroke={`#dc2626${30 + (row * 3 + col) * 5}`} strokeWidth="0.8"/>
      )))}
      {/* Grid lines */}
      {[376, 432].map(x => <line key={x} x1={x} y1="130" x2={x} y2="310" stroke="#dc262620" strokeWidth="0.5"/>)}
      {[196, 252].map(y => <line key={y} x1="310" y1={y} x2="490" y2={y} stroke="#dc262620" strokeWidth="0.5"/>)}

      {/* Pin legs - top */}
      {[300,320,340,360,380,400,420,440,460].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="100" x2={x} y2="70" stroke="#dc262650" strokeWidth="1.5"/>
          <rect x={x - 3} y="62" width="6" height="8" rx="1" fill="#0a0a0a" stroke="#dc262640" strokeWidth="0.5"/>
        </g>
      ))}
      {/* Pin legs - bottom */}
      {[300,320,340,360,380,400,420,440,460].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="340" x2={x} y2="370" stroke="#dc262550" strokeWidth="1.5"/>
          <rect x={x - 3} y="370" width="6" height="8" rx="1" fill="#0a0a0a" stroke="#dc262440" strokeWidth="0.5"/>
        </g>
      ))}
      {/* Pin legs - left */}
      {[140,170,200,230,260,290].map((y, i) => (
        <g key={i}>
          <line x1="280" y1={y} x2="250" y2={y} stroke="#dc262550" strokeWidth="1.5"/>
          <rect x="242" y={y - 3} width="8" height="6" rx="1" fill="#0a0a0a" stroke="#dc262440" strokeWidth="0.5"/>
        </g>
      ))}
      {/* Pin legs - right */}
      {[140,170,200,230,260,290].map((y, i) => (
        <g key={i}>
          <line x1="520" y1={y} x2="550" y2={y} stroke="#dc262550" strokeWidth="1.5"/>
          <rect x="550" y={y - 3} width="8" height="6" rx="1" fill="#0a0a0a" stroke="#dc262440" strokeWidth="0.5"/>
        </g>
      ))}

      {/* Heat spreader reflection */}
      <rect x="290" y="108" width="60" height="3" rx="1" fill="#dc262625"/>

      {/* Floating labels */}
      <text x="120" y="160" fontSize="9" fill="#dc262660" fontFamily="monospace">CORES: 8</text>
      <text x="120" y="176" fontSize="9" fill="#dc262440" fontFamily="monospace">THREADS: 16</text>
      <text x="590" y="160" fontSize="9" fill="#dc262660" fontFamily="monospace">CLOCK: 3.8GHz</text>
      <text x="590" y="176" fontSize="9" fill="#dc262440" fontFamily="monospace">TDP: 65W</text>
    </svg>
  )
}

function SceneGlobe() {
  const dots = Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * Math.PI * 2
    const r = 150 + (i % 3) * 30
    return {
      x: 400 + Math.cos(angle) * r * 0.85,
      y: 250 + Math.sin(angle) * r * 0.55,
    }
  })
  const connections = [
    [0,8],[8,16],[16,24],[24,32],[32,0],
    [4,12],[12,20],[20,28],[28,36],[36,4],
    [0,4],[8,12],[16,20],[24,28],[32,36],
    [2,18],[10,26],[22,34],
  ]
  return (
    <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.6"/>
          <stop offset="60%" stopColor="#0a1a2a" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cityG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Deep space bg */}
      <rect width="800" height="500" fill="#000"/>
      {/* Stars */}
      {Array.from({length:60},(_,i)=>(
        <circle key={i} cx={(i*137)%800} cy={(i*79)%500} r={i%5===0?1.2:0.6}
          fill="white" opacity={0.2+i%4*0.1}/>
      ))}

      {/* Globe base */}
      <ellipse cx="400" cy="250" rx="195" ry="185" fill="url(#globeGrad)" stroke="#3b82f630" strokeWidth="1"/>

      {/* Atmosphere glow */}
      <ellipse cx="400" cy="250" rx="205" ry="195" fill="none" stroke="#3b82f620" strokeWidth="8"/>
      <ellipse cx="400" cy="250" rx="215" ry="205" fill="none" stroke="#3b82f610" strokeWidth="6"/>

      {/* Latitude lines */}
      {[-100,-60,-20,20,60,100].map((offset, i) => (
        <ellipse key={i} cx="400" cy={250 + offset * 0.7}
          rx={Math.sqrt(185*185 - offset*offset*0.5) * 0.9} ry={Math.abs(offset) < 20 ? 18 : 10}
          fill="none" stroke="#3b82f615" strokeWidth="0.5"/>
      ))}
      {/* Longitude lines */}
      {[0,36,72,108,144].map((angle, i) => (
        <ellipse key={i} cx="400" cy="250" rx={Math.cos(angle*Math.PI/180)*195} ry="185"
          fill="none" stroke="#3b82f612" strokeWidth="0.5"/>
      ))}

      {/* Network connections */}
      {connections.map(([a,b],i) => (
        <line key={i}
          x1={dots[a]?.x} y1={dots[a]?.y}
          x2={dots[b]?.x} y2={dots[b]?.y}
          stroke="#3b82f625" strokeWidth="0.8"
          strokeDasharray={i%3===0 ? "none" : "3 4"}/>
      ))}

      {/* Network nodes */}
      {dots.slice(0,30).map((d,i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={i%5===0?4:2} fill="#3b82f6" opacity={0.5+i%3*0.15}
            style={i%5===0 ? { animation: `blink ${0.8+i%4*0.3}s step-end infinite` } : {}}/>
          {i%5===0 && <circle cx={d.x} cy={d.y} r="8" fill="none" stroke="#3b82f640" strokeWidth="0.5"/>}
        </g>
      ))}

      {/* City lights (warm glow clusters) */}
      {[
        { cx: 340, cy: 200 }, // N America
        { cx: 450, cy: 200 }, // Europe
        { cx: 510, cy: 250 }, // Asia
        { cx: 380, cy: 300 }, // S America
      ].map((c, i) => (
        <g key={i}>
          <ellipse cx={c.cx} cy={c.cy} rx="18" ry="10" fill="url(#cityG)" opacity="0.6"/>
          {[...Array(5)].map((_,j)=>(
            <circle key={j} cx={c.cx+(j-2)*6} cy={c.cy+(j%2)*4-2} r="1.5"
              fill="#f59e0b" opacity={0.4+j*0.1}
              style={{ animation: `blink ${0.5+j*0.2}s step-end infinite` }}/>
          ))}
        </g>
      ))}

      {/* Orbit ring with moving satellite */}
      <ellipse cx="400" cy="250" rx="220" ry="80" fill="none" stroke="#3b82f618" strokeWidth="1" strokeDasharray="6 6"
        style={{ animation: "spinOrbit 8s linear infinite", transformOrigin: "400px 250px" }}/>

      {/* Floating labels */}
      <text x="60" y="180" fontSize="9" fill="#3b82f680" fontFamily="monospace">NODES: 2,847</text>
      <text x="60" y="196" fontSize="9" fill="#3b82f650" fontFamily="monospace">LATENCY: &lt;2ms</text>
      <text x="590" y="180" fontSize="9" fill="#3b82f680" fontFamily="monospace">UPTIME: 99.9%</text>
      <text x="590" y="196" fontSize="9" fill="#3b82f650" fontFamily="monospace">TLS: 1.3</text>
    </svg>
  )
}

function SceneTerminal() {
  return (
    <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="tg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#tg)"/>

      {/* Monitor bezel */}
      <rect x="160" y="60" width="480" height="320" rx="8" fill="#060606" stroke="#f8717140" strokeWidth="1.5"/>
      {/* Screen */}
      <rect x="172" y="72" width="456" height="296" rx="4" fill="#050505"/>
      {/* Scanline texture */}
      {Array.from({length:30},(_,i)=>(
        <line key={i} x1="172" y1={72+i*10} x2="628" y2={72+i*10} stroke="#f8717105" strokeWidth="0.5"/>
      ))}

      {/* Terminal content */}
      {[
        { text: "$ spd-solutions init", color: "#f87171", y: 100 },
        { text: "> Loading modules...", color: "#888", y: 118 },
        { text: "> Hero      ✓ Online",  color: "#22c55e", y: 136 },
        { text: "> About     ✓ Ready",   color: "#22c55e", y: 154 },
        { text: "> Products  ✓ Loaded",  color: "#22c55e", y: 172 },
        { text: "> Biller    ✓ Active",  color: "#22c55e", y: 190 },
        { text: "> Lorry     ✓ Tracking",color: "#22c55e", y: 208 },
        { text: "> Contact   ✓ Ready",   color: "#22c55e", y: 226 },
        { text: "", color: "#888", y: 244 },
        { text: "> All systems nominal.", color: "#f87171", y: 262 },
        { text: "> Launching platform...",color: "#f87171", y: 280 },
        { text: "$ _",                   color: "#f87171", y: 298, blink: true },
      ].map((l, i) => (
        <text key={i} x="188" y={l.y} fontSize="11" fill={l.color} fontFamily="monospace"
          style={l.blink ? { animation: "blink 0.8s step-end infinite" } : {}}>{l.text}</text>
      ))}

      {/* Top bar dots */}
      <circle cx="192" cy="84" r="5" fill="#ff5f57"/>
      <circle cx="208" cy="84" r="5" fill="#febc2e"/>
      <circle cx="224" cy="84" r="5" fill="#28c840"/>
      <text x="260" y="88" fontSize="9" fill="#444" fontFamily="monospace">spd@production ~ bash</text>

      {/* Stand */}
      <rect x="368" y="380" width="64" height="24" rx="3" fill="#0a0a0a" stroke="#f8717120" strokeWidth="0.8"/>
      <rect x="320" y="400" width="160" height="10" rx="3" fill="#080808" stroke="#f8717115" strokeWidth="0.8"/>

      {/* Glow under screen */}
      <ellipse cx="400" cy="405" rx="120" ry="12" fill="#f8717110" style={{ filter: "blur(8px)" }}/>
    </svg>
  )
}

// ─────────────────────────────────────────────
// Scene config
// ─────────────────────────────────────────────

const SCENES = [
  { id: "server",   label: "SERVER NODE",   sub: "Primary rack · SG-NODE-03",        duration: 1600, Component: SceneServer   },
  { id: "database", label: "DATABASE",      sub: "Storage array · APAC-01",           duration: 1600, Component: SceneDatabase  },
  { id: "products", label: "PRODUCTS",      sub: "Module registry · loaded",          duration: 1600, Component: SceneProducts  },
  { id: "biller",   label: "PROCESSOR",     sub: "Compute node · 8 cores active",     duration: 1600, Component: SceneBiller    },
  { id: "lorry",    label: "NETWORK",       sub: "Global CDN · 2,847 nodes online",   duration: 1800, Component: SceneGlobe     },
  { id: "terminal", label: "TERMINAL",      sub: "All systems nominal · launching",   duration: 1600, Component: SceneTerminal  },
]

const TOTAL_MS = SCENES.reduce((s, sc) => s + sc.duration, 0) + 800

export default function Launch({ onComplete }) {
  const wrapRef    = useRef(null)
  const sceneRef   = useRef(null)
  const labelRef   = useRef(null)
  const subRef     = useRef(null)
  const barRef     = useRef(null)

  const [sceneIdx, setSceneIdx]   = useState(0)
  const [progress, setProgress]   = useState(0)
  const [done, setDone]           = useState(false)

  const transitionTo = (idx) => {
    if (!sceneRef.current) return
    gsap.to(sceneRef.current, {
      opacity: 0, scale: 1.04, duration: 0.35, ease: "power2.in",
      onComplete: () => {
        setSceneIdx(idx)
        gsap.fromTo(sceneRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        )
        if (labelRef.current && subRef.current) {
          gsap.fromTo([labelRef.current, subRef.current],
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
          )
        }
      }
    })
  }

  useEffect(() => {
    gsap.fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })

    const timers = []
    let elapsed = 0

    SCENES.forEach((sc, i) => {
      timers.push(setTimeout(() => transitionTo(i), elapsed))
      elapsed += sc.duration
    })

    // Progress
    const start = performance.now()
    const tick = () => {
      const pct = Math.min(((performance.now() - start) / TOTAL_MS) * 100, 100)
      setProgress(pct)
      if (pct < 100) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    // Exit
    timers.push(setTimeout(() => {
      setDone(true)
      gsap.to(wrapRef.current, {
        clipPath: "polygon(0 0,100% 0,100% 0%,0 0%)",
        duration: 0.9, ease: "power4.inOut",
        onComplete,
      })
    }, TOTAL_MS))

    return () => timers.forEach(clearTimeout)
  }, [])

  const scene = SCENES[sceneIdx]

  return (
    <div ref={wrapRef} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#000",
      overflow: "hidden",
      fontFamily: "'Courier New', monospace",
      clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    }}>

      {/* Scene visual */}
      <div ref={sceneRef} style={{ position: "absolute", inset: 0 }}>
        <scene.Component />
      </div>

      {/* Dark gradient overlay — top and bottom */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.8) 100%)",
      }} />

      {/* Corner brackets */}
      {[
        { top: 20, left: 20, borderTop: "1px solid #dc262650", borderLeft: "1px solid #dc262650" },
        { top: 20, right: 20, borderTop: "1px solid #dc262650", borderRight: "1px solid #dc262650" },
        { bottom: 20, left: 20, borderBottom: "1px solid #dc262650", borderLeft: "1px solid #dc262650" },
        { bottom: 20, right: 20, borderBottom: "1px solid #dc262650", borderRight: "1px solid #dc262650" },
      ].map((s, i) => <div key={i} style={{ position: "absolute", width: 28, height: 28, ...s }} />)}

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 28px",
        borderBottom: "1px solid #dc262618",
        background: "rgba(0,0,0,0.5)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#dc2626",
            boxShadow: "0 0 8px #dc2626", animation: "blink 1s step-end infinite" }}/>
          <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "#dc2626", textTransform: "uppercase" }}>
            SPD Solutions · Boot Sequence
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {SCENES.map((sc, i) => (
            <div key={sc.id} style={{
              width: i === sceneIdx ? 20 : 6, height: 6, borderRadius: 3,
              background: i < sceneIdx ? "#22c55e" : i === sceneIdx ? "#dc2626" : "#222",
              transition: "all 0.4s ease",
            }}/>
          ))}
        </div>
        <span style={{ fontSize: 9, color: "#444", letterSpacing: "0.15em" }}>
          {sceneIdx + 1} / {SCENES.length}
        </span>
      </div>

      {/* Center label */}
      <div style={{
        position: "absolute", bottom: 100, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      }}>
        <h1 ref={labelRef} style={{
          fontSize: "clamp(18px,3vw,32px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          margin: 0,
          textShadow: "0 0 40px rgba(220,38,38,0.5)",
        }}>
          {scene.label}
        </h1>
        <p ref={subRef} style={{
          fontSize: 11, color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.15em", textTransform: "uppercase", margin: 0,
        }}>
          {scene.sub}
        </p>
      </div>

      {/* Bottom progress */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "16px 28px 24px",
        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontSize: 9, color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: 6,
        }}>
          <span>Loading infrastructure</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1 }}>
          <div ref={barRef} style={{
            height: "100%",
            width: `${progress}%`,
            background: done ? "#22c55e" : "linear-gradient(90deg,#7f1d1d,#dc2626)",
            borderRadius: 1,
            transition: "width 0.12s linear, background 0.4s",
            boxShadow: "0 0 8px #dc262660",
          }}/>
        </div>
      </div>

      <style>{`
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinOrbit{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  )
}