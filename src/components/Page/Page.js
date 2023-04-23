import React from "react";
import { Seo } from "./Components/SEO/SEO";
import { Header } from "./Components/Global/Header";
import { PageContent } from "./Components/Content/Content";
import { Footer } from "./Components/Global/Footer";

export const Page = () => {
  return (
    <>
      <Header />
      <PageContent />
      <Footer />
      <Seo />
    </>
  );
};
