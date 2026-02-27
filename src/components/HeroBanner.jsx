import React from 'react'
import HeroBannerImg from '../assets/HeroBanner.png'

function HeroBanner() {
  return (
    <div className="">

  {/* Right Side Image */}
  <img
    src={HeroBannerImg}
    alt="Hero Visual"
    className="md:w-1/2 w-[80%] max-w-[500px]"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  />
</div>
  )
}

export default HeroBanner