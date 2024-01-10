import "./Card.css";
import { Link } from "react-router-dom";
import { FormattedArtWork } from "../../utils/globalTypes";

type CardProps = {
  content: FormattedArtWork;
};

const Card = ({ content }: CardProps) => {
  return (
    <div className="card">
      <Link to={`/art-work-exhibition/details/${content.id}`} relative="path">
        <img
          src={
            content.thumbnail
              ? `https://www.artic.edu/iiif/2/${content.thumbnail}/full/274,263/0/default.jpg`
              : "https://dummyimage.com/180x190/dedede/3b3b3b&text=Image+Not+Available"
          }
          alt="Avatar"
        />
        <div className="container">
          <h4 className="title">{content.title}</h4>
          <p className="content">{content.alt_text}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
