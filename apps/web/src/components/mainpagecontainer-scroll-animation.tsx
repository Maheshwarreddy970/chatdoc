"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";



const message = [
  <motion.div
  initial={{x:120,opacity:0}}
  animate={{x:0,opacity:1}}
  transition={{duration:0.5,delay:1,type:'spring',stiffness:'200'}}

  className=" flex justify-end">
    <span className=" mt-4 sm:mt-0 even:bg-black border border-black shadow-lg  bg-white w-auto flex justify-center even:text-white py-2 px-3  even:text-left text-right   rounded-lg">
      Hello
      <div className=' ml-4 text-xs select-none mt-4 w-full text-right'>
        9:30
      </div>
    </span>
  </motion.div>,
  <motion.div
  initial={{x:-120,opacity:0}}
  animate={{x:0,opacity:1}}
  transition={{duration:0.5,delay:2,type:'spring',stiffness:'200'}}
  className=" mt-4 sm:mt-0 flex justify-start">
    <span className="  border   shadow-lg text-white  bg-black w-auto  py-2 px-3 text-right   rounded-lg">
        Hello! How can I assist you today?
      <div className=' mr-4  text-xs select-none mt-4 w-full text-right'>
        9:30
      </div>
    </span>
  </motion.div>,
  <motion.div 
  initial={{x:120,opacity:0}}
  animate={{x:0,opacity:1}}
  transition={{duration:0.5,delay:3,type:'spring',stiffness:'200'}}
  className=" flex justify-end">
    <span className=" border border-black shadow-lg mt-4 sm:mt-0 bg-white w-auto  py-2 px-3   text-right   rounded-lg">
    Give me five points to improve in my resume
      <div className=' ml-2 text-xs select-none mt-2 w-full text-right'>
        9:30
      </div>
    </span>
  </motion.div>,

  <motion.div 
  initial={{x:-120,opacity:0}}
  animate={{x:0,opacity:1}}
  transition={{duration:0.5,delay:4,type:'spring',stiffness:'200'}}
  className="border text-base flex flex-col gap-3 mt-4 shadow-lg text-white  bg-black w-auto  py-3 px-5 text-left   rounded-lg">
    <div  className=" mb-2">Sure, here are five key points to improve your resume:</div>
    <div>
      <span className="font-semibold">Quantifiable Achievements: </span>
      Highlight specific accomplishments with measurable results.</div>
    <div>
    <span className="font-semibold"> Skills Section: </span>
     Clearly outline your relevant technical and soft skills.
    </div>
    <div>
    <span className="font-semibold"> Professional Summary:</span>

       Craft a compelling summary that captures your expertise and career goals concisely.
    </div>
    <div>
    <span className="font-semibold">Action-Oriented Language: </span>
       Use strong verbs and concise language to describe your accomplishments.
      Customization
    </div>
    <div className='text-xs select-none w-full text-right'>
      9:30
    </div>
  </motion.div>


]

export const MainContainerScroll = ({
  titleComponent,
}: {
  titleComponent: string | React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] mt-4 md:h-[80rem] flex items-center justify-center relative p-3 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          <div className=" bg-[url('/backgroundimage.jpg')] overflow-hidden  w-full h-full bg-cover backdrop-blur-2xl px-2 lg:p-0 lg:pt-16">
            {
              message.map((data) => (
                <>
                  {data}
                </>
              ))
            }
          </div>
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};
