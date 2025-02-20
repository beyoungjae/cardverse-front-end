import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 애니메이션 프롭스 받아서 애니메이션 적용
const AnimatedSection = ({ shouldAnimate, animation, children, show = true }) => {
   if (!shouldAnimate) return show ? children : null

   return (
      <AnimatePresence mode="wait">
         {show && (
            <motion.div variants={animation} initial="initial" animate="animate" exit="exit" style={{ marginBottom: '16px' }}>
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   )
}

export default AnimatedSection
