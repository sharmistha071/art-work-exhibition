import { useState } from "react";
import "../App.css";
import useAPI from "../services/useAPI";
import { BASE_URL } from "../utils/endpoint";
import { FormattedArtWork, OriginalArtWork } from "../utils/globalTypes";

import PlaceHolder from "../components/Placeholder/PlaceHolder";
import PlaceHolderMessage from "../components/Placeholder/PlaceHolderMessage";
import Card from "../components/Card/Card";
import Search from "../components/Search/Search";

const formatBooks = (artworks: OriginalArtWork[]): FormattedArtWork[] => {
  const formattedBooks = artworks.map((artwork: OriginalArtWork) => {
    return {
      id: artwork.id,
      title: artwork.title,
      alt_text: artwork.thumbnail ? artwork.thumbnail.alt_text : " ",
      thumbnail: ""
    };
  });
  return formattedBooks;
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const url = `${BASE_URL}/api/v1/artworks/search?q=${query}&limit=10&page=${pageCount}`;
  const { state } = useAPI(url, formatBooks);

  const { loading, results, error } = state;

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  const prevClick = () => {
    setPageCount((prev) => prev - 1);
  };

  const nextClick = () => {
    setPageCount((prev) => prev + 1);
  };

  if (loading) {
    return <PlaceHolder />;
  }

  if (!results && error) return <p>error....</p>;

  return (
    <>
      <Search onSearch={handleSearch} />

      {results.length < 1 ? (
        <PlaceHolderMessage
          message={"Nothing found, Try with another keyword"}
        />
      ) : (
        <>
          <section className="display-flex">
            {results.map((artwork: FormattedArtWork) => {
              return (
                <div key={artwork.id.toString()}>
                  <Card
                    content={{
                      id: artwork.id,
                      title: artwork.title,
                      alt_text: artwork.alt_text,
                      thumbnail: artwork.thumbnail
                    }}
                  />
                </div>
              );
            })}
          </section>
          <div className="pagination">
            <button
              type="button"
              className="pagination-btn"
              onClick={prevClick}
              disabled={pageCount <= 1}
            >
              Prev
            </button>
            <button
              type="button"
              className="pagination-btn"
              onClick={nextClick}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
