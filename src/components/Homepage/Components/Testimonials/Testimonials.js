import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Styles/Testimonials.css";
import AppContext from "../../../../data";

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);

  useEffect(() => {
    getTestimonialData();
    // eslint-disable-next-line
  }, []);

  const pageData = `${AppContext.domain}/api/homepage?populate=Testimonials`;

  const getTestimonialData = () => {
    axios.get(pageData).then((res) => {
      setTestimonialData(res.data.data.attributes.Testimonials);
    });
  };

  return (
    <section className="container testimonialSection text-center">
      <h2 className="text-center title mb-3 mt-3">Testimonials</h2>
      <Carousel fade>
        {testimonialData.map((testimonial) => (
          <Carousel.Item key={testimonial.id}>
            <Carousel.Caption>
              <h2>{testimonial.Name}</h2>
              <p>{testimonial.Profession}</p>
              <blockquote className="blockquote pb-5 margin-left-right-auto fst-italic">
                <q>{testimonial.Testimonial}</q>
              </blockquote>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;
