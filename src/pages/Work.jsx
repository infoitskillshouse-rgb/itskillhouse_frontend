import React from 'react'
import WorkHeading from '../components/WorkHeading';
import Portfolio from '../components/Portfolio.jsx';
import CaseStudies from '../components/CaseStudies.jsx';
import Clients from '../components/Clients.jsx';
import Process from '../components/Process.jsx';
import Testimonials from '../components/Testimonials.jsx'

function Work() {
  return (
    <>
<WorkHeading/>
<Portfolio />
      <CaseStudies />
       <Clients />
      <Process />
      <Testimonials /> 
</>
  )
}

export default Work