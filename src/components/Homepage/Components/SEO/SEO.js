import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../../../../data";

const SEO = () => {
  const [title, setMetaTitle] = useState();
  const [description, setMetaDescription] = useState();
  const [image, setMetaImage] = useState();
  const [imageAlt, setMetaImageAlt] = useState();
  const [imageWidth, setMetaImageWidth] = useState();
  const [imageHeight, setMetaImageHeight] = useState();
  const [siteName, setSiteName] = useState();

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

  const pageData = `${AppContext.domain}/api/homepage?populate=SEO.Preview_Image`;

  const getMetaTitle = () => {
    axios.get(pageData).then((res) => {
      setMetaTitle(res.data.data.attributes.SEO.Title);
    });
  };

  const getMetaDescription = () => {
    axios.get(pageData).then((res) => {
      setMetaDescription(res.data.data.attributes.SEO.Description);
    });
  };

  const getMetaImage = () => {
    axios.get(pageData).then((res) => {
      setMetaImage(
        res.data.data.attributes.SEO.Preview_Image.data.attributes.url
      );
    });
  };

  const getMetaImageAlt = () => {
    axios.get(pageData).then((res) => {
      setMetaImageAlt(
        res.data.data.attributes.SEO.Preview_Image.data.attributes
          .alternativeText
      );
    });
  };

  const getMetaImageWidth = () => {
    axios.get(pageData).then((res) => {
      setMetaImageWidth(
        res.data.data.attributes.SEO.Preview_Image.data.attributes.width
      );
    });
  };

  const getMetaImageHeight = () => {
    axios.get(pageData).then((res) => {
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

  const backupMetaImage = image
    ? image
    : "https://res.cloudinary.com/dfz8qvh6t/image/upload/v1657897550/SEO_5525377d65.jpg";

  const backupMetaTitle = title
    ? title
    : "Becky Smith Virtual Assistant | Homepage";

  const backupMetaDescription = description
    ? description
    : "Do you need a Virtual Assistant? You've come to the right place. I offer a personalized, professional virtual assistant services designed to get you on track for all of your business needs.";

  const backupMetaImageAlt = imageAlt
    ? imageAlt
    : "Image for Becky Smith virtual assistant homepage.";

  const backupSiteName = siteName ? siteName : "Becky Smith VA";

  const backupImageWidth = imageWidth ? imageWidth : "2880";

  const backupImageHeight = imageHeight ? imageHeight : "1920";
  return (
    <HelmetProvider>
      <Helmet>
        <title>{backupMetaTitle}</title>
        <meta name="alt" property="og:image:alt" content={backupMetaImageAlt} />
        <meta name="description" content={backupMetaDescription} />
        <meta name="title" property="og:title" content={backupMetaTitle} />
        <meta
          name="site_name"
          property="og:site_name"
          content={backupSiteName}
        />
        <meta
          name="description"
          property="og:description"
          content={backupMetaDescription}
        />
        <meta property="og:image" content={backupMetaImage} />
        <meta property="og:image:width" content={backupImageWidth} />
        <meta property="og:image:height" content={backupImageHeight} />
        <meta property="og:image:secure_url" content={backupMetaImage} />
        <meta name="title" property="twitter:title" content={backupMetaTitle} />
        <meta
          name="description"
          property="twitter:description"
          content={backupMetaDescription}
        />
        <meta name="image" property="twitter:image" content={backupMetaImage} />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
