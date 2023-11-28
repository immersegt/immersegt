'use client';

import '../styles/index.css'

import Header from '../components/Header';
import Sponsors from '../components/Sponsors';
import Tracks from '../components/Tracks';
import Sell from '../components/Sell';
import Judges from '../components/Judges';
import FAQ from '../components/FAQ';
import Conclusion from '../components/Conclusion';

const HomePage = () => {
  return (
      <main>
        <Header/>
        <Sponsors/>
        <a id="tracks"/>
        <Tracks/>
        <Sell/>
        <Judges/>
        <FAQ/>
        <Conclusion/>
      </main>
  )
}

export default HomePage;