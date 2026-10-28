"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Это наш Дышащий Орб, теперь он прямо внутри файла, и компьютер его точно найдет!
function FocusOrb() {
  const [isFlowing, setIsFlowing] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0));
      mouseY.set(e.clientY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="relative w-64 h-64 rounded-full cursor-pointer flex items-center justify-center"
      onClick={() => setIsFlowing(!isFlowing)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20"
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 20px rgba(255,255,255,0.1)",
            "0 0 60px rgba(255,255,255,0.3)",
            "0 0 20px rgba(255,255,255,0.1)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 text-white/80 font-light tracking-widest text-sm uppercase select-none">
        {isFlowing ? "Deep Focus" : "Breathe"}
      </div>
    </motion.div>
  );
}

// Это главная страница, которая использует наш Орб
export default function Home() {
  const [isFlowing, setIsFlowing] = useState(false);

  return (
    <main className="relative h-screen w-screen bg-[#0a0a0f] overflow-hidden flex flex-col items-center justify-center">
      {/* Фоновый градиент, который меняется при клике */}
      <motion.div 
        className="absolute inset-0 opacity-30 blur-[120px]"
        animate={{
          background: isFlowing 
            ? "radial-gradient(circle, #6366f1 0%, #0a0a0f 70%)" // Индиго для фокуса
            : "radial-gradient(circle, #ec4899 0%, #0a0a0f 70%)", // Розовый для отдыха
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Текст сверху */}
      <div className="absolute top-1/4 text-center pointer-events-none z-20">
        <h1 className="text-white/90 text-5xl md:text-7xl font-extralight tracking-widest mb-4">
          LUMINA
        </h1>
        <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
          Твое цифровое святилище
        </p>
      </div>

      {/* Сам Орб (при клике меняем состояние для фона) */}
      <div onClick={() => setIsFlowing(!isFlowing)} className="z-20">
        <FocusOrb />
      </div>

      {/* Подсказка снизу */}
      <div className="absolute bottom-10 text-white/20 text-xs tracking-widest uppercase">
        Нажми на сферу, чтобы сменить режим
      </div>
    </main>
  );
}