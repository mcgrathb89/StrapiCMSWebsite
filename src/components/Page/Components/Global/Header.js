import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeroAlt from "../../../Global/Components/HeroAlt/HeroAlt";
import Navigation from "../../../Global/Components/Header/Header";
import AppContext from "../../../../data";

export const Header = () => {
  const [content, setContent] = useState();
  const [bannerImage, setBannerImage] = useState();
  let { slug } = useParams();

  useEffect(() => {
    getContent();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getBannerImage();
    // eslint-disable-next-line
  }, []);

  const getBannerImage = async () => {
    await axios
      .get(
        `${AppContext.domain}/api/pages/?populate=Banner_Image.Image&filters[Url][$eq]=/${slug}`
      )
      .then((res) => {
        setBannerImage(
          res.data.data[0].attributes.Banner_Image.data.attributes
        );
      });
  };

  const getContent = async () => {
    await axios
      .get(
        `${AppContext.domain}/api/pages/?populate=Blocks&filters[Url][$eq]=/${slug}`
      )
      .then((res) => {
        setContent(res.data.data[0].attributes);
      });
  };

  var bannerImageBackup =
    bannerImage !== undefined
      ? bannerImage.url
      : "https://res.cloudinary.com/dfz8qvh6t/image/upload/v1657897552/Banner_7cb41f11c4.jpg";

  const title =
    content !== undefined ? content.Banner_Title : "Data Loading...";

  return (
    <header>
      <Navigation />
      <HeroAlt title={title} image={bannerImageBackup} />
    </header>
  );
};
