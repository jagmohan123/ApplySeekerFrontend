import React from 'react'
import HeroSection from './Section1HeroSection'
import HowItWorks from './Section2HowItWorks'
import PopularCategories from './Section3PopularCategory'
import PopularCompanies from "./Section4PopularFemousCompanies";

export default function Home() {
  return (
    <>
    <section className="homePage page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies /> 
    </section>
  </>
  )
}
