'use client'

import Image from "next/image";
import logo from "../../public/sketch1704618933812two - Copy.png"


import { MainContainerScroll } from '../components/mainpagecontainer-scroll-animation';
import StepComponent from "@/components/StepComponent";
import { Usesofchatdocex } from "@/components/Usesofchatdoc";

export default function Home() {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <MainContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Chat with your with<span className="ml-1  bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold inline-block text-transparent bg-clip-text">Documents</span> in seconds <br />
                <span className="text-4xl  flex justify-center  md:text-[6rem] font-bold mt-1 leading-none">
                  Chatd<Image src={logo} alt="logo" className="w-7 h-7 lg:h-20 lg:w-20 mt-2 lg:mt-4 animate-spin "></Image>c
                </span>
              </h1>
            </>
          }
        >
        </MainContainerScroll>
      </div>
      <StepComponent></StepComponent>
      <Usesofchatdocex></Usesofchatdocex>
    </>
  );
}



