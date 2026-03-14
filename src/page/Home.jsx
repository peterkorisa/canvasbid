import React from 'react'
import Navbar from '../component/Navbar'
import { Link } from 'react-router-dom'
import HeroSection from '../component/Hero'
import FeaturedSection from '../component/Features'
import StatsSection from '../component/Stat'
import HeroSection2 from '../component/Hero2'
import FeaturedCards from '../component/FeatureCard'
import Footer from '../component/Footer'

const Home = () => {
  return (
<div className="!bg-gradient-to-r !from-indigo-50 !via-white !to-pink-50">
<Navbar />
<HeroSection />
<FeaturedSection />
<FeaturedCards />
<StatsSection />
<HeroSection2 />
<Footer />

</div>
  )
}

export default Home