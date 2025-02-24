import React from 'react'
import { motion } from 'framer-motion'

const AnimatedSection = ({ children, variants }) => {
   return <motion.div variants={variants}>{children}</motion.div>
}

export default AnimatedSection
