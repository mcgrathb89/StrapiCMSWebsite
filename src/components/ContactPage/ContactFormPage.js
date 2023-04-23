import Navigation from "../Global/Components/Header/Header";
import Footer from "../Global/Components/Footer/Footer";
import Hero from "../Global/Components/HeroAlt/HeroAlt";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Form } from "react-bootstrap";
import "./Styles/ContactForm.css";
import AppContext from "../../data";

export const ContactFormPage = () => {
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [description, setDescription] = useState();
  const [bannerImage, setBannerImage] = useState();

  /* Metadata */
  const [metaTitle, setMetaTitle] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [image, setMetaImage] = useState();
  const [imageAlt, setMetaImageAlt] = useState();
  const [imageWidth, setMetaImageWidth] = useState();
  const [imageHeight, setMetaImageHeight] = useState();
  const [siteName, setSiteName] = useState();

  useEffect(() => {
    getTitleName();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSubTitleName();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDescriptionName();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getBannerImage();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMetaTitle();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMetaDescription();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMetaImage();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSiteName();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMetaImageAlt();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMetaImageWidth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMetaImageHeight();
    // eslint-disable-next-line
  }, []);

  const pageData = `${AppContext.domain}/api/contact-form-page`;
  const seoData = `${AppContext.domain}/api/contact-form-page?populate=SEO.Preview_Image`;

  const getTitleName = () => {
    axios.get(pageData).then((res) => {
      setTitle(res.data.data.attributes.Title);
    });
  };

  const getSubTitleName = () => {
    axios.get(pageData).then((res) => {
      setSubTitle(res.data.data.attributes.Subtitle);
    });
  };

  const getDescriptionName = () => {
    axios.get(pageData).then((res) => {
      setDescription(res.data.data.attributes.Description);
    });
  };

  const getBannerImage = () => {
    axios
      .get(
        `${AppContext.domain}/api/contact-form-page?populate=Banner_Image.Image`
      )
      .then((res) => {
        setBannerImage(res.data.data.attributes.Banner_Image.data.attributes);
      });
  };

  const getMetaTitle = () => {
    axios.get(seoData).then((res) => {
      setMetaTitle(res.data.data.attributes.SEO.Title);
    });
  };

  const getMetaDescription = () => {
    axios.get(seoData).then((res) => {
      setMetaDescription(res.data.data.attributes.SEO.Description);
    });
  };

  const getMetaImage = () => {
    axios.get(seoData).then((res) => {
      setMetaImage(
        res.data.data.attributes.SEO.Preview_Image.data.attributes.url
      );
    });
  };

  const getMetaImageAlt = () => {
    axios.get(seoData).then((res) => {
      setMetaImageAlt(
        res.data.data.attributes.SEO.Preview_Image.data.attributes
          .alternativeText
      );
    });
  };

  const getMetaImageWidth = () => {
    axios.get(seoData).then((res) => {
      setMetaImageWidth(
        res.data.data.attributes.SEO.Preview_Image.data.attributes.width
      );
    });
  };

  const getMetaImageHeight = () => {
    axios.get(seoData).then((res) => {
      setMetaImageHeight(
        res.data.data.attributes.SEO.Preview_Image.data.attributes.height
      );
    });
  };

  const getSiteName = () => {
    axios
      .get("https://bsva-cms.herokuapp.com/api/homepage?populate=Hero")
      .then((res) => {
        setSiteName(res.data.data.attributes.Hero.Logo);
      });
  };

  var bannerImageBackup =
    bannerImage !== undefined
      ? bannerImage.url
      : "https://res.cloudinary.com/dfz8qvh6t/image/upload/v1657897552/Banner_7cb41f11c4.jpg";

  return (
    <>
      <header>
        <Navigation />
        <Hero title="Contact" image={bannerImageBackup} />
      </header>

      <div className="section">
        <div className="w-container">
          <div className="section-title-group">
            <h2 className="section-heading centered">{title}</h2>
            <div className="section-subheading center">{subTitle}</div>
          </div>
          <p>{description}</p>
          <div className="form-wrapper w-form">
            <Form
              className="form"
              data-netlify="true"
              name="contact"
              method="POST"
              netlify-honeypot="bot-field"
            >
              <p className="d-none">
                <label>
                  Don’t fill this out if you’re human:
                  <input name="bot-field" />
                </label>
              </p>

              <input type="hidden" name="form-name" value="contact" />

              <Form.Group className="mb-3">
                <Form.Label htmlFor="name" style={{ display: "none" }}>
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="email" style={{ display: "none" }}>
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label htmlFor="message" style={{ display: "none" }}>
                  Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="message"
                  name="message"
                  placeholder="Message"
                />
              </Form.Group>
              <button type="submit" className="button full-width">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor: "#edeff2" }}>
        <Footer />
      </footer>

      <HelmetProvider>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="alt" property="og:image:alt" content={imageAlt} />
          <meta name="description" content={metaDescription} />
          <meta name="title" property="og:title" content={metaTitle} />
          <meta name="site_name" property="og:site_name" content={siteName} />
          <meta
            name="description"
            property="og:description"
            content={metaDescription}
          />
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content={imageWidth} />
          <meta property="og:image:height" content={imageHeight} />
          <meta property="og:image:secure_url" content={image} />
          <meta name="title" property="twitter:title" content={metaTitle} />
          <meta
            name="description"
            property="twitter:description"
            content={metaDescription}
          />
          <meta name="image" property="twitter:image" content={image} />
        </Helmet>
      </HelmetProvider>
    </>
  );
};
