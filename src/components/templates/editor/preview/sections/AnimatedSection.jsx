// 애니메이션 래퍼 컴포넌트
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedSection = ({ shouldAnimate, animation, children }) => {
   if (!shouldAnimate) return children

   return (
      <AnimatePresence mode="wait">
         <motion.div variants={animation} initial="initial" animate="animate" exit="exit">
            {children}
         </motion.div>
      </AnimatePresence>
   )
}

export default AnimatedSection
