"use client";
import React, { useRef } from "react";
import {motion, MotionValue } from "framer-motion";

export const Stepsdisplay = ({
  children,
  rotateY
}: {
  children: React.ReactNode;
  rotateY:number;
}) => {
  return (
    <motion.div
      initial={{rotateY:rotateY}}
      whileInView={{rotateY:0}}
      transition={{duration:1, ease:'easeInOut'}}
      style={{
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className=" -mt-12 h-72 w-96 border-4 border-[#6C6C6C] p-3 bg-[#222222] rounded-[30px] shadow-xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};
