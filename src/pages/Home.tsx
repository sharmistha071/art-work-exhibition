import { useEffect } from "react";
import "../App.css";
import useAPI from "../services/useAPI";
import { BASE_URL } from "../utils/endpoint";

import Card from "../components/Card/Card";

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
  const url = `${BASE_URL}/search.json?q=culture&limit=10&page=1`;
  const { state } = useAPI(url, formatBooks);

  const { loading, results, error } = state;

  console.log("results", results);

  if (loading) return <p>Loading...</p>;

  //TODO: fix this
  if (!results && error) return <p>error....</p>;

  return (
    <section className="display-flex">
      {results.map((book) => (
        <Card content={book} key={book.key} />
      ))}
    </section>
  );
};

export default Home;
