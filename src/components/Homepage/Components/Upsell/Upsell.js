import axios from "axios";
import { useEffect, useState } from "react";
import "./Styles/Upsell.css";

const Upsell = () => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    getTitle();
  }, []);

  useEffect(() => {
    getDescription();
  }, []);

  const pageData =
    "https://bsva-cms.herokuapp.com/api/homepage?populate=Upsell.Image";

  const getTitle = () => {
    axios.get(pageData).then((res) => {
      setTitle(res.data.data.attributes.Upsell.Title);
    });
  };

  const getDescription = () => {
    axios.get(pageData).then((res) => {
      setDescription(res.data.data.attributes.Upsell.Description);
    });
  };

  const getImage = () => {
    axios.get(pageData).then((res) => {
      setImage(res.data.data.attributes.Upsell.Image.data.attributes.url);
    });
  };

  const backupImage = image
    ? image
    : "https://res.cloudinary.com/dfz8qvh6t/image/upload/v1657897551/Upsell_84ec4d4f92.jpg";
  const backupTitle = title ? title : "Why Use a Virtual Assistant?";
  const backupDescription = description
    ? description
    : "Quite simply it's easier! Unlike hiring an employee a Virtual Assistant comes at no extra cost! What you see is what you pay for. A virtual assistant can be there when you need them. Meaning more time for you to get on with what you do best...running your business.";

  return (
    <section className="container-fluid upsell">
      <div className="row">
        <div className="col-lg-2"></div>
        <img
          className="image-fluid col-lg-4"
          src={backupImage}
          aria-label="Image depicting team work."
        />
        <div className="col-lg-1"></div>
        <div className="col-lg-3">
          <h1>{backupTitle}</h1>
          <p>{backupDescription}</p>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </section>
  );
};

export default Upsell;
