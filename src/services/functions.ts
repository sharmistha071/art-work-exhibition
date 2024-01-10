import { FormattedArtWork, OriginalArtWork } from "../utils/globalTypes";

export const formatArtWorks = (
  artworks: OriginalArtWork[]
): FormattedArtWork[] => {
  const formattedArtWorks = artworks.map((artwork: OriginalArtWork) => {
    return {
      id: artwork.id,
      title: artwork.title,
      alt_text: artwork.thumbnail ? artwork.thumbnail.alt_text : " ",
      thumbnail: ""
    };
  });
  return formattedArtWorks;
};
