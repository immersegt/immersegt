'use client';
import '../styles/index.css'
import Header from '../components/Header';
import Sponsors from '../components/Sponsors';
import Tracks from '../components/Tracks';
import Workshops from '../components/Workshops';
import Judges from '../components/Judges';
import FAQ from '../components/FAQ';
import Platform from '../components/Platform';

const HomePage = () => {
  return (
      <div>
        <Header/>
        <Sponsors/>
      </div>
  )
}

export default HomePage;