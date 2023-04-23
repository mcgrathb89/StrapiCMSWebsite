import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Styles/Content.css";
import AppContext from "../../../../data";

export const PageContent = () => {
  const [content, setContent] = useState();
  const [blocks, setBlocks] = useState([]);
  let { slug } = useParams();

  useEffect(() => {
    getContent();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getBlocks();
    // eslint-disable-next-line
  }, []);

  let data = `${AppContext.domain}/api/pages/?populate=Blocks&filters[Url][$eq]=/${slug}`;

  const getContent = async () => {
    await axios.get(data).then((res) => {
      setContent(res.data.data[0].attributes);
    });
  };

  const getBlocks = async () => {
    await axios.get(data).then((res) => {
      setBlocks(res.data.data[0].attributes.Blocks);
    });
  };

  const pageName =
    content !== undefined ? content.Banner_Title : "data-loading";

  return (
    <main
      className={`container-fluid ${pageName.toLowerCase()}-page pageContent px-4`}
    >
      <div>
        {
          // eslint-disable-next-line
          blocks.map((e, index) => {
            switch (e.__component) {
              case "page-blocks.prices-boxes":
                return (
                  <div className="row" key={index}>
                    <div className="tile col-lg-12">
                      <h2 className="title">{e.Title}</h2>
                      <div
                        className={`${
                          e.Title === "Bronze"
                            ? "bronze"
                            : e.Title === "Silver"
                            ? "silver"
                            : e.Title === "Gold"
                            ? "gold"
                            : e.Title === "Platinum"
                            ? "platinum"
                            : null
                        } mb-4`}
                      ></div>
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: e.Description }}
                      ></div>
                    </div>
                  </div>
                );
              case "page-blocks.two-column-tile":
                return (
                  <div className="row" key={index}>
                    <div className="tile col-lg-6 two-columns">
                      <h2 className="title">{e.Tile_One_Title}</h2>
                      <div
                        className={`${
                          e.Tile_One_Title === "Bronze"
                            ? "bronze"
                            : e.Tile_One_Title === "Silver"
                            ? "silver"
                            : e.Tile_One_Title === "Gold"
                            ? "gold"
                            : e.Tile_One_Title === "Platinum"
                            ? "platinum"
                            : null
                        } mb-4`}
                      ></div>
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: e.Tile_One_Description,
                        }}
                      ></div>
                    </div>
                    <div className="tile col-lg-6 two-columns">
                      <h2 className="title">{e.Tile_Two_Title}</h2>
                      <div
                        className={`${
                          e.Tile_Two_Title === "Bronze"
                            ? "bronze"
                            : e.Tile_Two_Title === "Silver"
                            ? "silver"
                            : e.Tile_Two_Title === "Gold"
                            ? "gold"
                            : e.Tile_Two_Title === "Platinum"
                            ? "platinum"
                            : null
                        } mb-4`}
                      ></div>
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: e.Tile_Two_Description,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              case "page-blocks.further-information":
                return (
                  <div className="row" key={index}>
                    <div className="further_information">
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: e.Content }}
                      ></div>
                    </div>
                  </div>
                );
              case "page-blocks.button":
                return (
                  <div className="row" key={index}>
                    <a
                      target={`${
                        e.Open_In_New_Window === true ? "_blank" : "_self"
                      }`}
                      aria-label={`${
                        e.Open_In_New_Window === true
                          ? "Note: Clicking this link will open a new tab in the browser."
                          : "Note: Clicking this link will direct you to a different page in the website."
                      }`}
                      href={e.Link}
                      className={`button-contact ${
                        e.Type === "Light"
                          ? "light"
                          : e.Type === "Normal"
                          ? "normal"
                          : e.Type === "Dark"
                          ? "dark"
                          : e.Type === "Transparent"
                          ? "transparent"
                          : null
                      }`}
                      role="button"
                    >
                      {e.Text}
                    </a>
                  </div>
                );
              default:
                break;
            }
          })
        }
      </div>
    </main>
  );
};
