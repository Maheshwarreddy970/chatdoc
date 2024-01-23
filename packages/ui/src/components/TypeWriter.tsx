"use client"

import React, { Children, ReactNode } from "react";
import Typewriter from "typewriter-effect";

type Props = {
  children: ReactNode,
  className?:string
};

export const TypewriterTitle = () => {
  return (
    <div className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
      <Typewriter
        options={{
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("Chatdoc allows you to have conversations with any PDF document.")
            .pauseFor(500)
            .deleteAll()
            .typeString("Simply upload your file and start asking questions right away.")
            .start();
        }}
      />
    </div>
  );
};

export const TypeWrit=({children,className}:Props)=>{
  return(
    <div className={`${className}`}>
      <Typewriter
        options={{
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(`${children}`)
            .pauseFor(500)
            .deleteAll()
            .start();
        }}
      />
    </div>
  )
}
