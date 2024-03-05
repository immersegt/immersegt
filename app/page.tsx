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
      <a id="mlh-trust-badge" className="mlhTrustBadge" href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=black" target="_blank">
        <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-white.svg" alt="Major League Hacking 2024 Hackathon Season" />
      </a>
      <Header />
      <a id="sponsors" />
      <Sponsors />
      <a id="tracks" />
      <Tracks />
      <Sell />
      <a id="judges" />
      <Judges />
      <a id="faq" />
      <FAQ />
      <Conclusion />
    </main>
  )
}

export default HomePage;