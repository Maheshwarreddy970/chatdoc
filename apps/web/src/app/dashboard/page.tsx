"use client"

import Dashboard from '@/components/Dashboard'
import { motion } from "framer-motion";
import { AuroraBackground } from '@/components/aurora-background';

const Page =() => {
  return(
    <AuroraBackground>
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
    <Dashboard/>
    </motion.div>
    </AuroraBackground>
  ) 
}

export default Page


