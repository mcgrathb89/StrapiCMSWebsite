import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import axios from "axios";
import AppContext from "../../../../data";

const Navigation = () => {
  const location = useLocation();

  const usePathname = () => {
    return location.pathname;
  };

  const [logoName, setLogoName] = useState();
  const [link, setLink] = useState([]);

  useEffect(() => {
    getLink();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getLogoName();
    // eslint-disable-next-line
  }, []);

  const getLink = () => {
    axios
      .get(`${AppContext.domain}/api/main-menu?populate=Items.Page`)
      .then((res) => {
        setLink(res.data.data.attributes.Items);
      });
  };

  const getLogoName = () => {
    axios.get(`${AppContext.domain}/api/homepage?populate=Hero`).then((res) => {
      setLogoName(res.data.data.attributes.Hero.Logo);
    });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      role="banner"
      className="navigation-bar w-nav"
    >
      <Container>
        <Navbar.Brand className="brand-text" style={{ pointerEvents: "none" }}>
          {logoName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav defaultActiveKey={usePathname} as="ul">
            <li>
              <Nav.Link
                href="/"
                aria-current="page"
                aria-label="Click to return to homepage."
              >
                Home
              </Nav.Link>
            </li>

            {link.map((element) => (
              <li key={element.id}>
                <Nav.Link
                  href={element.Page.data.attributes.Url}
                  aria-current="page"
                  aria-label="Page navigation"
                >
                  {element.Title}
                </Nav.Link>
              </li>
            ))}
            <li>
              <Nav.Link
                href="/contact"
                className="navigation-link w-nav-link"
                style={{ maxWidth: "940px" }}
              >
                Contact
              </Nav.Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
