import React from "react";
import Navbar from "../components/Navbar.jsx";

import Hero from "../components/HeroSection.jsx";
import Test from "../components/TakeTestSection.jsx";
import FAQ from "../components/FAQSection.jsx";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <section id="home" className="mb-12">
        <Hero />
      </section>

      <section id="test" className="py-4 mb-12">
        <Test />
      </section>

      <section id="faq" className="pt-4">
        <FAQ />
      </section>
    </div>
  );
};

export default LandingPage;
