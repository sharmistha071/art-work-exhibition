import "./Card.css";

const Card = ({ content }) => {
  console.log("content", content);
  return (
    <div className="card">
      <img
        src={
          content.cover_id
            ? "https://covers.openlibrary.org/b/id/" +
              content.cover_id +
              "-L.jpg"
            : "https://dummyimage.com/180x190/dedede/3b3b3b&text=Image+Not+Available"
        }
        alt="Avatar"
      />
      <div className="container">
        <h2>{content.title}</h2>
        <h4>{content.author_name}</h4>
        <p className="content">{content.first_sentence}</p>
      </div>
    </div>
  );
};

export default Card;
