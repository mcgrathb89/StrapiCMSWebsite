import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AppContext from "../../../../data";

export const Seo = () => {
  const [metaTitle, setMetaTitle] = useState();
  const [description, setMetaDescription] = useState();
  const [metaImage, setMetaImage] = useState();
  const [metaImageAlt, setMetaImageAlt] = useState();
  const [imageWidth, setMetaImageWidth] = useState();
  const [imageHeight, setMetaImageHeight] = useState();
  const [siteName, setSiteName] = useState();
  let { slug } = useParams();

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

  const seoData = `${AppContext.domain}/api/pages/?populate=SEO.Preview_Image&filters[Url][$eq]=/${slug}`;

  const getMetaTitle = () => {
    axios.get(seoData).then((res) => {
      setMetaTitle(res.data.data[0].attributes.SEO.Title);
    });
  };

  const getMetaDescription = () => {
    axios.get(seoData).then((res) => {
      setMetaDescription(res.data.data[0].attributes.SEO.Description);
    });
  };

  const getMetaImage = () => {
    axios.get(seoData).then((res) => {
      setMetaImage(
        res.data.data[0].attributes.SEO.Preview_Image.data.attributes.url
      );
    });
  };

  const getMetaImageAlt = () => {
    axios.get(seoData).then((res) => {
      setMetaImageAlt(
        res.data.data[0].attributes.SEO.Preview_Image.data.attributes
          .alternativeText
      );
    });
  };

  const getMetaImageWidth = () => {
    axios.get(seoData).then((res) => {
      setMetaImageWidth(
        res.data.data[0].attributes.SEO.Preview_Image.data.attributes.width
      );
    });
  };

  const getMetaImageHeight = () => {
    axios.get(seoData).then((res) => {
      setMetaImageHeight(
        res.data.data[0].attributes.SEO.Preview_Image.data.attributes.height
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

  const backupMetaImage = metaImage
    ? metaImage
    : "https://res.cloudinary.com/dfz8qvh6t/image/upload/v1657897550/SEO_5525377d65.jpg";

  const backupMetaTitle = metaTitle
    ? metaTitle
    : "Becky Smith Virtual Assistant";

  const backupMetaDescription = description
    ? description
    : "Do you need a Virtual Assistant? You've come to the right place. I offer a personalized, professional virtual assistant services designed to get you on track for all of your business needs.";

  const backupMetaImageAlt = metaImageAlt
    ? metaImageAlt
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
