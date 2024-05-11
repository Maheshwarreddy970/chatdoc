// @NOTE: in case you are using Next.js
"use client";


import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { ReactElement } from "react";

type props={
    children:ReactElement
}

export function Filecard({children}:props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative max-w-[350px] w-full overflow-hidden rounded-xl shadow-xl bg-white"
    >
      <div className="absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
						radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(113, 227, 255, 0.45), transparent 80%)
					`,
        }}
      />
      <div className="relative flex flex-col gap-3 rounded-xl border border-white/10 px-6 py-7">
        <div className="space-y-2">
          <div className="h-52 shadow-inner shadow-white  w-full rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-400">
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}