import axios from "axios";
import { useEffect, useState } from "react";
import AppContext from "../../../../data";

const Description = () => {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getHeaders();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const pageData = `${AppContext.domain}/api/homepage?populate=Upsell.Image`;

  const getHeaders = () => {
    axios.get(pageData).then((res) => {
      setHeaders(res.data.data.attributes);
    });
  };

  const getData = () => {
    axios.get(pageData).then((res) => {
      setData(res.data.data.attributes.Upsell);
    });
  };

  return (
    <div className="section accent">
      <div className="w-container">
        <div className="section-title-group">
          <h2 className="section-heading centered white">
            {headers.Upsell_Title}
          </h2>
          <div className="section-subheading center off-white">
            {headers.Upsell_Subtitle}
          </div>
        </div>
        <div className="w-row">
          {data.map((e) => (
            <div className="w-col w-col-6" key={e.id}>
              <div className="white-box transparent">
                <img
                  src={e.Image.data.attributes.url}
                  alt={
                    e.Image.data.attributes.alternativeText !==
                    e.Image.data.attributes.name
                      ? e.Image.data.attributes.alternativeText
                      : `Image name: ${e.Image.data.attributes.alternativeText} - Image of person doing office based work.`
                  }
                  className="fullwidth-image"
                />
                <h3 className="text-white mb-2">{e.Title}</h3>
                <p className="text-white">{e.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
