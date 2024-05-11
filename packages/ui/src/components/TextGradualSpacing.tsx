import { AnimatePresence, motion } from "framer-motion";

export function GradualSpacing() {
  const text = "My Files";
  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="flex space-x-1 justify-center">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center animate-shine bg-[linear-gradient(110deg,#0f0f0f,45%,#b3bac5,55%,#0f0f0f)] bg-[length:200%_100%] text-transparent bg-clip-text	 font-display text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem]"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}