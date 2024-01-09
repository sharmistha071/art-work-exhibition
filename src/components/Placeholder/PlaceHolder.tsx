import "./PlaceHolder.css";

const PlaceHolder = () => {
  const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <section className="display-flex">
      {results.map((book) => (
        <div className="placeholder-container loading">
          <div className="img-container">
            <div className="img"></div>

            {/* <div className="stripe small-stripe"></div>
            <div className="stripe medium-stripe"></div>
            <div className="stripe long-stripe"></div> */}
          </div>
          <div className="placeholder-content">
            <div className="stripe small-stripe"></div>
            <div className="stripe medium-stripe"></div>
            <div className="stripe long-stripe"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PlaceHolder;
