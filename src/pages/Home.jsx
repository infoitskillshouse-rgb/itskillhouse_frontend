import React from 'react'
import HomeText from '../components/HomeText'
import MissionText from '../components/MissionText'
import ButWhy from '../components/ButWhy'
import PainSection from '../components/PainSection'
// import ServiceSection from '../components/ServiceSection'
import HorizontalScrollCarousel from '../components/HorizontalScrollCarousel'
import OurServicesSection from '../components/OurServicesSection'


function Home() {
  return (
    <div >
    <HomeText/>
    <MissionText/>  
    <ButWhy/>
    <PainSection/>
    <OurServicesSection/>
    <HorizontalScrollCarousel/>
    </div>
  )
}

export default Home