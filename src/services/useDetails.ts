import { useState, useEffect } from "react";

import { BASE_URL } from "../utils/endpoint";

type useDetailsProps = {
  id?: string;
};

export type Info = {
  image_id: string;
  title: string;
  gallery_title: string;
  description: string;
  category_titles: string[];
};

const useDetails = ({ id }: useDetailsProps) => {
  const [info, setInfo] = useState<Info | null>(null);
  const url = `${BASE_URL}/api/v1/artworks/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + id);
        const data = await response.json();
        setInfo({
          image_id: data.data.image_id,
          title: data.data.title,
          gallery_title: data.data.gallery_title,
          description: data.data.description,
          category_titles: data.data.category_titles
        });
      } catch (error: unknown) {
        console.log("error", error);
      }
    };
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, url]);

  return { info };
};

export default useDetails;
