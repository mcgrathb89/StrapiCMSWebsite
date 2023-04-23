import axios from "axios";
import { useEffect, useState } from "react";
import AppContext from "../../../../data";

const Hero = () => {
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [bannerImage, setBannerImage] = useState();

  useEffect(() => {
    getTitle();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSubTitle();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getBannerImage();
    // eslint-disable-next-line
  }, []);

  const pageData = `${AppContext.domain}/api/homepage?populate=Hero.Image`;

  const getTitle = () => {
    axios.get(pageData).then((res) => {
      setTitle(res.data.data.attributes.Hero.Title);
    });
  };

  const getSubTitle = () => {
    axios.get(pageData).then((res) => {
      setSubTitle(res.data.data.attributes.Hero.Subtitle);
    });
  };

  const getBannerImage = () => {
    axios.get(pageData).then((res) => {
      setBannerImage(res.data.data.attributes.Hero.Image.data.attributes.url);
    });
  };

  const pageTitle = title ? title : "Virtual Assistant";

  const animationDelay = 300;

  return (
    <div
      className="hero-section centered"
      key={title}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bannerImage})`,
      }}
    >
      <div className="w-container">
        <h1
          className="hero-heading"
          data-aos="fade-in"
          data-aos-delay={animationDelay}
        >
          {pageTitle}
        </h1>
        <div
          className="hero-subheading"
          data-aos="fade-in"
          data-aos-delay={animationDelay}
        >
          {subTitle}
        </div>
        <div data-aos="fade-in" data-aos-delay={animationDelay}>
          <a href="/about" className="heroButtonOne button" role="button">
            Find Out More
          </a>
          <a href="/contact" className="hollow-button all-caps" role="button">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
