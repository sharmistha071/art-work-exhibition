import { useState } from "react";
import "../App.css";
import useAPI from "../services/useAPI";
import { BASE_URL } from "../utils/endpoint";

import PlaceHolder from "../components/Placeholder/PlaceHolder";
import Card from "../components/Card/Card";
import Search from "../components/Search/Search";

type OriginalBook = {
  author_name: string[];
  author_key: string;
  first_sentence: string[];
  key: string;
  first_publish_year: number;
  ratings_average: number;
  cover_i: number;
};

type FormattedBook = {
  author_name: string;
  author_key: string | undefined;
  first_sentence: string;
  key: string | undefined;
  first_publish_year: number | undefined;
  ratings: number | undefined;
  cover_id: number;
};

const formatBooks = (books: OriginalBook[]): FormattedBook[] => {
  const formattedBooks = books.map((book: OriginalBook) => {
    return {
      author_name: book.author_name?.[0] || "",
      author_key: book.author_key,
      first_sentence: book.first_sentence?.[0] || "",
      key: book.key,
      first_publish_year: book.first_publish_year,
      ratings: book.ratings_average,
      cover_id: book.cover_i
    };
  });
  return formattedBooks;
};

const Home = () => {
  const [query, setQuery] = useState("culture");
  const [pageCount, setPageCount] = useState(1);
  const url = `${BASE_URL}/search.json?q=${query}&limit=10&page=${pageCount}`;
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

  //TODO: fix this
  if (!results && error) return <p>error....</p>;

  return (
    <>
      <Search onSearch={handleSearch} />
      {loading ? (
        <PlaceHolder />
      ) : (
        <>
          <section className="display-flex">
            {results.map((book) => (
              <Card content={book} key={book.key} />
            ))}
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
