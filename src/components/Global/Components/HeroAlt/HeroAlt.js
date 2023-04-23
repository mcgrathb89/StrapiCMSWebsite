const animationDelay = 300;

const HeroAlt = (props) => {
  return (
    <div
      className="hero-section centered"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${props.image})`,
      }}
    >
      <div
        style={{
          opacity: "1",
          transform:
            "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          transformStyle: "preserve-3d",
        }}
        className="w-container"
      >
        <h1
          data-ix="fade-in-bottom-page-loads"
          className="hero-heading"
          data-aos="fade-in"
          data-aos-delay={animationDelay}
        >
          {props.title}
        </h1>
      </div>
    </div>
  );
};

export default HeroAlt;
