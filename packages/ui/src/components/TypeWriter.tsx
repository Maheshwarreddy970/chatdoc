"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {
};

export const TypewriterTitle = (props: Props) => {
  return (
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
  );
};
