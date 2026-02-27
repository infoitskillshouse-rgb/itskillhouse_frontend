import React from 'react'
import { motion, useTransform } from 'framer-motion'

function Card({
  icon,
  title,
  subtitle,
  positionClass,
  bgColor = 'bg-white',
  textColor = 'text-black',
  delay = 0,
  moveX,
  moveY
}) {
  const floatX = moveX ? useTransform(moveX, [-1, 1], [-5, 5]) : 0
  const floatY = moveY ? useTransform(moveY, [-1, 1], [-5, 5]) : 0

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1.05, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      style={{ x: floatX, y: floatY }}
      className={`absolute ${positionClass} ${bgColor} ${textColor} rounded-3xl shadow-xl p-6 w-[290px] sm:w-[220px] text-left`}
    >
      <div className="mb-4">{icon}</div>

      <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] sm:text-[2rem] font-arboria font-black leading-none tracking-tight">
        {title}
      </h2>

      <p className="text-[1.2vw] sm:text-sm font-medium mt-2 opacity-90">
        {subtitle}
      </p>
    </motion.div>
  )
}

export default Card
