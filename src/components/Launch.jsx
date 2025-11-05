// src/components/Launch.jsx
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";

export default function Launch({ onLaunchComplete }) {
  const [phase, setPhase] = useState("placement");
  const [loaderPhase, setLoaderPhase] = useState("flash");
  const [progress, setProgress] = useState(0);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [logoPlaced, setLogoPlaced] = useState(false);

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Random start position
  useEffect(() => {
    if (phase !== "placement" || logoPosition.x !== 0) return;
    if (!containerRef.current) return;

    const w = containerRef.current.clientWidth - 160;
    const h = containerRef.current.clientHeight - 160;
    setLogoPosition({ x: Math.random() * w, y: Math.random() * h });
  }, [phase, logoPosition.x]);

  // Loading phase
  useEffect(() => {
    if (phase !== "loading") return;

    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 50);

    const timers = [
      setTimeout(() => setLoaderPhase("circle"), 2000),
      setTimeout(() => setLoaderPhase("bomb"), 3500),
      setTimeout(() => setLoaderPhase("complete"), 4500),
      setTimeout(() => setPhase("launching"), 5500),
    ];

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [phase]);

  // Unified drag start (mouse + touch)
  const startDrag = (e) => {
    if (phase !== "placement" || !containerRef.current) return;

    const clientX = e.clientX ?? e.touches[0].clientX;
    const clientY = e.clientY ?? e.touches[0].clientY;

    startPos.current = {
      x: clientX - logoPosition.x,
      y: clientY - logoPosition.y,
    };

    isDragging.current = true;
  };

  // Unified drag move
  const moveDrag = (e) => {
    if (!isDragging.current || !containerRef.current) return;

    const clientX = e.clientX ?? e.touches[0].clientX;
    const clientY = e.clientY ?? e.touches[0].clientY;

    const newX = clientX - startPos.current.x;
    const newY = clientY - startPos.current.y;

    setLogoPosition({
      x: Math.max(0, Math.min(newX, containerRef.current.clientWidth - 160)),
      y: Math.max(0, Math.min(newY, containerRef.current.clientHeight - 160)),
    });
  };

  // Unified drag end
  const endDrag = () => {
    if (!isDragging.current || !containerRef.current) return;

    isDragging.current = false;

    const centerX = containerRef.current.clientWidth / 2;
    const centerY = containerRef.current.clientHeight / 2;
    const logoX = logoPosition.x + 80;
    const logoY = logoPosition.y + 80;

    if (Math.abs(logoX - centerX) < 100 && Math.abs(logoY - centerY) < 100) {
      setLogoPlaced(true);
      setTimeout(() => setPhase("loading"), 1000);
    }
  };

  // Final launch
  useEffect(() => {
    if (phase === "launching") {
      const timer = setTimeout(() => onLaunchComplete(), 4000);
      return () => clearTimeout(timer);
    }
  }, [phase, onLaunchComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden touch-none"
      style={{ touchAction: "none" }} // Prevent scrolling while dragging
    >
      {/* PLACEMENT */}
      {phase === "placement" && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-4 border-red-500 rounded-lg bg-red-600/5"></div>
          </div>

          <div
            // Mouse events
            onMouseDown={startDrag}
            onMouseMove={moveDrag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            // Touch events
            onTouchStart={startDrag}
            onTouchMove={moveDrag}
            onTouchEnd={endDrag}
            className="absolute cursor-grab active:cursor-grabbing z-20 select-none touch-none"
            style={{
              left: logoPosition.x,
              top: logoPosition.y,
              transform: "translate3d(0,0,0)", // Force GPU
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-40 h-40 drop-shadow-2xl brightness-125 pointer-events-none"
              draggable={false}
            />
          </div>

          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center z-10 px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-500 mb-3 animate-pulse">
              DRAG LOGO TO RED BOX
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Tap and drag logo to center
            </p>
          </div>

          {logoPlaced && (
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-green-500 text-xl sm:text-2xl font-bold animate-bounce z-10">
              Logo Locked In
            </div>
          )}
        </>
      )}

      {/* LOADING */}
      {phase === "loading" && (
        <div className="text-center z-10 px-4">
          <img src={logo} alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 movie-glitch" />
          <div className="movie-glitch text-5xl sm:text-6xl font-bold text-red-500 mb-3">
            INITIALIZING
          </div>
          <div className="movie-glitch text-2xl sm:text-3xl font-bold text-white mb-6">
            SPD SOLUTIONS
          </div>

          <div className="w-56 sm:w-64 mx-auto">
            <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-red-500 h-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-red-500 text-sm mt-2">{progress}%</div>
          </div>

          <div className="text-red-500 mt-4 text-sm sm:text-base movie-glitch">
            {loaderPhase === "flash" && "SYSTEM ACTIVATION"}
            {loaderPhase === "circle" && "EXPANDING INTERFACE"}
            {loaderPhase === "bomb" && "FINAL INITIALIZATION"}
            {loaderPhase === "complete" && "LOADING COMPLETE"}
          </div>
        </div>
      )}

      {/* LAUNCHING */}
      {phase === "launching" && (
        <div className="text-center z-10 px-4">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 animate-bounce drop-shadow-2xl brightness-150"
          />
          <h2 className="text-4xl sm:text-5xl font-bold text-red-600 animate-pulse">
            LAUNCHING
          </h2>
          <p className="text-gray-400 text-lg">Get ready...</p>
        </div>
      )}
    </div>
  );
}