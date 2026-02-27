import React from 'react'
import AboutHeading from '../components/AboutHeading'
import AboutMission from '../components/AboutMission'
import AboutStats from '../components/AboutStats'
import AboutStory from '../components/AboutStory'
import AboutValues from '../components/AboutValues'
import AboutCTA from '../components/AboutCTA'
import TechStack from '../components/AboutTechStack.jsx'

function About() {
  return (
    <div>
      <AboutHeading/>
      <AboutMission/>
      <AboutStats/>
      <AboutStory/>
      <AboutValues/>
      <TechStack/>
      <AboutCTA/>
    </div>
  )
}

export default About