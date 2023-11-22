'use client';

import '../styles/index.css'

import Header from '../components/Header';
import Sponsors from '../components/Sponsors';
import Tracks from '../components/Tracks';
import Conclusion from '../components/Conclusion';
import Judges from '../components/Judges';
import FAQ from '../components/FAQ';

const HomePage = () => {
  return (
      <main>
        <Header/>
        <Sponsors/>
        <a id="tracks"/>
        <Tracks/>
        <Judges/>
        <FAQ/>
        <Conclusion/>
      </main>
  )
}

export default HomePage;