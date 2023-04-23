import React from "react";
import Navigation from "../Global/Components/Header/Header";
import Footer from "../Global/Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Description from "./Components/Description/Description";
import Testimonials from "./Components/Testimonials/Testimonials";
import Services from "./Components/ServicesSection/Services";
import SEO from "./Components/SEO/SEO";

export const Home = () => {
  return (
    <div>
      <header>
        <Navigation />
        <Hero />
      </header>

      <main>
        <Services />
        <Description />
        <Testimonials />
      </main>

      <footer style={{ backgroundColor: "#edeff2" }}>
        <Footer />
      </footer>

      <SEO />
    </div>
  );
};
