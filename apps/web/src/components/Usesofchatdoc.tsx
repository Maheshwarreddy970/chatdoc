"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./wobble-card.tsx";
import book from "@/../public/bookes.jpeg"
import resume from "@/../public/resume.png"

export function Usesofchatdocex() {
  return (
    <div className="grid mt-24 grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800  min-h-[500px] lg:min-h-[300px]"
        className=" "
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
            You Can Chat With Your Own Resume Or Others Aks Ai to Help To Improve It 
          </h2>
        </div>
        <Image
          src={resume}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[30%] grayscale filter -bottom-96 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
          You Can Provide Any File To Get Specific Information Base On File In Your Requested Form
        </h2>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
            Upload Any Book Get Information Or Key Points. Ai Will Help You In Getting precise Information
          </h2>
         
        </div>
        <Image
          src={book}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-20 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
