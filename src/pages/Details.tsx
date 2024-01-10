import "../App.css";
import { useParams, useNavigate } from "react-router-dom";

import useDetails from "../services/useDetails";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useDetails({ id });

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="details-wrapper">
        <button
          onClick={() => {
            navigate("/artworks");
          }}
          className="goBack"
        >
          Go back
        </button>
        <section className="hero-image">
          <img
            src={
              info.image_id
                ? `https://www.artic.edu/iiif/2/${info.image_id}/full/843,/0/default.jpg`
                : "https://dummyimage.com/180x190/dedede/3b3b3b&text=Image+Not+Available"
            }
            alt="Avatar"
            style={{ width: "100%", height: "100%" }}
          />
        </section>
        <section className="info-section">
          <h2>{info.title}</h2>
          <h4>{info.gallery_title}</h4>
          <p>{info.description}</p>
          <div className="category">
            {info.category_titles?.map((item) => (
              <button key={item}>{item}</button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Details;
