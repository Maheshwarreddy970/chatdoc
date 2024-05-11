"use client"

import Dashboard from '@/components/Dashboard'
import { motion } from "framer-motion";

const Page = () => {
  return (
    <motion.main
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className=" relative flex flex-col  items-center  justify-center top-0 bottom-0 left-0 right-0  h-full w-full "
    >
      <Dashboard />
    </motion.main>
  )
}

export default Page


