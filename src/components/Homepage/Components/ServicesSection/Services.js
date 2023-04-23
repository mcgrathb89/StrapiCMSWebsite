import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import AppContext from "../../../../data";

const Services = () => {
  const [content, setContent] = useState([]);
  const [subtitle, setSubTitle] = useState([]);

  useEffect(() => {
    getContent();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSubTitle();
    // eslint-disable-next-line
  }, []);

  const pageData = `${AppContext.domain}/api/homepage?populate=Services`;

  const getSubTitle = () => {
    axios.get(pageData).then((res) => {
      setSubTitle(res.data.data.attributes.Services_Subtitle);
    });
  };

  const getContent = () => {
    axios.get(pageData).then((res) => {
      setContent(res.data.data.attributes.Services);
    });
  };

  let icons = [
    "fa-solid fa-envelopes-bulk",
    "fa-solid fa-book",
    "fa-solid fa-user-group",
  ];

  return (
    <div className="section">
      <div className="w-container">
        <div className="section-title-group">
          <h2 className="section-heading centered">Services</h2>
          <div className="section-subheading center">{subtitle}</div>
        </div>
        <div className="w-row">
          {content.map((e, index) => (
            <div className="w-col w-col-4" key={index}>
              <div className="white-box">
                <i
                  className={`${icons[index]} grid-image`}
                  style={{ color: "white", fontSize: "1.5rem" }}
                ></i>
                <h3 className="mb-4" style={{ fontWeight: "300" }}>
                  {e.Title}
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: e.Description }}
                  style={{
                    fontSize: "14px",
                    fontWeight: "lighter",
                    listStylePosition: "inside",
                    listStyle: "inside",
                    padding: "initial",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
