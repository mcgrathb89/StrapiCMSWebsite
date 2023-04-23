import React, { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../../../../data";

const Footer = () => {
  const [data, setData] = useState();
  const [logo, setFooterLogo] = useState();
  const [link, setLink] = useState([]);
  const [socialLink, setSocialLink] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getLink();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSocialLink();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getFooterLogo();
    // eslint-disable-next-line
  }, []);

  const getData = () => {
    axios.get(`${AppContext.domain}/api/footer-menu`).then((res) => {
      setData(res.data.data.attributes);
    });
  };

  const getLink = () => {
    axios
      .get(`${AppContext.domain}/api/footer-menu?populate=Items.Page`)
      .then((res) => {
        setLink(res.data.data.attributes.Items);
      });
  };

  const getSocialLink = () => {
    axios
      .get(`${AppContext.domain}/api/footer-menu?populate=Social_Links.Page`)
      .then((res) => {
        setSocialLink(res.data.data.attributes.Social_Links);
      });
  };

  const getFooterLogo = () => {
    axios
      .get(`${AppContext.domain}/api/footer-menu?populate=Logo`)
      .then((res) => {
        setFooterLogo(res.data.data.attributes.Logo.data.attributes);
      });
  };

  var backupLogo =
    logo !== undefined ? logo.url : "https://via.placeholder.com/150";
  var backupAltText = logo !== undefined ? logo.alternativeText : "Footer logo";
  var backupDescription =
    data !== undefined
      ? data.Description
      : "BSVA was formed in 2022 as a way to branch out my skillset and offer my services to a wider audience, since setting up I have helped many businesses and individuals to become more efficient.";
  var backupCopyright = data !== undefined ? data.Copyright : "Becky Smith";

  return (
    <div>
      <div className="footer">
        <div className="w-container">
          <div className="w-row">
            <div className="spc w-col w-col-4">
              <img
                key={backupLogo.id}
                src={backupLogo}
                className="img-thumbnail mb-4 mx-auto mx-md-0 d-block"
                style={{
                  width: "150px",
                  height: "150px",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                alt={backupAltText}
              />
              <div
                className="text-center text-md-start"
                dangerouslySetInnerHTML={{ __html: backupDescription }}
              ></div>
            </div>
            <div className="spc w-col w-col-4 text-center text-md-start">
              <h3
                style={{
                  marginBottom: "0.75rem",
                  textTransform: "uppercase",
                  fontSize: "1.3rem",
                  letterSpacing: "7px",
                }}
              >
                Footer Links
              </h3>
              <ul style={{ padding: "0" }}>
                {link.map((e) => (
                  <li style={{ listStyle: "none" }} key={e.id}>
                    <a
                      href={e.Page.data.attributes.Url}
                      className="footer-link"
                      key={e.id}
                    >
                      {e.Title}
                    </a>
                  </li>
                ))}
                <li style={{ listStyle: "none" }}>
                  <a href="/contact" className="footer-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-col w-col-4 text-center text-md-start">
              <h4
                style={{
                  marginBottom: "1rem",
                  marginTop: "0.2rem",
                  textTransform: "uppercase",
                  fontSize: "1.3rem",
                  letterSpacing: "7px",
                }}
              >
                Social Links
              </h4>
              {socialLink.map((e) => (
                <div className="footer-link-wrapper w-clearfix" key={e.id}>
                  <i
                    className={`info-icon pt-1 ${
                      e.Platform === "Twitter"
                        ? "fa-brands fa-twitter"
                        : e.Platform === "Facebook"
                        ? "fa-brands fa-square-facebook"
                        : e.Platform === "LinkedIn"
                        ? "fa-brands fa-linkedin"
                        : e.Platform === "Instagram"
                        ? "fa-brands fa-instagram"
                        : null
                    }`}
                    width="20"
                  ></i>
                  <ul style={{ padding: "0" }}>
                    {socialLink.map((e) => (
                      <li style={{ listStyle: "none" }} key={e.id}>
                        <a
                          href={e.Link}
                          className="footer-link with-icon"
                          rel="noreferrer"
                          target="_blank"
                          aria-label="Note: Clicking this link will open a new tab in the browser."
                        >
                          {e.Platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer center">
        <div className="w-container">
          <div className="text-white">
            © Copyright {new Date().getFullYear()} {backupCopyright}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
